use std::env;
use std::sync::Arc;

use ::dotenv::dotenv;

use actix_web::{middleware, web, App, HttpServer};
use sqlx::postgres::PgPoolOptions;

use shared_lib::token_validation::TokenValidator;

use tracing::info;
use tracing_subscriber;

use crate::application_data::ApplicationData;
use crate::database::user_repo::PostgresUserRepo;

mod application_data;
mod user_repo;


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


// TODO: keys
// TODO: update user data -> description, picture, ...
// TODO: delete user (if admin or given user)
// TODO: get user info



#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    tracing_subscriber::fmt::init();

    let token_validator = TokenValidator::from_rsa_pem("resources/public.pem")
        .await
        .unwrap();

    let user_repo = initialize_user_repo().await;
    
    let app_data = web::Data::new(ApplicationData::new(
        token_validator,
        user_repo
    ));

    let address = env::var("USER_SERVICE_ADDRESS").expect("USER_SERVICE_ADDRESS must be set");

    info!("Starting http server on {}", address);

    HttpServer::new(move || {
        App::new()
            .wrap(middleware::Logger::default())
            .app_data(app_data.clone())
            //.route("/auth", web::post().to(auth_handler))
            //.route("/registration", web::post().to(registration_handler))
            //.route("/confirmation/{token}", web::get().to(confirmation_handler))
        //.route("/registration", web::post().to(registration_handler))
    })
    .bind(address)?
    .run()
    .await
}