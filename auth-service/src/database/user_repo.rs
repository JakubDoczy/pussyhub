use chrono::Utc;
use shared_lib::token_validation::{Role, SlimUser};
use serde::{Serialize, Deserialize};
use sqlx::PgPool;
use std::sync::Arc;
use rand::Rng;
use argon2;

use anyhow::{Error, bail};

use shared_lib::payload::registration::UserRegistrationPayload;

use crate::database::error::{DBAuthError, DBEmailVerificationError, DBRegistrationError};

fn rehash_password(password: &str) -> Result<String, Error> {
    let salt: [u8; 32] = rand::thread_rng().gen();
    let config = argon2::Config::default();

    let new_password = match argon2::hash_encoded(password.as_bytes(), &salt, &config) {
        Ok(passwd) => passwd,
        Err(e) => bail!("Failed to hash password with salt, {:?}", e)
    };
    Ok(new_password)
}

#[derive(Clone, PartialEq, Serialize, Deserialize, Debug, sqlx::Type)]
#[sqlx(type_name = "role", rename_all = "snake_case")]
enum SqlRole {
    Admin,
    User,
}

impl From<SqlRole> for Role {
    fn from(src: SqlRole) -> Self {
        match src {
            SqlRole::Admin => Role::Admin,
            SqlRole::User => Role::User,
        }
    }
}

/// User repository.
#[derive(Clone)]
pub struct PostgresUserRepo {
    pg_pool: Arc<PgPool>,
}

impl PostgresUserRepo {
    /// Creates a new user repository.
    pub fn new(pg_pool: Arc<PgPool>) -> Self {
        Self { pg_pool }
    }

    /// Obtains a user that has a given email address.
    pub async fn get_slim_user(&self, email: &str) -> Result<(SlimUser, String), DBAuthError> {
        let rec = sqlx::query!(
            r#"
            SELECT id, verified, username, password, user_role as "user_role: SqlRole" FROM registered_user WHERE email = $1
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
                    role: Role::from(user.user_role),
                },
                user.password
            )),
            Err(e) => match e {
                sqlx::Error::RowNotFound => Err(DBAuthError::UserDoesNotExist(email.to_string())),
                _ => Err(DBAuthError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }

    /// Registers a new user.
    pub async fn register_user(
        &self,
        payload: &UserRegistrationPayload,
    ) -> Result<SlimUser, DBRegistrationError> {
        // RegistrationError
        //println!("Sending query");

        let rehashed_password = match rehash_password(&payload.password) {
            Ok(s) => s,
            Err(e) => {
                return Err(DBRegistrationError::UnexpectedError(format!("Failed to rehash password: {:?}", e)));
            }
        };

        let rec = sqlx::query!(
            r#"
            INSERT INTO registered_user (email, verified, username, password, user_role, created_at)
            VALUES ($1, FALSE, $2, $3, 'user', $4)
            RETURNING id
            "#,
            payload.email,
            payload.username,
            rehashed_password,
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
                    Some("registered_user_email_key") => Err(
                        DBRegistrationError::EmailAlreadyExists(payload.email.clone()),
                    ),
                    Some("registered_user_username_key") => Err(
                        DBRegistrationError::UsernameAlreadyExists(payload.username.clone()),
                    ),
                    e => Err(DBRegistrationError::UnexpectedError(format!("Database error, violation of constraint: {:?}", e))),
                },

                e => Err(DBRegistrationError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }

    /// Sets a user's email to verified.
    pub async fn set_email_verified(&self, id: i64) -> Result<(), DBEmailVerificationError> {
        let rows_affected = sqlx::query!(
            r#"
            UPDATE registered_user
            SET verified = TRUE
            WHERE id = $1
            "#,
            id
        )
        .execute(&*self.pg_pool)
        .await;

        match rows_affected {
            Ok(_) => Ok(()),
            Err(e) => match e {
                _ => Err(DBEmailVerificationError::UnexpectedError(format!(
                    "{:?}",
                    e
                ))),
            },
        }
    }
}
