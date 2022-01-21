use actix_web::{web, HttpResponse};

use tracing::{debug, error};
use argon2;

use shared_lib::payload::auth::AuthPayload;
use shared_lib::error::auth::AuthError;

use crate::application_data::ApplicationData;
use crate::database::error::DBAuthError;

macro_rules! shared_call {
    ($app_data:expr, $argument:ident, $method:ident($($method_args:expr),*)) => {
        $app_data.$argument.lock().unwrap().$method($($method_args),*)
    };
}

enum PasswordVerificationResult {
    Success,
    InvalidEncodedPassword,
    WrongPassword
}

fn verify_password(encoded_password: &str, received_password: &[u8]) -> PasswordVerificationResult {
    match argon2::verify_encoded(encoded_password, received_password) {
        Ok(true) => PasswordVerificationResult::Success,
        Ok(false) => PasswordVerificationResult::WrongPassword,
        Err(e) => {
            error!("Invalid password stored in database: {:?}", e);
            return PasswordVerificationResult::InvalidEncodedPassword;
        }
    }
}


/// Handles authentication requests.
/// If successful, returns JSON Web Token.
///
/// Example:
/// curl --header "Content-Type: application/json" \
///  --request POST \
///  --data '{"email":"john.doe@gmail.com","password":"pwd"}' \
///  127.0.0.1:8089/auth
pub(crate) async fn auth_handler(
    service_data: web::Data<ApplicationData>,
    provided_payload: web::Json<AuthPayload>,
) -> HttpResponse {
    let auth_payload = provided_payload.into_inner();

    let auth_result =
        shared_call!(service_data, user_repo, get_slim_user(&auth_payload.email)).await;

    match auth_result {
        Ok((slim_user, encoded_password)) => {

            match verify_password(&encoded_password, auth_payload.password.as_bytes()) {
                PasswordVerificationResult::Success => {
                    let token_result = shared_call!(service_data, token_issuer, issue_token(slim_user));
                    match token_result {
                        Ok(token) => {
                            debug!("Successfully created token: {:?}", token);
                            HttpResponse::Ok().content_type("application/jwt").body(token)
                        }
                        Err(e) => {
                            error!("Error, failed to issue token {:?}", e);
                            HttpResponse::InternalServerError().json(AuthError::UnexpectedError)
                        }
                    }
                },
                PasswordVerificationResult::InvalidEncodedPassword => {
                    HttpResponse::InternalServerError().json(AuthError::UnexpectedError)
                },
                PasswordVerificationResult::WrongPassword => {
                    debug!("Incorrect password for user {:?}", slim_user);
                    HttpResponse::Unauthorized().json(AuthError::IncorrectPassword)
                }
            }
        }
        Err(DBAuthError::UserDoesNotExist(email)) => {
            debug!("User email does not exist: {:?}", email);
            HttpResponse::InternalServerError().json(AuthError::UserDoesNotExist(email))
        }
        Err(e) => {
            error!("Unexpected error when retrieving user data {:?}", e);
            HttpResponse::InternalServerError().json(AuthError::UnexpectedError)
        }
    }
}
