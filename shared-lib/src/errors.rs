use serde::{Deserialize, Serialize};
use thiserror::Error;


#[derive(Error, Debug, Serialize, Deserialize, Clone)]
pub enum AuthError {
    #[error("The email \"{0}\" is not registered.")]
    UserDoesNotExist(String),

    #[error("The user provided incorrect password.")]
    IncorrectPassword,

    #[error("Unexpected error \"{0}\".")]
    UnexpectedError(String)
}

impl AuthError {

    pub fn new_unexpected(cause: &impl std::fmt::Debug) -> AuthError {
        AuthError::UnexpectedError(format!("Cause: {:?}", cause))
    }

    pub fn new_generic() -> AuthError {
        AuthError::UnexpectedError(format!("Cause not specified."))
    }
    
    pub fn censor(&self) -> Self {
        match self {
            AuthError::UnexpectedError(_) => {
                AuthError::UnexpectedError("Internal problem".to_string())
            }

            other_cause => {
                (*other_cause).clone()
            }
        }
    }
}


#[derive(Error, Debug, Serialize, Deserialize, Clone)]
pub enum RegistrationError {
    #[error("The username \"{0}\" already exists.")]
    UsernameAlreadyExists(String),

    #[error("The email \"{0}\" is already registered.")]
    EmailAlreadyExists(String),

    #[error("Unexpected error \"{0}\".")]
    UnexpectedError(String),    
}

impl RegistrationError {

    pub fn new_unexpected(cause: &impl std::fmt::Debug) -> RegistrationError {
        RegistrationError::UnexpectedError(format!("Cause: {:?}", cause))
    }

    pub fn new_generic() -> RegistrationError {
        RegistrationError::UnexpectedError(format!("Cause not specified."))
    }
    
    pub fn censor(&self) -> Self {
        match self {
            RegistrationError::UnexpectedError(_) => {
                RegistrationError::UnexpectedError("Internal problem".to_string())
            }

            other_cause => {
                (*other_cause).clone()
            }
        }
    }
}

#[derive(Error, Debug, Serialize, Deserialize, Clone)]
pub enum EmailVerificationError {
    #[error("Unexpected error \"{0}\".")]
    UnexpectedError(String),

    #[error("Invitation token is invalid.")]
    InvalidToken(),
}

impl EmailVerificationError {
    pub fn censor(&self) -> Self {
        match self {
            EmailVerificationError::UnexpectedError(_) => {
                EmailVerificationError::UnexpectedError("Internal problem".to_string())
            },
            e => (*e).clone(),
        }
    }   
}