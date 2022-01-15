use serde::{Serialize, Deserialize};
use validator::{Validate, ValidationError};


#[derive(Debug, Validate, Serialize, Deserialize)]
pub struct UserRegistrationPayload {
    
    #[validate(email)]
    pub email: String,
    
    #[validate(length(min = 4, max = 25))]
    pub username: String,

    #[validate(length(min = 6, max = 255))]
    pub password: String,
}

impl UserRegistrationPayload {

    pub fn validate_content(&self) -> Result<(), ValidationError> {
        self.validate()
    }

}