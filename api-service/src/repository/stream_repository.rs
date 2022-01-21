use std::sync::Arc;

use crate::error::stream::DBStreamError;
use crate::model::user::User;
use crate::model::stream::Stream;
use anyhow::Result;
use async_trait::async_trait;
use sqlx::PgPool;

#[async_trait]
pub trait StreamRepository {
    async fn get_stream(&self, id: i64) -> Result<Stream, DBStreamError>;
    async fn update_stream(&self, id: i64, stream: Stream) -> Result<Stream, DBStreamError>;
    async fn create_stream(&self, stream: Stream) -> Result<Stream, DBStreamError>;
    async fn delete_stream(&self, stream: Stream) -> Result<(), DBStreamError>;

    async fn list_in_category(&self, category: i64) -> Result<Vec<Stream>, DBStreamError>;
    async fn list_by_user(&self, user: i64) -> Result<Vec<Stream>, DBStreamError>;
    async fn get_streams(&self) -> Result<Vec<Stream>, DBStreamError>;

    async fn toggle_like(&self, id: i64, user: User) -> Result<bool, DBStreamError>;
    async fn toggle_dislike(&self, id: i64, user: User) -> Result<bool, DBStreamError>;

    async fn view(&self, id: i64) -> Result<bool, DBStreamError>;

    async fn remove_rating_from_stream(&self, id: i64, rating: i16) -> Result<(), DBStreamError>;
}

pub struct PostgresStreamRepository {
    pg_pool: Arc<PgPool>,
}

impl PostgresStreamRepository {
    pub fn new(pg_pool: Arc<PgPool>) -> Self {
        Self { pg_pool }
    }
}

