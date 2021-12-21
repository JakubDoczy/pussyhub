use std::env;
use std::sync::Arc;

use ::dotenv::dotenv;

use chrono::{Duration, Local};

use shared_lib::token_validation::{TokenValidator, SlimUser, Role};

use shared_lib::auth::AuthPayload;
use shared_lib::errors::{ServiceError, AuthError};

use actix_web::{
    dev::Payload, error::BlockingError, web, Error, FromRequest, HttpRequest, HttpResponse, HttpServer, App, post
};

use sqlx::migrate::Migrate;
use sqlx::postgres::PgPoolOptions;

use crate::token_issuer::TokenIssuer;

use crate::user_repo::PostgresUserRepo;

mod token_issuer;
mod user_repo;


// TODO: Slim User (mail hash)
// Env variables? Do I need my own env for this service?

//
// https://dev.to/mygnu/auth-web-microservice-with-rust-using-actix-web---complete-tutorial-part-2-k3a
// https://gitlab.com/mygnu/rust-auth-server/-/tree/master/src


#[derive(Clone)]
pub struct AuthData {
    pub token_issuer: TokenIssuer,
    pub user_repo: PostgresUserRepo
}


pub async fn auth_handler(service_data: web::Data<AuthData>, provided_payload: web::Json<AuthPayload>) -> HttpResponse {
    
    let auth_payload = provided_payload.into_inner();

    match service_data.user_repo.get_slim_user(&auth_payload.email).await {
        Ok(Some((slim_user, hash))) => {
            if hash == auth_payload.password {
                let token_result = service_data.token_issuer.issue_token(slim_user); 
                match token_result {
                    Ok(token) => HttpResponse::Ok().json(token),
                    Err(e) => HttpResponse::InternalServerError().json(ServiceError::InternalServerError)
                }
                
            } else {
                HttpResponse::Unauthorized().json(ServiceError::AuthError(AuthError::IncorrectPassword))
            }
        }
        Ok(None) => {
            HttpResponse::NotFound().json(ServiceError::AuthError(AuthError::UserDoesNotExist(auth_payload.email)))
        }
        Err(e) => {
            HttpResponse::InternalServerError().json(ServiceError::InternalServerError)
        }
    }


    //user_repo.get_slim_user(email: &str)
    
    //HttpResponse::NotFound();
    
    //HttpResponse::Ok().json()
}



#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    // database
    dotenv().ok();

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

    let auth_data = AuthData {token_issuer: issuer, user_repo};  


    println!("Starting server!");

    HttpServer::new(move || {
        App::new()
        .app_data(auth_data.clone())
        .route("/auth", web::post().to(auth_handler))
    })
    .bind("127.0.0.1:8089")?
    .run()
    .await
}







