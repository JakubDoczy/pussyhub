use errors::{AuthError, ServiceError};
use chrono::{Duration, Local};

use shared_lib::token_validation::{TokenValidator, SlimUser, Role};

use shared_lib::auth::AuthData;
use shared_lib::errors::ServiceError;

use actix_web::{
    dev::Payload, error::BlockingError, web, Error, FromRequest, HttpRequest, HttpResponse, HttpServer, App, post
};

use dotenv;
use sqlx::migrate::Migrate;

use crate::token_issuer::TokenIssuer;

use crate::user_repo::PostgresUserRepo;

mod errors;
mod token_issuer;
mod user_repo;


// TODO: Slim User (mail hash)
// Env variables? Do I need my own env for this service?

//
// https://dev.to/mygnu/auth-web-microservice-with-rust-using-actix-web---complete-tutorial-part-2-k3a
// https://gitlab.com/mygnu/rust-auth-server/-/tree/master/src



//#[post("/auth")]
pub async fn auth_handler(auth_data: web::Json<AuthData>, user_repo: &PostgresUserRepo, token_issuer: &TokenIssuer) -> HttpResponse {
    
    let res = auth_data.into_inner();

    match res {
        Ok(user) => {
            user.email;
            user.password;

            
            match user_repo.get_slim_user(user.email).await {
                Ok((slim_user, hash)) => {
                    
                }
                Err(e) => {

                }

            }


            HttpResponse::Ok().finish()
        }
        Err(err) => match err {
            BlockingError::Error(service_error) => Err(service_error),
            BlockingError::Canceled => Err(ServiceError::InternalServerError),
        },
    }


    //user_repo.get_slim_user(email: &str)
    
    //HttpResponse::NotFound();
    
    //HttpResponse::Ok().json()
}



#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(move || {
        App::new().service(web::resource("/").route(web::get().to(index)))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}








/*

#[tokio::main]
async fn main() {
    let issuer = TokenIssuer::from_rsa_pem("resources/private.pem")
        .await
        .unwrap();
    let validator = TokenValidator::from_rsa_pem("resources/public.pem")
        .await
        .unwrap();

    let token = issuer.issue_token(SlimUser {
        user_id: 10,
        email: "john@gmail.com".to_string(),
        username: "John".to_string(),
        role: Role::Admin,
    });

    println!("{:?}", token);

    let user = validator.validate(&token.unwrap());

    println!("{:?}", user);
    // TODO start service
}
*/