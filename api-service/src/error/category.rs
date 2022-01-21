use crate::error::Error as ResponseError;
use actix_web::HttpResponse;
use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Error, Debug, Serialize, Deserialize)]
pub enum DBCategoryError {
    #[error("The database does not contain category \"{0}\".")]
    CategoryDoesNotExists(i64),

    #[error("Unexpected error \"{0}\".")]
    UnexpectedError(String),
}

pub fn resolve(error: DBCategoryError) -> HttpResponse {
    match error {
        DBCategoryError::CategoryDoesNotExists(_) => HttpResponse::NotFound().json(ResponseError {
            code: 404,
            message: error.to_string(),
        }),
        DBCategoryError::UnexpectedError(_) => {
            HttpResponse::InternalServerError().json(ResponseError {
                code: 500,
                message: "Internal server error".to_string(),
            })
        }
    }
}
