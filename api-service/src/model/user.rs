use ::serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct User {
    pub id: i64,
    pub email: String,
    pub user_role: Role,
    pub username: String,
    pub description: Option<String>,
    pub picture_url: Option<String>,
}

#[derive(Clone, PartialEq, Serialize, Deserialize, Debug, sqlx::Type)]
#[sqlx(type_name = "role", rename_all = "snake_case")]
pub enum Role {
    Admin,
    User,
}
