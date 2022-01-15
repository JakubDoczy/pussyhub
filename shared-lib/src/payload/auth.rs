use serde::{Serialize, Deserialize};
use validator::{Validate, ValidationErrors};

#[derive(Validate, Debug, Serialize, Deserialize)]
pub struct AuthPayload {
    #[validate(email(message = "not a valid email"))]
    pub email: String,
    #[validate(length(min = 3, max = 20, message = "must be at least 3 characters long"))]
    pub password: String, // just hash ofc
}

impl AuthPayload {

    pub fn validate_content(&self) -> Result<(), ValidationErrors> {
        self.validate()
    }

}