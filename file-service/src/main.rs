use std::env;
use std::sync::Arc;

use ::dotenv::dotenv;
use actix_cors::Cors;

use actix_web::{middleware, web, App, HttpResponse, HttpServer};

use shared_lib::token_validation::TokenValidator;

use tracing::info;
use tracing_subscriber;

use crate::application_data::ApplicationData;
use crate::handlers::download::handle_download;
use crate::handlers::upload::handle_upload;

mod application_data;
mod handlers;
mod file_paths;

fn handle_test(_application_data: web::Data<ApplicationData>) -> HttpResponse {
    let html = r#"<html>
        <head><title>Upload Test</title></head>
        <body>
            <form action="/upload" method="post" enctype="multipart/form-data">
                <input type="file" name="file"/>
                <input type="submit" value="Submit"></button>
            </form>
        </body>
    </html>"#;
    HttpResponse::Ok().body(html)
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    tracing_subscriber::fmt::init();
    let token_validator =
        TokenValidator::from_rsa_pem(include_str!("../resources/public.pem")).unwrap();

    let app_data = web::Data::new(ApplicationData::new(token_validator));

    let address = "127.0.0.1:8090"; //env::var("FILE_SERVICE_ADDRESS").expect("FILE_SERVICE_ADDRESS must be set");

    info!("Starting http server on {}", address);

    HttpServer::new(move || {
        // TODO proper cors
        //let cors = Cors::permissive();
        App::new()
            .wrap(middleware::Logger::default())
            .app_data(app_data.clone())
            .route("/download/{username}/{filename}", web::get().to(handle_download))
            .route("/upload", web::post().to(handle_upload))
            .route("/test", web::get().to(handle_test))

        //.route("/registration", web::post().to(registration_handler))
    })
    .bind(address)?
    .run()
    .await
}
