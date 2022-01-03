use std::env;
use std::sync::{Arc, Mutex};

use ::dotenv::dotenv;

use actix_web::{middleware, web, App, HttpResponse, HttpServer};
use sqlx::postgres::PgPoolOptions;

use lettre::SmtpTransport;

use shared_lib::auth::{AuthPayload, UserRegistrationPayload};
use shared_lib::errors::{AuthError, RegistrationError};
use shared_lib::token_validation::{SlimUser, TokenValidator};

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

// https://dev.to/mygnu/auth-web-microservice-with-rust-using-actix-web---complete-tutorial-part-2-k3a
// https://gitlab.com/mygnu/rust-auth-server/-/tree/master/src

// TODO: logging

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    // database
    dotenv().ok();

    env_logger::init();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    //let smtp_address = env::var("SMTP_ADDRESS").expect("SMTP_ADDRESS must be set");

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .expect("Failed to connect to the database!");

    //static MIGRATOR: Migrator = sqlx::migrate!();
    //MIGRATOR.run(&pool).await?;

    let shared_pool = Arc::new(pool);

    // Token issuer
    let token_issuer = TokenIssuer::from_rsa_pem("resources/private.pem")
        .await
        .unwrap();

    // Token validator
    let token_validator = TokenValidator::from_rsa_pem("resources/public.pem")
        .await
        .unwrap();

    let user_repo = PostgresUserRepo::new(shared_pool.clone());
    let smtp_transport = SmtpTransport::builder_dangerous("localhost")
        .port(2525)
        .build();

    let app_data = web::Data::new(ApplicationData::new(
        token_issuer,
        token_validator,
        user_repo,
        smtp_transport,
    ));

    HttpServer::new(move || {
        App::new()
            .wrap(middleware::Logger::default())
            .app_data(app_data.clone())
            .route("/auth", web::post().to(auth_handler))
            .route("/registration", web::post().to(registration_handler))
            .route("/confirmation/{token}", web::get().to(confirmation_handler))
        //.route("/registration", web::post().to(registration_handler))
    })
    .bind(env::var("AUTH_SERVICE_ADDRESS").expect("AUTH_SERVICE_ADDRESS must be set"))?
    .run()
    .await
}
