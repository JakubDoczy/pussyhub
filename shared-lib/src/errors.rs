use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Error, Debug, Serialize, Deserialize)]
pub enum AuthError {
    #[error("The email \"{0}\" is not registered.")]
    UserDoesNotExist(String),

    #[error("The user provided incorrect password.")]
    IncorrectPassword,
}

#[derive(Error, Debug, Serialize, Deserialize)]
pub enum RegistrationError {
    #[error("The username \"{0}\" already exists.")]
    UsernameAlreadyExists(String),

    #[error("The email \"{0}\" is already registered.")]
    EmailAlreadyExists(String),
}

#[derive(Error, Debug, Serialize, Deserialize)]
pub enum ServiceError {
    #[error("The user has provided incorrect data.")]
    AuthError(AuthError),

    #[error("The user can't be registered.")]
    RegistrationError(RegistrationError),

    #[error("Unspecified internal error.")]
    InternalServerError // Hide specifics
}