use anyhow::Result;
use shared_lib::token_validation::{Role, SlimUser};
use sqlx::{Executor, PgPool};
use std::sync::Arc;

use shared_lib::auth::UserRegistrationPayload;

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
            SELECT id, verified, username, password, user_role as "user_role: Role" FROM registered_user WHERE email = $1
            "#,
            email
        )
        .fetch_one(&*self.pg_pool)
        .await;

        match rec {
            Ok(user) => Ok(Some((
                SlimUser {
                    user_id: user.id,
                    verified: user.verified,
                    username: user.username,
                    email: email.to_string(),
                    role: user.user_role,
                },
                user.password,
            ))),
            Err(e) => match e {
                sqlx::Error::RowNotFound => Ok(None),
                _ => Err(anyhow::anyhow!(format!("{:?}", e))),
            },
        }
    }

    pub async fn register_user(
        &self,
        payload: &UserRegistrationPayload,
    ) -> Result<Option<SlimUser>> {

        let rec = sqlx::query!(
            r#"
            INSERT INTO registered_user (email, verified, username, password, user_role, description, picture_url) 
            VALUES ($1, FALSE, $2, $3, 'user', $4, $5)
            RETURNING id
            "#,
            payload.email,
            payload.username,
            payload.password,
            payload.description,
            payload.picture_url
        )
        .fetch_one(&*self.pg_pool)
        .await;

        match rec {
            Ok(record) => Ok(Some(SlimUser {
                user_id: record.id,
                verified: false,
                username: payload.username.clone(),
                email: payload.email.clone(),
                role: Role::User,
            })),
            Err(e) => {
                match e {
                    // TODO: handle constraint violation
                    _ => Err(anyhow::anyhow!(format!("{:?}", e))),
                }
            }
        }
    }
}
