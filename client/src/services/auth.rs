use std::env;
use lazy_static::lazy_static;
use shared_lib::error::auth::AuthError;
use shared_lib::error::registration::{EmailVerificationError, RegistrationError};
use shared_lib::payload::auth::AuthPayload;
use shared_lib::payload::registration::UserRegistrationPayload;
use shared_lib::token_validation::{Role, SlimUser};
use crate::services::jwt::{set_token, get_token, validate};

lazy_static!{
    static ref HOST: String = env::var("AUTH_SERVICE_URL").unwrap_or("http://127.0.0.1:8089".to_string());
}

/// Get current user info
pub fn user_info() -> SlimUser {
    if let Some(token) = get_token() {
        if let Ok(slim_user) = validate(token.as_str()) {
            return slim_user;
        }
    }
    SlimUser::default()
}

/// Is user authenticated
pub fn is_auth() -> bool {
    user_info().role != Role::Unauthorized
}

/// Login a user
pub async fn login(login_info: AuthPayload) -> Result<SlimUser, AuthError> {
    let response = reqwest::Client::new()
        .request(reqwest::Method::POST, format!{"{}/auth", *HOST})
        .header("Content-Type", "application/json")
        .json(&login_info)
        .send().await;

    if let Ok(data) = response {
        if data.status().is_success() {
            if let Ok(token) =  data.text().await {
                if let Ok(slim_user) = validate(token.as_str()) {
                    set_token(Some(token.to_string()));
                    return Ok(slim_user);
                }
            }

        }
        else if let Ok(err) = data.json::<AuthError>().await {
            return Err(err);
        }
    }
    Err(AuthError::UnexpectedError)
}

/// Register a new user
pub async fn register(register_info: UserRegistrationPayload) -> Result<SlimUser, RegistrationError> {
    let response = reqwest::Client::new()
        .request(reqwest::Method::POST, format!{"{}/registration", *HOST})
        .header("Content-Type", "application/json")
        .json(&register_info)
        .send().await;

    if let Ok(data) = response {
        if data.status().is_success() {
            if let Ok(token) =  data.text().await {
                if let Ok(slim_user) = validate(token.as_str()) {
                    set_token(Some(token.to_string()));
                    return Ok(slim_user);
                }
            }
        }
        else if let Ok(err) = data.json::<RegistrationError>().await {
            return Err(err);
        }
    }
    Err(RegistrationError::UnexpectedError)
}

/// Logout a user
pub fn logout()  {
    set_token(None);
}


/// Validate email confirmation token
pub async fn confirm_email(confirmation_token: String) -> Result<String, EmailVerificationError> {
    let response = reqwest::Client::new()
        .request(reqwest::Method::GET, format!("{}/confirmation/{}", *HOST, confirmation_token))
        .send().await;

    if let Ok(data) = response {
        if data.status().is_success() {
            if let Ok(res) =  data.text().await {
                return Ok(res);
            }
        }
        else if let Ok(err) = data.json::<EmailVerificationError>().await {
            return Err(err);
        }
    }
    Err(EmailVerificationError::UnexpectedError)
}
