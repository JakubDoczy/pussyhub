use ::serde::{Deserialize, Serialize};
use chrono::serde::ts_milliseconds;
use chrono::{DateTime, Utc};
use shared_lib::payload::user::UserResponse;

#[derive(Clone, Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct User {
    pub id: i64,
    pub email: String,
    pub verified: bool,
    pub user_role: Role,
    pub username: String,
    pub description: Option<String>,
    pub picture_url: Option<String>,
    #[serde(with = "ts_milliseconds")]
    pub created_at: DateTime<Utc>,
}

#[derive(Clone, PartialEq, Serialize, Deserialize, Debug, sqlx::Type)]
#[sqlx(type_name = "role", rename_all = "snake_case")]
pub enum Role {
    Admin,
    User,
}

impl From<User> for UserResponse {
    fn from(user: User) -> Self {
        UserResponse {
            id: user.id,
            email: user.email,
            user_role: format!("{:?}", user.user_role).to_lowercase(),
            username: user.username,
            description: user.description,
            picture_url: user.picture_url,
            created_at: user.created_at.to_rfc3339(),
            verified: user.verified,
        }
    }
}
