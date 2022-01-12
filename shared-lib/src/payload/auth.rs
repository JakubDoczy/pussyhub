use serde::{Serialize, Deserialize};


#[derive(Debug, Serialize, Deserialize)]
pub struct AuthPayload {
    //#[validate(length(min = 3, max = 128))]
    pub email: String,
    //#[validate]//#[validate(length(min = 3, max = 20))]
    pub password: String, // just hash ofc
}