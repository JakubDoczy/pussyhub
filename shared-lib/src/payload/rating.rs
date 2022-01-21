use serde::{Serialize, Deserialize};
use validator::Validate;

#[derive(Debug, Serialize, Deserialize, Validate)]
pub struct Rating {
    pub id: i64,
    #[validate(range(min = -1, max = 1, message="Rating should be -1 or 1"))]
    pub rating: i8
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RatingResponse {
    pub toggled: bool
}