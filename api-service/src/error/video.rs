use crate::error::Error as ResponseError;
use actix_web::HttpResponse;
use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Error, Debug, Serialize)]
pub enum DBVideoError {
    #[error("The database does not contain video \"{0}\".")]
    VideoDoesNotExist(i64),

    #[error("Unexpected error \"{0}\".")]
    UnexpectedError(String),
}

pub fn resolve(error: DBVideoError) -> HttpResponse {
    match error {
        DBVideoError::VideoDoesNotExist(_) => HttpResponse::NotFound().json(ResponseError {
            code: 404,
            message: error.to_string(),
        }),
        DBVideoError::UnexpectedError(_) => {
            HttpResponse::InternalServerError().json(ResponseError {
                code: 500,
                message: "Internal server error".to_string(),
            })
        }
    }
}
