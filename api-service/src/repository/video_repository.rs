use std::sync::Arc;

use crate::model::user::User;
use crate::model::video::{Video, VideoState};
use anyhow::Result;
use async_trait::async_trait;
use sqlx::PgPool;
use thiserror::Error;
use crate::model::category::Category;

#[async_trait]
pub trait VideoRepository {
    async fn get_video(&self, id: i64) -> Result<Video, DBVideoError>;
    async fn update_video(&self, id: i64, video: Video) -> Result<Video, DBVideoError>;
    async fn create_video(&self, video: Video) -> Result<Video, DBVideoError>;
    async fn delete_video(&self, id: i64) -> Result<(), DBVideoError>;
    async fn list_in_category(&self, category: i64) -> Result<Vec<Video>, DBVideoError>;
    async fn get_videos(&self) -> Result<Vec<Video>, DBVideoError>;
    async fn like(&self, id: i64, user: User) -> Result<(), DBVideoError>;
    async fn dislike(&self, id: i64, user: User) -> Result<(), DBVideoError>;
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
        let rec = sqlx::query_as!(
            Video,
            r#"
            SELECT 
                video.id as "id?",
                creator_id, 
                video.name as name,
                preview_url, 
                video_url, 
                views, 
                likes, 
                dislikes, 
                created_at,
                category.id as category_id,
                category.name as "category_name?"
            FROM video INNER JOIN category ON (category.id = video.category_id)
            WHERE video.id = $1
            "#,
            id: i64
        )
        .fetch_one(&*self.pg_pool)
        .await;

        match rec {
            Ok(video) => Ok(video),
            Err(e) => match e {
                sqlx::Error::RowNotFound => Err(DBVideoError::VideoDoesNotExist(id)),
                _ => Err(DBVideoError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }

    async fn update_video(&self, id: i64, video: Video) -> Result<Video, DBVideoError> {
        let res = sqlx::query!(
            r#"
            UPDATE video
            SET
                creator_id = $1,
                name = $2,
                preview_url = $3,
                video_url = $4
            WHERE id = $5
            "#,
            video.creator_id,
            video.name,
            video.preview_url,
            video.video_url,
            id
        )
        .execute(&*self.pg_pool)
        .await;

        match res {
            Ok(_) => self.get_video(id).await,
            Err(e) => match e {
                sqlx::Error::RowNotFound => Err(DBVideoError::VideoDoesNotExist(id)),
                _ => Err(DBVideoError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }

    async fn create_video(&self, video: Video) -> Result<Video, DBVideoError> {
        let res = sqlx::query!(
            r#"
            INSERT INTO video (
                creator_id,
                name,
                preview_url,
                video_url,
                views,
                likes,
                dislikes,
                created_at,
                category_id
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING
                id
            "#,
            video.creator_id,
            video.name,
            video.preview_url,
            video.video_url,
            0,
            0,
            0,
            chrono::offset::Utc::now(),
            video.category_id
        )
        .fetch_one(&*self.pg_pool)
        .await;

        match res {
            Ok(rec) => self.get_video(rec.id).await,
            Err(e) => match e {
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
        .execute(&*self.pg_pool)
        .await;

        match res {
            Ok(_) => Ok(()),
            Err(e) => match e {
                sqlx::Error::RowNotFound => Err(DBVideoError::VideoDoesNotExist(id)),
                _ => Err(DBVideoError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }

    async fn list_in_category(&self, category: i64) -> Result<Vec<Video>, DBVideoError> {
        let res = sqlx::query_as!(
            Video,
            r#"
            SELECT
                video.id as "id?",
                creator_id,
                video.name as name,
                preview_url,
                video_url,
                views,
                likes,
                dislikes,
                created_at,
                category.id as category_id,
                category.name as "category_name?"
            FROM video INNER JOIN category ON (category.id = video.category_id)
            WHERE category_id = $1
            "#,
            category
        )
        .fetch_all(&*self.pg_pool)
        .await;

        match res {
            Ok(video) => Ok(video),
            Err(e) => match e {
                _ => Err(DBVideoError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }

    async fn get_videos(&self) -> Result<Vec<Video>, DBVideoError> {
        let res = sqlx::query_as!(
            Video,
            r#"
            SELECT
                video.id as "id?",
                creator_id,
                video.name as name,
                preview_url,
                video_url,
                views,
                likes,
                dislikes,
                created_at,
                category.id as category_id,
                category.name as "category_name?"
            FROM video INNER JOIN category ON (category.id = video.category_id)
            WHERE category_id != $1
            "#,
            -1 // WTF try remove where clause
        )
            .fetch_all(&*self.pg_pool)
            .await;

        match res {
            Ok(video) => Ok(video),
            Err(e) => match e {
                _ => Err(DBVideoError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }

    async fn like(&self, id: i64, user: User) -> Result<(), DBVideoError> {
        let res = sqlx::query!(
            r#"
            UPDATE video
            SET
                likes = likes + 1
            WHERE id = $1
            "#,
            id
        )
        .execute(&*self.pg_pool)
        .await;

        if let Err(e) = res {
            return match e {
                sqlx::Error::RowNotFound => Err(DBVideoError::VideoDoesNotExist(id)),
                _ => Err(DBVideoError::UnexpectedError(format!("{:?}", e))),
            };
        };

        let res = sqlx::query!(
            r#"
            INSERT INTO rating (
                user_id,
                video_id,
                rating
            )
            VALUES ($1, $2, $3)
            "#,
            user.id,
            id,
            1
        )
        .execute(&*self.pg_pool)
        .await;

        match res {
            Ok(_) => Ok(()),
            Err(e) => match e {
                _ => Err(DBVideoError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }

    async fn dislike(&self, id: i64, user: User) -> Result<(), DBVideoError> {
        let res = sqlx::query_as!(
            Video,
            r#"
            UPDATE video
            SET
                dislikes = dislikes + 1
            WHERE id = $1
            "#,
            id
        )
        .fetch_one(&*self.pg_pool)
        .await;

        if let Err(e) = res {
            return match e {
                sqlx::Error::RowNotFound => Err(DBVideoError::VideoDoesNotExist(id)),
                _ => Err(DBVideoError::UnexpectedError(format!("{:?}", e))),
            };
        }

        let res = sqlx::query!(
            r#"
            INSERT INTO rating (
                user_id,
                video_id,
                rating
            )
            VALUES ($1, $2, $3)
            "#,
            user.id,
            id,
            -1
        )
        .execute(&*self.pg_pool)
        .await;

        match res {
            Ok(_) => Ok(()),
            Err(e) => match e {
                _ => Err(DBVideoError::UnexpectedError(format!("{:?}", e))),
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
