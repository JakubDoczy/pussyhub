use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct UserRegistrationPayload {
    pub email: String,
    pub username: String,
    pub password: String,
    pub description: Option<String>,
    pub picture_url: Option<String>,
}