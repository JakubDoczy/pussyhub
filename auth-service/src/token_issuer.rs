use anyhow::Error;
use chrono::Utc;
use jsonwebtoken::{encode, EncodingKey, Header};
use serde::Serialize;

use shared_lib::token_validation::{Claims, SlimUser, ALGORITHM};

pub const DEFAULT_VALIDITY_DURATION_SEC: i64 = 24 * 60 * 60;


#[derive(Clone)]
pub struct TokenIssuer {
    private_key: EncodingKey,
}

impl TokenIssuer {
    pub async fn from_rsa_pem(rsa_pem_file: &str) -> Result<Self, Error> {
        let data = tokio::fs::read(rsa_pem_file).await?;
        let issuer = TokenIssuer {
            private_key: EncodingKey::from_rsa_pem(&data)?,
        };
        Ok(issuer)
    }

    pub fn encode<T: Serialize>(&self, header: &Header, claims: &T) -> Result<String, jsonwebtoken::errors::Error> {
        encode(header, &claims, &self.private_key)
    }

    pub fn issue_token(&self, user: SlimUser) -> Result<String, jsonwebtoken::errors::Error> {
        let body = Claims {
            iat: Utc::now().timestamp() as usize,
            exp: (Utc::now().timestamp() + DEFAULT_VALIDITY_DURATION_SEC) as usize,
            user,
        };
        
        self.encode(&Header::new(ALGORITHM), &body)
    }
    
}
