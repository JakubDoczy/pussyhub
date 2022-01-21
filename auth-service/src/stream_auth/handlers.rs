use actix_web::{web, HttpResponse};

use std::env;
use serde::Deserialize;

#[derive(Deserialize)]
pub struct FormData {
    name: String,
}

/// Handles stream authentication requests.
/// If the stream key is found, returns 200. If not, return
///
/// Example:
/// curl 127.0.0.1:8089/auth/stream
pub(crate) async fn stream_auth_handler(
    provided_payload: web::Form<FormData>,
) -> HttpResponse {
    let data = provided_payload.into_inner();
    let auth_stream_service_url = env::var("AUTH_STREAM_SERVICE_URL").unwrap_or(String::from("rtmp://127.0.0.1:1935/live_auth"));

    println!("{}", data.name.clone());

    let name = data.name.split('/').collect::<Vec<_>>()[0];

    HttpResponse::MovedPermanently().append_header(("Location", format!("{}/{}", auth_stream_service_url, name))).finish()
    // HttpResponse::MovedPermanently().append_header(("Location", data.name)).finish()
}