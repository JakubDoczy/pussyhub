use serde::{Deserialize, Serialize};
use shared_lib::payload::rating::Rating;

#[derive(Debug, Serialize, Deserialize)]
pub struct SQLRating {
    pub id: i64,
    pub rating: i8,
}

impl From<SQLRating> for Rating {
    fn from(rating: SQLRating) -> Self {
        Rating {
            id: rating.id,
            rating: rating.rating,
        }
    }
}

impl From<Rating> for SQLRating {
    fn from(rating: Rating) -> Self {
        SQLRating {
            id: rating.id,
            rating: rating.rating,
        }
    }
}
