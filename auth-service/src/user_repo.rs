use shared_lib::token_validation::{Role, SlimUser};
use sqlx::PgPool;
use std::sync::Arc;
use chrono::Utc;

use shared_lib::auth::UserRegistrationPayload;
use shared_lib::errors::{AuthError, RegistrationError};

#[derive(Clone)]
pub struct PostgresUserRepo {
    pg_pool: Arc<PgPool>,
}

impl PostgresUserRepo {
    pub fn new(pg_pool: Arc<PgPool>) -> Self {
        Self { pg_pool }
    }

    pub async fn get_slim_user(&self, email: &str) -> Result<(SlimUser, String), AuthError> {
        let rec = sqlx::query!(
            r#"
            SELECT id, verified, username, password, user_role as "user_role: Role" FROM registered_user WHERE email = $1
            "#,
            email
        )
        .fetch_one(&*self.pg_pool)
        .await;

        match rec {
            Ok(user) => Ok((
                SlimUser {
                    user_id: user.id,
                    verified: user.verified,
                    username: user.username,
                    email: email.to_string(),
                    role: user.user_role,
                },
                user.password,
            )),
            Err(e) => match e {
                sqlx::Error::RowNotFound => Err(AuthError::UserDoesNotExist(email.to_string())),
                _ => Err(AuthError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }

    pub async fn register_user(
        &self,
        payload: &UserRegistrationPayload,
    ) -> Result<SlimUser, RegistrationError> {
        // RegistrationError
        println!("Sending query");

        let rec = sqlx::query!(
            r#"
            INSERT INTO registered_user (email, verified, username, password, user_role, description, picture_url, created_at) 
            VALUES ($1, FALSE, $2, $3, 'user', $4, $5, $6)
            RETURNING id
            "#,
            payload.email,
            payload.username,
            payload.password,
            payload.description,
            payload.picture_url,
            Utc::now()
        )
        .fetch_one(&*self.pg_pool)
        .await;

        match rec {
            Ok(record) => Ok(SlimUser {
                user_id: record.id,
                verified: false,
                username: payload.username.clone(),
                email: payload.email.clone(),
                role: Role::User,
            }),
            Err(e) => match e {
                sqlx::Error::Database(dyn_database_err) => match (*dyn_database_err).constraint() {
                    Some("registered_user_email_key") => {
                        Err(RegistrationError::EmailAlreadyExists(payload.email.clone()))
                    }
                    Some("registered_user_username_key") => Err(
                        RegistrationError::UsernameAlreadyExists(payload.username.clone()),
                    ),
                    _ => Err(RegistrationError::new_unexpected(&dyn_database_err)),
                },

                _ => Err(RegistrationError::new_unexpected(&e)),
            },
        }
    }
}
