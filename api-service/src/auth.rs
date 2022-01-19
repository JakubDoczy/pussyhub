use crate::error::auth::{resolve, AuthError};
use actix_web::web::Data;
use actix_web::{web, HttpRequest, HttpResponse, Responder};
use shared_lib::token_validation::{Role, SlimUser, TokenValidator};
use std::sync::Arc;

const PUBLIC_KEY_PEM: &str = include_str!("../resources/public.pem");

pub fn create_validator() -> TokenValidator {
    TokenValidator::from_rsa_pem(PUBLIC_KEY_PEM).unwrap()
}

pub fn check_role(
    request: &HttpRequest,
    token_validator: web::Data<Arc<TokenValidator>>,
    role: Role,
) -> Result<SlimUser, HttpResponse> {
    let header = request
        .headers()
        .get(actix_web::http::header::AUTHORIZATION);
    match header {
        Some(value) => {
            return match parse_token(value.to_str().unwrap_or_default()) {
                None => Err(resolve(AuthError::TokenValidationError)),
                Some(token) => match token_validator.validate(token) {
                    Ok(user) => {
                        if user.role != role {
                            return Err(resolve(AuthError::AccessDenied));
                        }
                        Ok(user)
                    }
                    Err(_) => Err(resolve(AuthError::TokenValidationError)),
                },
            }
        }
        None => Err(resolve(AuthError::TokenNotProvided)),
    }
}

fn parse_token(token: &str) -> Option<&str> {
    let parts: Vec<&str> = token.split(" ").collect();
    if parts.len() != 2 {
        return None;
    }
    Some(parts[1])
}
