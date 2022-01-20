use crate::error::Error as ResponseError;
use actix_web::HttpResponse;
use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Error, Debug, Serialize, Deserialize)]
pub enum DBUserError {
    #[error("The database does not contain user \"{0}\".")]
    UserDoesNotExist(i64),

    #[error("Unexpected error \"{0}\".")]
    UnexpectedError(String),
}

pub fn resolve(error: DBUserError) -> HttpResponse {
    match error {
        DBUserError::UserDoesNotExist(_) => HttpResponse::NotFound().json(ResponseError {
            code: 404,
            message: error.to_string(),
        }),
        DBUserError::UnexpectedError(_) => {
            HttpResponse::InternalServerError().json(ResponseError {
                code: 500,
                message: "Internal server error".to_string(),
            })
        }
    }
}
