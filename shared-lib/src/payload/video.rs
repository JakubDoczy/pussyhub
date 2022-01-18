use serde::{Serialize, Deserialize};
use validator::Validate;

use super::{rating::Rating, category::CategoryResponse};

#[derive(Debug, Serialize, Deserialize)]
pub struct VideoResponse {
    pub id: i64,
    pub creator_id: i64,
    pub name: String,
    pub preview_url: String,
    pub video_url: String,
    pub views: i32,
    pub likes: i32,
    pub dislikes: i32,
    pub created_at: String,
    pub rating: Rating,
    pub category: CategoryResponse
}

#[derive(Debug, Serialize, Deserialize, Validate)]
pub struct VideoRequest {
    pub creator_id: i64,
    #[validate(length(min = 1))]
    pub name: String,
    pub preview_url: String,
    pub video_url: String,
    pub category: i64
}

pub type GetVideoResponse = VideoResponse;

pub type PutVideoRequest = VideoRequest;
pub type PutVideoResponse = VideoResponse;

pub type PostVideoRequest = VideoRequest;
pub type PostVideoResponse = VideoResponse;

pub type GetVideos = Vec<VideoResponse>;