use anyhow::Result;
use sqlx::{Executor, PgPool};
use std::sync::Arc;
use tokens::Role;

mod tokens;


#[derive(Debug)]
pub struct SlimUser {
    email: String,
    hash: String,
    role: Role,
}

pub struct PostgresUserRepo {
    pg_pool: Arc<PgPool>,
}

impl PostgresUserRepo {
    pub fn new(pg_pool: Arc<PgPool>) -> Self {
        Self { pg_pool }
    }

    pub async fn get_slim_user(&self, email: &str) -> Result<SlimUser> {
        let rec = sqlx::query!(
            r#"
            SELECT hash, role FROM users WHERE email = $1
            "#,
            email
        )
        .fetch_one(&*self.pg_pool)
        .await?;

        Ok(SlimUser {
            email: email.to_string(),
            hash: rec.hash,
        })
    }
}
