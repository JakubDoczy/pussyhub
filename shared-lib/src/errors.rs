use thiserror::Error;

#[derive(Debug, Error)]
pub enum AuthError {
    #[error("The email \"{0}\" is not registered.")]
    UserDoesNotExist(String),

    #[error("The user provided incorrect password.")]
    IncorrectPassword,
}

#[derive(Debug, Error)]
pub enum ServiceError {
    #[error("The user has provided incorrect data.")]
    AuthError(AuthError),

    #[error("Unspecified internal error.")]
    InternalServerError // Hide specifics
}