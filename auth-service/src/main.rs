use std::env;
use std::sync::{Arc, Mutex};

use ::dotenv::dotenv;

use shared_lib::token_validation::{Role, SlimUser, TokenValidator};

use shared_lib::auth::{AuthPayload, UserRegistrationPayload};
use shared_lib::errors::{AuthError, RegistrationError, ServiceError};

use actix_web::{
    dev::Payload, error::BlockingError, middleware, web, App, Error, FromRequest, HttpRequest,
    HttpResponse, HttpServer,
};

use sqlx::postgres::PgPoolOptions;

use crate::token_issuer::TokenIssuer;

use crate::user_repo::PostgresUserRepo;

mod token_issuer;
mod user_repo;

//
// https://dev.to/mygnu/auth-web-microservice-with-rust-using-actix-web---complete-tutorial-part-2-k3a
// https://gitlab.com/mygnu/rust-auth-server/-/tree/master/src

#[derive(Clone)]
pub struct ApplicationData {
    pub token_issuer: TokenIssuer,
    pub user_repo: PostgresUserRepo,
}

/// Example:
/// curl --header "Content-Type: application/json" \
///  --request POST \
///  --data '{"email":"hehe","password":"pwd"}' \
///  127.0.0.1:8089/auth
pub async fn auth_handler(
    service_data: web::Data<Mutex<ApplicationData>>,
    provided_payload: web::Json<AuthPayload>,
) -> HttpResponse {
    let auth_payload = provided_payload.into_inner();

    match service_data
        .lock()
        .unwrap()
        .user_repo
        .get_slim_user(&auth_payload.email)
        .await
    {
        Ok(Some((slim_user, hash))) => {
            if hash == auth_payload.password {
                let token_result = service_data
                    .lock()
                    .unwrap()
                    .token_issuer
                    .issue_token(slim_user);
                match token_result {
                    Ok(token) => HttpResponse::Ok().json(token),
                    // TODO: log error
                    Err(_) => {
                        HttpResponse::InternalServerError().json(ServiceError::InternalServerError)
                    }
                }
            } else {
                HttpResponse::Unauthorized()
                    .json(ServiceError::AuthError(AuthError::IncorrectPassword))
            }
        }
        Ok(None) => HttpResponse::NotFound().json(ServiceError::AuthError(
            AuthError::UserDoesNotExist(auth_payload.email),
        )),
        Err(_) => {
            // TODO: log error
            HttpResponse::InternalServerError().json(ServiceError::InternalServerError)
        }
    }
}

pub async fn registration_handler(
    service_data: web::Data<Mutex<ApplicationData>>,
    provided_payload: web::Json<UserRegistrationPayload>,
) -> HttpResponse {

    // TODO: send email
    // TODO: error handling

    let registration_payload = provided_payload.into_inner();

    match service_data
        .lock()
        .unwrap()
        .user_repo
        .register_user(&registration_payload)
        .await
    {
        Ok(Some(slim_user)) => {
            println!("Signing token");
            let token_result = service_data
                .lock()
                .unwrap()
                .token_issuer
                .issue_token(slim_user);
            println!("Token signed");
            match token_result {
                Ok(token) => HttpResponse::Ok().json(token),
                // TODO: log error
                Err(_) => {
                    HttpResponse::InternalServerError().json(ServiceError::InternalServerError)
                }
            }
        }
        Ok(None) => {
            // FIXME
            HttpResponse::NotFound().json(ServiceError::RegistrationError(
                RegistrationError::UsernameAlreadyExists(registration_payload.username),
            ))
        }
        Err(e) => {
            // TODO: log error
            println!("{:?}", e);
            HttpResponse::InternalServerError().json(ServiceError::InternalServerError)
        }
    }
}

// TODO: registration
// TODO: delete account (account owner or admin can delete)
// TODO: logging

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    // database
    dotenv().ok();

    env_logger::init();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .expect("Failed to connect to the database!");

    //static MIGRATOR: Migrator = sqlx::migrate!();
    //MIGRATOR.run(&pool).await?;

    let shared_pool = Arc::new(pool);

    // Token issuer
    let issuer = TokenIssuer::from_rsa_pem("resources/private.pem")
        .await
        .unwrap();

    let user_repo = PostgresUserRepo::new(shared_pool.clone());

    let app_data =  web::Data::new(Mutex::new(ApplicationData {
        token_issuer: issuer,
        user_repo,
    }));

    HttpServer::new(move || {
        App::new()
            .wrap(middleware::Logger::default())
            .app_data(app_data.clone())
            .route("/auth", web::post().to(auth_handler))
            .route("/registration", web::post().to(registration_handler))
    })
    .bind(env::var("AUTH_SERVICE_ADDRESS").expect("AUTH_SERVICE_ADDRESS must be set"))?
    .run()
    .await
}
