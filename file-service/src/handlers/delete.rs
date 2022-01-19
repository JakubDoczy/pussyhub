/*
use crate::ApplicationData;
use actix_files::NamedFile;
use actix_web::{web, HttpRequest, Result, HttpResponse};
use std::path::PathBuf;
use anyhow::{Error, bail};
use tokio::sync::Mutex;
use shared_lib::token_validation::{Role, SlimUser, TokenValidator};



async fn get_user(request: HttpRequest, validator: &Mutex<TokenValidator>) -> Result<SlimUser, Error> {
    let auth_header_value = request.headers().get(actix_web::http::header::AUTHORIZATION)?;
    let auth_parts: Vec<_> = auth_header_value.to_str()?.to_string().split(" ").collect();
    if auth_parts.len() != 2 || auth_parts[0] != "Bearer" {
        bail!("Authorization header appears to be malformed!");
    }
    validator.lock().await.validate(auth_parts[1])
}


pub(crate) async fn handle_delete_file(
    app_data: web::Data<ApplicationData>,
    req: HttpRequest,
) -> HttpResponse {
    let path: PathBuf = req.match_info().query("filename").parse().unwrap();

    let user = get_user(req, &app_data.token_validator).await?;

    HttpResponse::InternalServerError().json("TODO")

}
*/