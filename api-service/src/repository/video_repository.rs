use std::sync::Arc;

use crate::model::user::User;
use crate::model::video::Video;
use anyhow::Result;
use async_trait::async_trait;
use serde::Serialize;
use sqlx::PgPool;
use thiserror::Error;

#[async_trait]
pub trait VideoRepository {
    async fn get_video(&self, id: i64) -> Result<Video, DBVideoError>;
    async fn update_video(&self, id: i64, video: Video) -> Result<Video, DBVideoError>;
    async fn create_video(&self, video: Video) -> Result<Video, DBVideoError>;
    async fn delete_video(&self, id: i64) -> Result<(), DBVideoError>;

    async fn list_in_category(&self, category: i64) -> Result<Vec<Video>, DBVideoError>;
    async fn list_by_user(&self, user: i64) -> Result<Vec<Video>, DBVideoError>;
    async fn get_videos(&self) -> Result<Vec<Video>, DBVideoError>;

    async fn toggle_like(&self, id: i64, user: User) -> Result<bool, DBVideoError>;
    async fn toggle_dislike(&self, id: i64, user: User) -> Result<bool, DBVideoError>;

    async fn view(&self, id: i64) -> Result<bool, DBVideoError>;
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
                category.name as "category_name?",
                rating.rating as "rating?"
            FROM video
                INNER JOIN category ON (category.id = video.category_id)
                LEFT JOIN rating ON (video.id = rating.video_id)
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
                category.name as "category_name?",
                rating.rating as "rating?"
            FROM video
                INNER JOIN category ON (category.id = video.category_id)
                LEFT JOIN rating ON (video.id = rating.video_id)
            WHERE category_id = $1
            "#,
            category
        )
        .fetch_all(&*self.pg_pool)
        .await;

        match res {
            Ok(videos) => Ok(videos),
            Err(e) => match e {
                _ => Err(DBVideoError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }

    async fn list_by_user(&self, user: i64) -> Result<Vec<Video>, DBVideoError> {
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
                category.name as "category_name?",
                rating.rating as "rating?"
            FROM video
                INNER JOIN category ON (category.id = video.category_id)
                LEFT JOIN rating ON (video.id = rating.video_id)
            WHERE creator_id = $1
            "#,
            user
        )
        .fetch_all(&*self.pg_pool)
        .await;

        match res {
            Ok(videos) => Ok(videos),
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
                category.name as "category_name?",
                rating.rating as "rating?"
            FROM video
                INNER JOIN category ON (category.id = video.category_id)
                LEFT JOIN rating ON (video.id = rating.video_id)
            WHERE category_id != $1
            "#,
            -1 // WTF try remove where clause
        )
        .fetch_all(&*self.pg_pool)
        .await;

        match res {
            Ok(videos) => Ok(videos),
            Err(e) => match e {
                _ => Err(DBVideoError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }

    async fn toggle_like(&self, id: i64, user: User) -> Result<bool, DBVideoError> {
        let mut add_to_likes = 1;
        let res = sqlx::query!(
            r#"
            SELECT
                rating
            FROM
               rating
            WHERE
                video_id = $1 AND
                user_id = $2
            "#,
            id,
            user.id
        )
        .fetch_one(&*self.pg_pool)
        .await;

        if let Ok(rating) = res {
            if rating.rating == 1 {
                add_to_likes = -1;
            } else {
                return Err(DBVideoError::VideoAlreadyHasDislike(id));
            }
        }

        let res = sqlx::query!(
            r#"
            UPDATE video
            SET
                likes = likes + $1
            WHERE id = $2
            "#,
            add_to_likes,
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

        if add_to_likes == 1 {
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

            return match res {
                Ok(_) => Ok(add_to_likes != 1),
                Err(e) => match e {
                    _ => Err(DBVideoError::UnexpectedError(format!("{:?}", e))),
                },
            };
        }
        let res = sqlx::query!(
            r#"
            DELETE FROM rating
            WHERE
                user_id = $1 AND
                video_id = $2
            "#,
            user.id,
            id,
        )
        .execute(&*self.pg_pool)
        .await;

        return match res {
            Ok(_) => Ok(add_to_likes != 1),
            Err(e) => match e {
                _ => Err(DBVideoError::UnexpectedError(format!("{:?}", e))),
            },
        };
    }

    async fn toggle_dislike(&self, id: i64, user: User) -> Result<bool, DBVideoError> {
        let mut add_to_dislikes = 1;
        let res = sqlx::query!(
            r#"
            SELECT
                rating
            FROM
               rating
            WHERE
                video_id = $1 AND
                user_id = $2
            "#,
            id,
            user.id
        )
        .fetch_one(&*self.pg_pool)
        .await;

        if let Ok(rating) = res {
            if rating.rating == -1 {
                add_to_dislikes = -1;
            } else {
                return Err(DBVideoError::VideoAlreadyHasLike(id));
            }
        }

        let res = sqlx::query!(
            r#"
            UPDATE video
            SET
                dislikes = dislikes + $1
            WHERE id = $2
            "#,
            add_to_dislikes,
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

        if add_to_dislikes == 1 {
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

            return match res {
                Ok(_) => Ok(add_to_dislikes != 1),
                Err(e) => match e {
                    _ => Err(DBVideoError::UnexpectedError(format!("{:?}", e))),
                },
            };
        }
        let res = sqlx::query!(
            r#"
            DELETE FROM rating
            WHERE
                user_id = $1 AND
                video_id = $2
            "#,
            user.id,
            id,
        )
        .execute(&*self.pg_pool)
        .await;

        return match res {
            Ok(_) => Ok(add_to_dislikes != 1),
            Err(e) => match e {
                _ => Err(DBVideoError::UnexpectedError(format!("{:?}", e))),
            },
        };
    }

    async fn view(&self, id: i64) -> Result<bool, DBVideoError> {
        let res = sqlx::query!(
            r#"
            UPDATE video
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
                sqlx::Error::RowNotFound => Err(DBVideoError::VideoDoesNotExist(id)),
                _ => Err(DBVideoError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }
}

#[derive(Error, Debug, Serialize)]
pub enum DBVideoError {
    #[error("The database does not contain video \"{0}\".")]
    VideoDoesNotExist(i64),

    #[error("Video \"{0}\" has already like.")]
    VideoAlreadyHasLike(i64),

    #[error("Video \"{0}\" has already dislike.")]
    VideoAlreadyHasDislike(i64),

    #[error("Unexpected error \"{0}\".")]
    UnexpectedError(String),
}
