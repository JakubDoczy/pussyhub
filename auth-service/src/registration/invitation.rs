use chrono::Utc;
use jsonwebtoken::Header;
use serde::{Deserialize, Serialize};

use shared_lib::token_validation::{TokenValidator, ALGORITHM};

use crate::token_issuer::{TokenIssuer, DEFAULT_VALIDITY_DURATION_SEC};

#[derive(Deserialize, Serialize, Debug)]
struct InvitationClaims {
    pub exp: usize, // expiration date
    pub uid: i64,
}

pub trait InvitationIssuer {
    fn sign_invitation(&self, user_id: i64) -> Result<String, jsonwebtoken::errors::Error>;
}

impl InvitationIssuer for TokenIssuer {
    fn sign_invitation(&self, user_id: i64) -> Result<String, jsonwebtoken::errors::Error> {
        let body = InvitationClaims {
            exp: (Utc::now().timestamp() + DEFAULT_VALIDITY_DURATION_SEC) as usize,
            uid: user_id,
        };

        self.encode(&Header::new(ALGORITHM), &body)
    }
}

pub trait InvitationValidator {
    fn validate_invitation(
        &self,
        invitation_token: &str,
    ) -> Result<i64, jsonwebtoken::errors::Error>;
}

impl InvitationValidator for TokenValidator {
    fn validate_invitation(
        &self,
        invitation_token: &str,
    ) -> Result<i64, jsonwebtoken::errors::Error> {
        let result = self.decode::<InvitationClaims>(invitation_token)?;
        Ok(result.claims.uid)
    }
}
