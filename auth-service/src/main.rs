use errors::{AuthError, ServiceError};
//use jwt::{decode, encode, Header, Validation};
use chrono::{Duration, Local};
//use slim_users::SlimUser;

mod errors;
//mod slim_users;
mod tokens;

use dotenv;
use sqlx::migrate::Migrate;

use crate::tokens::{TokenIssuer, TokenValidator, Role};

// TODO: Slim User (mail hash)
// Env variables? Do I need my own env for this service?

//
// https://dev.to/mygnu/auth-web-microservice-with-rust-using-actix-web---complete-tutorial-part-2-k3a
// https://gitlab.com/mygnu/rust-auth-server/-/tree/master/src


#[tokio::main]
async fn main() {
    let issuer = TokenIssuer::from_rsa_pem("resources/private.pem").await.unwrap();
    let validator = TokenValidator::from_rsa_pem("resources/public.pem").await.unwrap();

    let token = issuer.issue_token("john@gmail.com", Role::Admin);
    
    println!("{:?}", token);

    let role = validator.validate(&token.unwrap(), "john@gmail.com");


    println!("{:?}", role);
    // TODO start service
}
