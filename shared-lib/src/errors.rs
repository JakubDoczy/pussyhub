use serde::{Deserialize, Serialize};
use thiserror::Error;


#[derive(Error, Debug, Serialize, Deserialize, Clone)]
pub enum AuthError {
    #[error("The email \"{0}\" is not registered.")]
    UserDoesNotExist(String),

    #[error("The user provided incorrect password.")]
    IncorrectPassword,

    #[error("Unexpected error.")]
    UnexpectedError
}


#[derive(Error, Debug, Serialize, Deserialize, Clone)]
pub enum RegistrationError {
    #[error("The username \"{0}\" already exists.")]
    UsernameAlreadyExists(String),

    #[error("The email \"{0}\" is already registered.")]
    EmailAlreadyExists(String),

    #[error("Unexpected error.")]
    UnexpectedError,    
}

#[derive(Error, Debug, Serialize, Deserialize, Clone)]
pub enum EmailVerificationError {
    #[error("Unexpected error.")]
    UnexpectedError,

    #[error("Invitation token is invalid.")]
    InvalidToken,
}
