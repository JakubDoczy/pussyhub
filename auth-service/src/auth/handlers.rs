use actix_web::{middleware, web, App, HttpResponse, HttpServer};

use shared_lib::auth::AuthPayload;
use shared_lib::errors::AuthError;

use crate::application_data::ApplicationData;

macro_rules! shared_call {
    ($app_data:expr, $argument:ident, $method:ident($($method_args:expr),*)) => {
        $app_data.$argument.lock().unwrap().$method($($method_args),*)
    };
}

/// Example:
/// curl --header "Content-Type: application/json" \
///  --request POST \
///  --data '{"email":"hehe","password":"pwd"}' \
///  127.0.0.1:8089/auth
pub async fn auth_handler(
    service_data: web::Data<ApplicationData>,
    provided_payload: web::Json<AuthPayload>,
) -> HttpResponse {
    let auth_payload = provided_payload.into_inner();

    let auth_result =
        shared_call!(service_data, user_repo, get_slim_user(&auth_payload.email)).await;

    match auth_result {
        Ok((slim_user, hash)) => {
            if hash == auth_payload.password {
                let token_result = shared_call!(service_data, token_issuer, issue_token(slim_user));
                match token_result {
                    Ok(token) => HttpResponse::Ok().json(token),
                    // TODO: log error
                    Err(e) => {
                        HttpResponse::InternalServerError().json(AuthError::new_unexpected(&e))
                    }
                }
            } else {
                HttpResponse::Unauthorized().json(AuthError::IncorrectPassword)
            }
        }
        Err(e) => {
            // TODO: log error
            // TODO: censor errors
            HttpResponse::InternalServerError().json(e)
        }
    }
}
