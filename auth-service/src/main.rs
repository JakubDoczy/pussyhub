use std::convert::From;
use errors::{AuthError, ServiceError};
//use jwt::{decode, encode, Header, Validation};
use chrono::{Local, Duration};
use slim_users::SlimUser;

mod errors;
mod slim_users;


// TODO: Slim User (mail hash)
// Env variables? Do I need my own env for this service?

// 
// https://dev.to/mygnu/auth-web-microservice-with-rust-using-actix-web---complete-tutorial-part-2-k3a
// https://gitlab.com/mygnu/rust-auth-server/-/tree/master/src


pub fn create_token(data: &SlimUser) -> Result<String, ServiceError> {
    let claims = Claims::with_email(data.email.as_str());
    encode(&Header::default(), &claims, get_secret().as_ref())
        .map_err(|_err| ServiceError::InternalServerError)
}

pub fn decode_token(token: &str) -> Result<SlimUser, ServiceError> {
    decode::<Claims>(token, get_secret().as_ref(), &Validation::default())
        .map(|data| Ok(data.claims.into()))
        .map_err(|_err| ServiceError::AuthError(AuthError::IncorrectPassword))?
}



fn main() {
    println!("Hello, world!");
    // TODO start service
}
