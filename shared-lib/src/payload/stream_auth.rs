use serde::{Serialize, Deserialize};
use validator::{Validate, ValidationErrors};

#[derive(Validate, Debug, Serialize, Deserialize)]
pub struct StreamAuthPayload {
    #[validate(email(message = "not a valid email"))]
    pub email: String,
    pub streaming_key: String,
}

impl StreamAuthPayload {

    pub fn validate_content(&self) -> Result<(), ValidationErrors> {
        self.validate()
    }

}