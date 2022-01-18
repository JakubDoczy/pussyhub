use std::env;
use std::sync::Arc;

use ::dotenv::dotenv;
use actix_cors::Cors;

use actix_web::{middleware, web, App, HttpServer};

use shared_lib::token_validation::TokenValidator;

use tracing::info;
use tracing_subscriber;

use crate::application_data::ApplicationData;

mod application_data;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    tracing_subscriber::fmt::init();
    let token_validator = TokenValidator::from_rsa_pem(include_str!("../resources/public.pem")).unwrap();

    let app_data = web::Data::new(ApplicationData::new(
        token_validator
    ));

    let address = env::var("FILE_SERVICE_ADDRESS").expect("FILE_SERVICE_ADDRESS must be set");

    info!("Starting http server on {}", address);

    HttpServer::new(move || {
        // TODO proper cors
        let cors = Cors::permissive();
        App::new()
            .wrap(cors)
            .wrap(middleware::Logger::default())
            .app_data(app_data.clone())
        //.route("/registration", web::post().to(registration_handler))
    })
    .bind(address)?
    .run()
    .await
}
