use ::serde::{Deserialize, Serialize};
use chrono::serde::ts_milliseconds;
use chrono::{DateTime, Utc};
use shared_lib::payload::video::{VideoRequest};
use crate::model::category::Category;

#[derive(Clone, Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Video {
    pub id: Option<i64>,
    pub creator_id: i64,
    pub name: String,
    pub preview_url: String,
    pub video_url: String,
    pub views: i32,
    pub likes: i32,
    pub dislikes: i32,
    #[serde(with = "ts_milliseconds")]
    pub created_at: DateTime<Utc>,
    pub category_id: i64,
    pub category_name: Option<String>
}

#[derive(Clone, PartialEq, Serialize, Deserialize, Debug, sqlx::Type)]
#[sqlx(type_name = "video_state", rename_all = "snake_case")]
pub enum VideoState {
    Processing,
    Published,
}

impl From<VideoRequest> for Video {
    fn from(video: VideoRequest) -> Self {
        Video {
            id: None,
            creator_id: video.creator_id,
            name: video.name,
            preview_url: video.preview_url,
            video_url: video.video_url,
            views: 0,
            likes: 0,
            dislikes: 0,
            created_at: chrono::offset::Utc::now(),
            category_id: video.category,
            category_name: None
        }
    }
}