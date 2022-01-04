use thiserror::Error;

#[derive(Error, Debug)]
pub enum DBAuthError {
    #[error("The database does not contain user \"{0}\".")]
    UserDoesNotExist(String),

    #[error("Unexpected error \"{0}\".")]
    UnexpectedError(String),
}

#[derive(Error, Debug)]
pub enum DBRegistrationError {
    #[error("The username \"{0}\" already exists.")]
    UsernameAlreadyExists(String),

    #[error("The email \"{0}\" is already registered.")]
    EmailAlreadyExists(String),

    #[error("Unexpected error \"{0}\".")]
    UnexpectedError(String),
}

#[derive(Error, Debug)]
pub enum DBEmailVerificationError {
    #[error("Unexpected error \"{0}\".")]
    UnexpectedError(String),
}
