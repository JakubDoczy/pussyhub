use std::sync::Arc;

use crate::model::user::{User, Role};
use anyhow::Result;
use async_trait::async_trait;
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
    async fn get_user(&self, id: i64)  -> Result<User, DBUserError> {
        let result = sqlx::query_as!(
            User, 
            r#"
            SELECT id, email, user_role as "user_role: Role", username, description, picture_url FROM registered_user WHERE id = $1
            "#, 
            id
        )
            .fetch_one(&*self.pg_pool)
            .await;
        match result {
            Ok(user) => Ok(user),
            Err(e) => match e {
                sqlx::Error::RowNotFound => Err(DBUserError::UserDoesNotExists(id)),
                _ => Err(DBUserError::UnexpectedError(format!("{:?}", e))),
            },
        }
        
    }
}

#[derive(Error, Debug)]
pub enum DBUserError {
    #[error("The database does not contain user \"{0}\".")]
    UserDoesNotExists(i64),

    #[error("Unexpected error \"{0}\".")]
    UnexpectedError(String),
}