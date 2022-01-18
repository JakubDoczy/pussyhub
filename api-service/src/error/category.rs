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
        DBCategoryError::CategoryDoesNotExists(_) => HttpResponse::NotFound().json(error),
        DBCategoryError::UnexpectedError(_) => HttpResponse::InternalServerError().json(Error {
            code: 500,
            message: "Internal server error".to_string(),
        }),
    }
}
#[derive(Serialize, Deserialize)]
struct Error {
    code: u16,
    message: String,
}
