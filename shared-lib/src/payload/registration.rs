use serde::{Serialize, Deserialize};
use validator::{Validate, ValidationErrors};


#[derive(Debug, Validate, Serialize, Deserialize)]
pub struct UserRegistrationPayload {
    
    #[validate(email(message = "not a valid email"))]
    pub email: String,
    
    #[validate(length(min = 4, max = 25, message = "4 to 25 characters"))]
    pub username: String,

    #[validate(length(min = 6, max = 255, message = "must be at least 6 characters long"))]
    pub password: String,
}

impl UserRegistrationPayload {

    pub fn validate_content(&self) -> Result<(), ValidationErrors> {
        self.validate()
    }

}