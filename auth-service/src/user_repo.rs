use anyhow::Result;
use sqlx::{Executor, PgPool};
use std::sync::Arc;
use shared_lib::token_validation::{SlimUser, Role};


#[derive(Clone)]
pub struct PostgresUserRepo {
    pg_pool: Arc<PgPool>,
}

impl PostgresUserRepo {
    pub fn new(pg_pool: Arc<PgPool>) -> Self {
        Self { pg_pool }
    }

    pub async fn get_slim_user(&self, email: &str) -> Result<Option<(SlimUser, String)>> {
        let rec = sqlx::query!(
            r#"
            SELECT id, username, password, user_role as "user_role: Role" FROM users WHERE email = $1
            "#,
            email
        )
        .fetch_one(&*self.pg_pool)
        .await;

        match rec {
            Ok(user) => {
                Ok(Some((SlimUser {
                    user_id: user.id,
                    username: user.username,
                    email: email.to_string(),
                    role: user.user_role,
                    
                }, user.password)))
            }
            Err(e) => {
                match e {

                    sqlx::Error::RowNotFound => {
                        Ok(None)
                    }
                    _ => Err(anyhow::anyhow!(format!("{:?}", e)))
                }
            }
        }
    }
}
