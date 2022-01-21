use serde::{Deserialize, Serialize};
use validator::{Validate, ValidationErrors};

use super::category::CategoryResponse;

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
pub struct StreamResponse {
    pub id: i64,
    pub creator_id: i64,
    pub name: String,
    pub preview_url: String,
    pub stream_url: String,
    pub views: i32,
    pub likes: i32,
    pub dislikes: i32,
    pub created_at: String,
    pub rating: Option<i16>,
    pub category: CategoryResponse,
}

#[derive(Debug, Serialize, Deserialize, Validate)]
pub struct StreamRequest {
    pub creator_id: i64,
    #[validate(length(min = 1, message = "min length for name is 1"))]
    pub name: String,
    pub preview_url: String,
    pub stream_url: String,
    pub category: i64,
}

pub type GetStreamResponse = StreamResponse;

pub type PutStreamRequest = StreamRequest;
pub type PutStreamResponse = StreamResponse;

pub type PostStreamRequest = StreamRequest;
pub type PostStreamResponse = StreamResponse;

pub type GetStreams = Vec<StreamResponse>;

impl StreamRequest {
    pub fn validate_content(&self) -> Result<(), ValidationErrors> {
        self.validate()
    }
}
