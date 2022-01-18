use ::serde::{Deserialize, Serialize};
use chrono::serde::ts_milliseconds;
use chrono::{DateTime, Utc};
use shared_lib::payload::category::CategoryResponse;
use shared_lib::payload::rating::Rating;
use shared_lib::payload::video::{GetVideos, VideoRequest, VideoResponse};

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
    pub category_name: Option<String>,
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
            category_name: None,
        }
    }
}

impl From<Video> for VideoResponse {
    fn from(video: Video) -> Self {
        VideoResponse {
            id: video.id.expect("Video Id has to be defined"),
            creator_id: video.creator_id,
            name: video.name,
            preview_url: video.preview_url,
            video_url: video.video_url,
            views: video.views,
            likes: video.likes,
            dislikes: video.dislikes,
            created_at: video.created_at.to_string(),
            rating: Rating { id: 0, rating: 0 },
            category: CategoryResponse {
                id: video.category_id,
                name: video.category_name.unwrap_or_default(),
            },
        }
    }
}

pub fn from_videos(videos: Vec<Video>) -> GetVideos {
    let mut response = GetVideos::new();
    for video in videos {
        response.push(VideoResponse::from(video));
    }
    response
}
