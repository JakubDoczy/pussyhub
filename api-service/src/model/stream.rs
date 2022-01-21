use chrono::serde::ts_milliseconds;
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use shared_lib::payload::category::CategoryResponse;
use shared_lib::payload::stream::{GetStreams, StreamRequest, StreamResponse};

#[derive(Clone, Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Stream {
    pub id: Option<i64>,
    pub creator_id: i64,
    pub name: String,
    pub preview_url: String,
    pub stream_url: String,
    pub views: i32,
    pub likes: i32,
    pub dislikes: i32,
    #[serde(with = "ts_milliseconds")]
    pub created_at: DateTime<Utc>,
    pub category_id: i64,
    pub category_name: Option<String>,
    pub rating: Option<i16>,
}

#[derive(Clone, PartialEq, Serialize, Deserialize, Debug, sqlx::Type)]
#[sqlx(type_name = "stream_state", rename_all = "snake_case")]
pub enum StreamState {
    Processing,
    Published,
}

impl From<StreamRequest> for Stream {
    fn from(stream: StreamRequest) -> Self {
        Stream {
            id: None,
            creator_id: stream.creator_id,
            name: stream.name,
            preview_url: stream.preview_url,
            stream_url: stream.stream_url,
            views: 0,
            likes: 0,
            dislikes: 0,
            created_at: chrono::offset::Utc::now(),
            category_id: stream.category,
            category_name: None,
            rating: None,
        }
    }
}

impl From<Stream> for StreamResponse {
    fn from(stream: Stream) -> Self {
        StreamResponse {
            id: stream.id.expect("Stream Id has to be defined"),
            creator_id: stream.creator_id,
            name: stream.name,
            preview_url: stream.preview_url,
            stream_url: stream.stream_url,
            views: stream.views,
            likes: stream.likes,
            dislikes: stream.dislikes,
            created_at: stream.created_at.to_rfc3339(),
            rating: stream.rating,
            category: CategoryResponse {
                id: stream.category_id,
                name: stream.category_name.unwrap_or_default(),
            },
        }
    }
}

pub fn from_streams(streams: Vec<Stream>) -> GetStreams {
    let mut response = GetStreams::new();
    for stream in streams {
        response.push(StreamResponse::from(stream));
    }
    response
}
