use serde::{Deserialize, Serialize};
use thiserror::Error;
use validator;

#[derive(Error, Debug, Serialize, Deserialize, Clone)]
pub enum RegistrationError {
    #[error("The username \"{0}\" already exists.")]
    UsernameAlreadyExists(String),

    #[error("The email \"{0}\" is already registered.")]
    EmailAlreadyExists(String),

    #[error(transparent)]
    ValidationError(#[from] validator::ValidationError),

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