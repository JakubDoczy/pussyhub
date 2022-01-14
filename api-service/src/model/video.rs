use ::serde::{Deserialize, Serialize};
use chrono::serde::ts_milliseconds;
use chrono::{DateTime, Utc};

#[derive(Clone, Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Video {
    pub id: i64,
    pub creator_id: i64,
    pub name: String,
    pub preview_url: String,
    pub video_url: String,
    pub views: i32,
    pub likes: i32,
    pub dislikes: i32,
    #[serde(with = "ts_milliseconds")]
    pub created_at: DateTime<Utc>,
}

#[derive(Clone, PartialEq, Serialize, Deserialize, Debug, sqlx::Type)]
#[sqlx(type_name = "video_state", rename_all = "snake_case")]
pub enum VideoState {
    Processing,
    Published,
}