#[async_trait]
impl StreamRepository for PostgresStreamRepository {
    async fn get_stream(&self, id: i64) -> Result<Stream, DBStreamError> {
        let rec = sqlx::query_as!(
            Stream,
            r#"
            SELECT 
                stream.id as "id?",
                creator_id, 
                stream.name as name,
                preview_url, 
                stream_url, 
                views,
                likes,
                dislikes,
                created_at,
                category.id as category_id,
                category.name as "category_name?",
                rating.rating as "rating?"
            FROM stream
                INNER JOIN category ON (category.id = stream.category_id)
                LEFT JOIN rating ON (stream.id = rating.video_id)
            WHERE stream.id = $1
            "#,
            id: i64
        )
        .fetch_one(&*self.pg_pool)
        .await;

        match rec {
            Ok(stream) => Ok(stream),
            Err(e) => match e {
                sqlx::Error::RowNotFound => Err(DBStreamError::StreamDoesNotExist(id)),
                _ => Err(DBStreamError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }

    async fn update_stream(&self, id: i64, stream: Stream) -> Result<Stream, DBStreamError> {
        let res = sqlx::query!(
            r#"
            UPDATE stream
            SET
                creator_id = $1,
                name = $2,
                preview_url = $3,
                stream_url = $4,
                category_id = $5
            WHERE id = $6
            "#,
            stream.creator_id,
            stream.name,
            stream.preview_url,
            stream.stream_url,
            stream.category_id,
            id
        )
        .execute(&*self.pg_pool)
        .await;

        match res {
            Ok(_) => self.get_stream(id).await,
            Err(e) => match e {
                sqlx::Error::RowNotFound => Err(DBStreamError::StreamDoesNotExist(id)),
                _ => Err(DBStreamError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }

    async fn create_stream(&self, stream: Stream) -> Result<Stream, DBStreamError> {
        let res = sqlx::query!(
            r#"
            INSERT INTO stream (
                creator_id,
                name,
                preview_url,
                stream_url,
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
            stream.creator_id,
            stream.name,
            stream.preview_url,
            stream.stream_url,
            0,
            0,
            0,
            chrono::offset::Utc::now(),
            stream.category_id
        )
        .fetch_one(&*self.pg_pool)
        .await;

        match res {
            Ok(rec) => self.get_stream(rec.id).await,
            Err(e) => match e {
                _ => Err(DBStreamError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }

    async fn delete_stream(&self, stream: Stream) -> Result<(), DBStreamError> {
        let res = sqlx::query!(
            r#"
            DELETE FROM stream 
            WHERE id = $1
            "#,
            stream.id
        )
        .execute(&*self.pg_pool)
        .await;

        match res {
            Ok(_) => Ok(()),
            Err(e) => match e {
                sqlx::Error::RowNotFound => Err(DBStreamError::StreamDoesNotExist(stream.id.unwrap())),
                _ => Err(DBStreamError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }

    async fn list_in_category(&self, category: i64) -> Result<Vec<Stream>, DBStreamError> {
        let res = sqlx::query_as!(
            Stream,
            r#"
            SELECT
                stream.id as "id?",
                creator_id,
                stream.name as name,
                preview_url,
                stream_url,
                views,
                likes,
                dislikes,
                created_at,
                category.id as category_id,
                category.name as "category_name?",
                rating.rating as "rating?"
            FROM stream
                INNER JOIN category ON (category.id = stream.category_id)
                LEFT JOIN rating ON (stream.id = rating.video_id)
            WHERE category_id = $1
            "#,
            category
        )
        .fetch_all(&*self.pg_pool)
        .await;

        match res {
            Ok(streams) => Ok(streams),
            Err(e) => match e {
                _ => Err(DBStreamError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }

    async fn list_by_user(&self, user: i64) -> Result<Vec<Stream>, DBStreamError> {
        let res = sqlx::query_as!(
            Stream,
            r#"
            SELECT
                stream.id as "id?",
                creator_id,
                stream.name as name,
                preview_url,
                stream_url,
                views,
                likes,
                dislikes,
                created_at,
                category.id as category_id,
                category.name as "category_name?",
                rating.rating as "rating?"
            FROM stream
                INNER JOIN category ON (category.id = stream.category_id)
                LEFT JOIN rating ON (stream.id = rating.video_id)
            WHERE creator_id = $1
            "#,
            user
        )
        .fetch_all(&*self.pg_pool)
        .await;

        match res {
            Ok(streams) => Ok(streams),
            Err(e) => match e {
                _ => Err(DBStreamError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }

    async fn get_streams(&self) -> Result<Vec<Stream>, DBStreamError> {
        let res = sqlx::query_as!(
            Stream,
            r#"
            SELECT
                stream.id as "id?",
                creator_id,
                stream.name as name,
                preview_url,
                stream_url,
                views,
                likes,
                dislikes,
                created_at,
                category.id as category_id,
                category.name as "category_name?",
                rating.rating as "rating?"
            FROM stream
                INNER JOIN category ON (category.id = stream.category_id)
                LEFT JOIN rating ON (stream.id = rating.video_id)
            WHERE category_id != $1
            "#,
            -1 // WTF try remove where clause
        )
        .fetch_all(&*self.pg_pool)
        .await;

        match res {
            Ok(streams) => Ok(streams),
            Err(e) => match e {
                _ => Err(DBStreamError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }

    async fn toggle_like(&self, id: i64, user: User) -> Result<bool, DBStreamError> {
        Ok(true)
    }

    async fn toggle_dislike(&self, id: i64, user: User) -> Result<bool, DBStreamError> {
        Ok(true)
    }

    async fn view(&self, id: i64) -> Result<bool, DBStreamError> {
        let res = sqlx::query!(
            r#"
            UPDATE stream
            SET
                views = views + 1
            WHERE id = $1
            "#,
            id
        )
        .execute(&*self.pg_pool)
        .await;

        match res {
            Ok(_) => Ok(true),
            Err(e) => match e {
                sqlx::Error::RowNotFound => Err(DBStreamError::StreamDoesNotExist(id)),
                _ => Err(DBStreamError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }

    async fn remove_rating_from_stream(&self, id: i64, rating: i16) -> Result<(), DBStreamError> {
        Ok(())
    }
}
