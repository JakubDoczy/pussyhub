use std::sync::Arc;

use crate::model::video::Video;
use anyhow::Result;
use async_trait::async_trait;
use shared_lib::payload::{category::Category, video::VideoWithoutId};
use sqlx::PgPool;
use thiserror::Error;

#[async_trait]
pub trait VideoRepository {
    async fn get_video(&self, id: i64) -> Result<Video, DBVideoError>;
    async fn update_video(&self, id: i64, video: VideoWithoutId) -> Result<Video, DBVideoError>;
    async fn create_video(&self, video: VideoWithoutId) -> Result<Video, DBVideoError>;
    async fn delete_video(&self, id: i64) -> Result<(), DBVideoError>;
    async fn list_in_category(&self, id: Category) -> Result<Vec<Video>, DBVideoError>;
}

pub struct PostgresVideoRepository {
    pg_pool: Arc<PgPool>,
}

impl PostgresVideoRepository {
    pub fn new(pg_pool: Arc<PgPool>) -> Self {
        Self { pg_pool }
    }
}

#[async_trait]
impl VideoRepository for PostgresVideoRepository {
    async fn get_video(&self, id: i64) -> Result<Video, DBVideoError> {
        let res = sqlx::query_as!(Video, 
            r#"
            SELECT 
                id, 
                creator_id, 
                name, 
                preview_url, 
                video_url, 
                views, 
                likes, 
                dislikes, 
                created_at 
            FROM video 
            WHERE id = $1
            "#
            , id: i64
        )
            .fetch_one(&*self.pg_pool)
            .await;

        match res {
            Ok(video) => Ok(video),
            Err(e) => match e {
                sqlx::Error::RowNotFound => Err(DBVideoError::VideoDoesNotExist(id)),
                _ => Err(DBVideoError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }

    async fn create_video(&self, video: VideoWithoutId) -> Result<Video, DBVideoError> {
        let res = sqlx::query_as!(Video, 
            r#"
            INSERT INTO video (
                creator_id, 
                name, 
                preview_url, 
                video_url, 
                views, 
                likes, 
                dislikes, 
                created_at
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING 
                id, 
                creator_id, 
                name, 
                preview_url, 
                video_url, 
                views, 
                likes, 
                dislikes, 
                created_at 
            "#,
            video.creator_id,
            video.name,
            video.preview_url,
            video.video_url,
            0,
            0,
            0,
            chrono::offset::Utc::now()
        )
            .fetch_one(&*self.pg_pool)
            .await;

        match res {
            Ok(video) => Ok(video),
            Err(e) => match e {
                _ => Err(DBVideoError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }

    async fn update_video(&self, id: i64, video: VideoWithoutId) -> Result<Video, DBVideoError> {
        let res = sqlx::query_as!(Video, 
            r#"
            UPDATE video 
            SET
                creator_id = $1, 
                name = $2, 
                preview_url = $3, 
                video_url = $4, 
                views = $5 
            WHERE id = $6
            RETURNING 
                id, 
                creator_id, 
                name, 
                preview_url, 
                video_url, 
                views, 
                likes, 
                dislikes, 
                created_at 
            "#,
            video.creator_id,
            video.name,
            video.preview_url,
            video.video_url,
            video.views,
            id
        )
            .fetch_one(&*self.pg_pool)
            .await;

        match res {
            Ok(video) => Ok(video),
            Err(e) => match e {
                sqlx::Error::RowNotFound => Err(DBVideoError::VideoDoesNotExist(id)),
                _ => Err(DBVideoError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }

    async fn delete_video(&self, id: i64) -> Result<(), DBVideoError> {
        let res = sqlx::query!(
            r#"
            DELETE FROM video 
            WHERE id = $1
            "#, 
            id
        )
            .execute(&*self.pg_pool).await;

        match res {
            Ok(_) => Ok(()),
            Err(e) => match e {
                sqlx::Error::RowNotFound => Err(DBVideoError::VideoDoesNotExist(id)),
                _ => Err(DBVideoError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }

    async fn list_in_category(&self, _id: Category) -> Result<Vec<Video>, DBVideoError> {
        // TODO: implement category search
        let res = sqlx::query_as!(Video, 
            r#"
            SELECT 
                id, 
                creator_id, 
                name, 
                preview_url, 
                video_url, 
                views, 
                likes, 
                dislikes, 
                created_at 
            FROM video 
            "#
        )
            .fetch_all(&*self.pg_pool)
            .await;

        match res {
            Ok(video) => Ok(video),
            Err(e) => match e {
                _ => Err(DBVideoError::UnexpectedError(format!("{:?}", e)))
            },
        }
    }
}

#[derive(Error, Debug)]
pub enum DBVideoError {
    #[error("The database does not contain video \"{0}\".")]
    VideoDoesNotExist(i64),

    #[error("Unexpected error \"{0}\".")]
    UnexpectedError(String),
}