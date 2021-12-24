use std::env;
use std::sync::{Mutex, Arc};

use serde_json;

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
pub struct ApplicationData {
    pub token_issuer: TokenIssuer,
    pub user_repo: PostgresUserRepo
}


/// Example:
/// curl --header "Content-Type: application/json" \
///  --request POST \
///  --data '{"email":"hehe","password":"pwd"}' \
///  127.0.0.1:8089/auth
pub async fn auth_handler(service_data: web::Data<Mutex<ApplicationData>>, provided_payload: web::Json<AuthPayload>) -> HttpResponse {
    
    let auth_payload = provided_payload.into_inner();



    match service_data.lock().unwrap().user_repo.get_slim_user(&auth_payload.email).await {
        Ok(Some((slim_user, hash))) => {
            if hash == auth_payload.password {
                let token_result = service_data.lock().unwrap().token_issuer.issue_token(slim_user); 
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
}


#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    // database
    dotenv().ok();

    let u = AuthPayload {email:"admin".to_string(), password:"pwd".to_string()};
    
    println!("{}", serde_json::to_string(&u).unwrap());

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

    let app_data = ApplicationData {token_issuer: issuer, user_repo};  

    let data_pointer = web::Data::new(Mutex::new(auth_data));

    println!("Starting server!");

    HttpServer::new(move || {
        App::new()
        .app_data(app_data.clone())
        .route("/auth", web::post().to(auth_handler))
    })
    .bind("127.0.0.1:8089")?
    .run()
    .await
}







