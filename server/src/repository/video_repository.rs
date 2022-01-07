use std::sync::Arc;

use crate::model::video::Video;
use anyhow::Result;
use async_trait::async_trait;
use sqlx::PgPool;

#[async_trait]
pub trait VideoRepository {
    async fn get_video(&self, id: i32) -> Result<Video>;
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
    async fn get_video(&self, id: i32) -> anyhow::Result<Video> {
        let video = sqlx::query_as!(Video, r#"SELECT * FROM video WHERE id = $1"#, id: i32)
            .fetch_one(&*self.pg_pool)
            .await?;

        Ok(video)
    }
}