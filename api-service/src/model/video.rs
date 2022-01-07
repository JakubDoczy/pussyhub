use chrono::serde::ts_milliseconds;
use chrono::{DateTime, Utc};
use ::serde::{Serialize, Deserialize};

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