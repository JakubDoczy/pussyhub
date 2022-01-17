use std::env;
use std::sync::Arc;

use ::dotenv::dotenv;
use actix_cors::Cors;

use actix_web::{middleware, web, App, HttpServer};
use sqlx::postgres::PgPoolOptions;

use lettre::SmtpTransport;

use shared_lib::token_validation::TokenValidator;

use tracing::info;
use tracing_subscriber;

use crate::application_data::ApplicationData;
use crate::auth::handlers::auth_handler;
use crate::database::user_repo::PostgresUserRepo;
use crate::registration::handlers::{confirmation_handler, registration_handler};
use crate::token_issuer::TokenIssuer;

mod application_data;
mod auth;
mod database;
mod registration;
mod token_issuer;


async fn initialize_user_repo() -> PostgresUserRepo {
    // If that program fails to connect to the database, it will panic.
    // We have no way to recover from this.
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .expect("Failed to connect to the database!");

    PostgresUserRepo::new(Arc::new(pool))
}

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    tracing_subscriber::fmt::init();

    let token_issuer = TokenIssuer::from_rsa_pem(include_str!("../resources/private.pem")).unwrap();
    let token_validator = TokenValidator::from_rsa_pem(include_str!("../resources/public.pem")).unwrap();

    let user_repo = initialize_user_repo().await;
    let smtp_transport = SmtpTransport::builder_dangerous("smtp")
        .port(2525)
        .build();

    let app_data = web::Data::new(ApplicationData::new(
        token_issuer,
        token_validator,
        user_repo,
        smtp_transport,
    ));

    let address = env::var("AUTH_SERVICE_ADDRESS").expect("AUTH_SERVICE_ADDRESS must be set");

    info!("Starting http server on {}", address);

    HttpServer::new(move || {
        // TODO proper cors
        let cors = Cors::permissive();
        App::new()
            .wrap(cors)
            .wrap(middleware::Logger::default())
            .app_data(app_data.clone())
            .route("/auth", web::post().to(auth_handler))
            .route("/registration", web::post().to(registration_handler))
            .route("/confirmation/{token}", web::get().to(confirmation_handler))
        //.route("/registration", web::post().to(registration_handler))
    })
    .bind(address)?
    .run()
    .await
}
