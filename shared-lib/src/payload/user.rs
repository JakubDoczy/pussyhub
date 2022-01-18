use serde::{Serialize, Deserialize};


#[derive(Debug, Serialize, Deserialize)]
pub struct UserResponse {
    pub id: i64,
    pub email: String,
    pub user_role: String,
    pub username: String,
    pub description: Option<String>,
    pub picture_url: Option<String>,
    pub created_at: String,
    pub verified: bool
}

pub type GetUserResponse = UserResponse;