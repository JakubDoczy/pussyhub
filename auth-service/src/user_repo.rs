use anyhow::Result;
use sqlx::{Executor, PgPool};
use std::sync::Arc;
use shared_lib::token_validation::{SlimUser, Role};


pub struct PostgresUserRepo {
    pg_pool: Arc<PgPool>,
}

impl PostgresUserRepo {
    pub fn new(pg_pool: Arc<PgPool>) -> Self {
        Self { pg_pool }
    }

    pub async fn get_slim_user(&self, email: &str) -> Result<(SlimUser, String)> {
        let rec = sqlx::query!(
            r#"
            SELECT id, username, role, hash FROM users WHERE email = $1
            "#,
            email
        )
        .fetch_one(&*self.pg_pool)
        .await?;

        Ok((SlimUser {
            user_id: rec.id,
            username: rec.username,
            email: email.to_string(),
            role: rec.role,
            
        }, rec.passwd_hash))
    }
}
