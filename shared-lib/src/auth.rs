use serde::{Serialize, Deserialize};


#[derive(Debug, Serialize, Deserialize)]
pub struct AuthPayload {
    //#[validate(length(min = 3, max = 128))]
    pub email: String,
    //#[validate]//#[validate(length(min = 3, max = 20))]
    pub password: String, // just hash ofc
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UserRegistrationPayload {
    pub email: String,
    pub username: String,
    pub password: String,
    pub description: Option<String>,
    pub picture_url: Option<String>,
}

