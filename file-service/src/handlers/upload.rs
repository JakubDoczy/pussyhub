use actix_multipart::{Field, Multipart, MultipartError};
use actix_web::http::header::ContentDisposition;
use actix_web::{middleware, web, App, HttpResponse, HttpServer};
use actix_web::http::HeaderValue;
use anyhow::{bail, Error};
use futures::future::{err, Either};
use futures::{Future, FutureExt, Stream, StreamExt, TryFutureExt, TryStreamExt};
use shared_lib::token_validation::{SlimUser, TokenValidator};
use tokio::fs;
use tokio::io::AsyncWriteExt;
use tokio::sync::Mutex;
use tracing::log::{debug, trace};
use tracing::warn;

use crate::file_paths::ensure_folder;
use crate::ApplicationData;

async fn get_user(field: &Field, validator: &Mutex<TokenValidator>) -> Result<SlimUser, Error> {
    let auth_header_value = match field.headers().get(actix_web::http::header::AUTHORIZATION) {
        Some(value) => value,
        None => bail!("No authorization header found!"),
    };
    let auth_header_string = auth_header_value.to_str()?.to_string();
    let auth_parts: Vec<_> = auth_header_string.split(" ").collect();
    if auth_parts.len() != 2 || auth_parts[0] != "Bearer" {
        bail!("Authorization header appears to be malformed!");
    }
    validator.lock().await.validate(auth_parts[1])
}

pub async fn save_file(mut field: Field, validator: &Mutex<TokenValidator>) -> Result<i64, Error> {
    let user = get_user(&field, validator).await?;

    let content = match field.content_disposition() {
        None => bail!("Malformed content: failed to obtain Content-Disposition header field"),
        Some(content) => content,
    };

    let filename = match content.get_filename() {
        Some(filename) => filename, //.replace(' ', "_").to_string(),
        None => bail!("Failed to obtain filename!"),
    };

    let folder_path = ensure_folder(&user).await?.join(filename);

    let mut file = fs::File::create(folder_path).await?;

    let mut acc = 0;
    while let Some(chunk) = field.next().await {
        let bytes = chunk?;
        file.write_all(bytes.as_ref()).await?;
        acc += bytes.len() as i64;
    }
    Ok(acc)
}

pub(crate) async fn handle_upload(
    app_data: web::Data<ApplicationData>,
    mut payload: Multipart,
) -> HttpResponse {
    trace!("Received request to upload a file.");

    let mut acc = 0 as i64;
    while let Some(item) = payload.next().await {
        let mut field = match item {
            Ok(field) => field,
            Err(e) => {
                warn!("{:?}", e);
                return HttpResponse::BadRequest().json(&*format!("{:?}", e));
            }
        };

        match save_file(field, &app_data.token_validator).await {
            Err(e) => {
                warn!("{:?}", e);
                return HttpResponse::BadRequest().json(&*format!("{:?}", e));
            }
            Ok(nbytes) => {
                acc += nbytes;
            }
        };
    }
    HttpResponse::Ok().json(acc)
}
