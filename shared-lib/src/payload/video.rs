use serde::{Serialize, Deserialize};

use super::{rating::Rating, category::Category};

#[derive(Debug, Serialize, Deserialize)]
pub struct Video {
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
    pub category: Category
}

#[derive(Debug, Serialize, Deserialize)]
pub struct VideoWithoutId {
    pub creator_id: i64,
    pub name: String,
    pub preview_url: String,
    pub video_url: String,
    pub views: i32,
    pub likes: i32,
    pub dislikes: i32,
    pub created_at: String,
    pub rating: Rating,
    pub category: Category
}

pub type GetVideoResponse = Video;

pub type PutVideoRequest = VideoWithoutId;
pub type PutVideoResponse = Video;

pub type PostVideoRequest = VideoWithoutId;
pub type PostVideoResponse = Video;

pub type GetVideos = Vec<Video>;