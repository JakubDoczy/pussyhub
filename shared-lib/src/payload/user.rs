use serde::{Serialize, Deserialize};


#[derive(Debug, Serialize, Deserialize)]
pub struct User {
    pub id: i64,
    pub email: String,
    pub username: String,
    pub password: String,
    pub description: Option<String>,
    pub picture_url: Option<String>,
}

pub type GetUserResponse = User;