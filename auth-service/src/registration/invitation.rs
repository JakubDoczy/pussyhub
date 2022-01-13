use serde::{Deserialize, Serialize};

use anyhow::Error;

use shared_lib::token_validation::{TokenValidator};

use crate::token_issuer::TokenIssuer;

#[derive(Deserialize, Serialize, Debug)]
struct InvitationClaims {
    pub uid: i64,
}

pub trait InvitationIssuer {
    fn sign_invitation(&self, user_id: i64) -> Result<String, Error>;
}

impl InvitationIssuer for TokenIssuer {
    fn sign_invitation(&self, user_id: i64) -> Result<String, Error> {
        let body = InvitationClaims {
            uid: user_id,
        };
        self.encode(body)
    }
}

pub trait InvitationValidator {
    fn validate_invitation(
        &self,
        invitation_token: &str,
    ) -> Result<i64, Error>;
}

impl InvitationValidator for TokenValidator {
    fn validate_invitation(
        &self,
        invitation_token: &str,
    ) -> Result<i64, Error> {
        let result = self.decode::<InvitationClaims>(invitation_token)?;
        Ok(result.custom.uid)
    }
}
