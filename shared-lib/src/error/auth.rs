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
