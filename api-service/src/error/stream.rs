use crate::error::Error as ResponseError;
use actix_web::HttpResponse;
use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Error, Debug, Serialize, Deserialize)]
pub enum DBStreamError {
    #[error("The database does not contain stream \"{0}\".")]
    StreamDoesNotExist(i64),

    #[error("Unexpected error \"{0}\".")]
    UnexpectedError(String),
}

pub fn resolve(error: DBStreamError) -> HttpResponse {
    match error {
        DBStreamError::StreamDoesNotExist(_) => HttpResponse::NotFound().json(ResponseError {
            code: 404,
            message: error.to_string(),
        }),
        DBStreamError::UnexpectedError(_) => {
            HttpResponse::InternalServerError().json(ResponseError {
                code: 500,
                message: "Internal server error".to_string(),
            })
        }
    }
}
