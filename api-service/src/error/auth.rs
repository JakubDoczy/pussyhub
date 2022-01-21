use crate::error::Error as ResponseError;
use actix_web::HttpResponse;
use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Error, Debug, Serialize, Deserialize)]
pub enum AuthError {
    #[error("Token cannot be validated.")]
    TokenValidationError,

    #[error("Access denied error.")]
    AccessDenied,

    #[error("Token not provided error.")]
    TokenNotProvided,
}

pub fn resolve(error: AuthError) -> HttpResponse {
    match error {
        AuthError::TokenValidationError => HttpResponse::Forbidden().json(ResponseError {
            code: 403,
            message: error.to_string(),
        }),
        AuthError::AccessDenied => HttpResponse::Forbidden().json(ResponseError {
            code: 403,
            message: error.to_string(),
        }),
        AuthError::TokenNotProvided => HttpResponse::Forbidden().json(ResponseError {
            code: 403,
            message: error.to_string(),
        }),
    }
}
