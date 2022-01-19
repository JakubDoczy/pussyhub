use std::sync::Arc;

use crate::error::user::DBUserError;
use crate::model::user::{Role, User};
use anyhow::Result;
use async_trait::async_trait;
use serde::Serialize;
use sqlx::PgPool;
use thiserror::Error;

#[async_trait]
pub trait UserRepository {
    async fn get_user(&self, id: i64) -> Result<User, DBUserError>;
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
    async fn get_user(&self, id: i64) -> Result<User, DBUserError> {
        let rec = sqlx::query_as!(
            User,
            r#"
            SELECT 
                id,
                email,
                verified,
                user_role as "user_role: Role",
                username,
                description,
                picture_url,
                created_at
            FROM registered_user
            WHERE id = $1
            "#,
            id: i64
        )
        .fetch_one(&*self.pg_pool)
        .await;

        match rec {
            Ok(video) => Ok(video),
            Err(e) => match e {
                sqlx::Error::RowNotFound => Err(DBUserError::UserDoesNotExist(id)),
                _ => Err(DBUserError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }
}
