use std::sync::Arc;

use crate::model::user::{User, Role};
use anyhow::Result;
use async_trait::async_trait;
use sqlx::PgPool;

#[async_trait]
pub trait UserRepository {
    async fn get_user(&self, id: i64) -> Result<User>;
}

pub struct PostgresUserRepository {
    pg_pool: Arc<PgPool>,
}

impl PostgresUserRepository {
    pub fn new(pg_pool: Arc<PgPool>) -> Self {
        Self { pg_pool }
    }
}

#[async_trait]
impl UserRepository for PostgresUserRepository {
    async fn get_user(&self, id: i64) -> anyhow::Result<User> {
        let result = sqlx::query_as!(
            User, 
            r#"
            SELECT id, email, user_role as "user_role: Role", username, description, picture_url FROM registered_user WHERE id = $1
            "#, 
            id
        )
            .fetch_one(&*self.pg_pool)
            .await?;
        return Ok(result);
    }
}