use actix_web::{dev::Service, web::Buf, HttpMessage};
use anyhow::Error;
use chrono::{Duration, Utc};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation, Algorithm};
use serde::{Deserialize, Serialize, Serializer};

const DEFAULT_VALIDITY_DURATION_SEC: i64 = 24*60*60;
const ALGORITHM: Algorithm = Algorithm::RS256;


#[derive(Clone, PartialEq, Serialize, Deserialize, Debug)]
pub enum Role {
    Admin = 1,
    User = 2
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Claims {
    // Registered claims, defined by standard
    pub sub: String, // subject
    pub iat: usize,  // issued at
    pub exp: usize,  // expiration date

    pub role: Role,
}

fn issue_token(
    user_email: &str,
    role: Role,
    private_key: &EncodingKey,
    duration: &Duration,
) -> Result<String, jsonwebtoken::errors::Error> {
    let body = Claims {
        sub: user_email.to_string(), // FIXME: this conversion is probably not necessary
        iat: Utc::now().timestamp() as usize,
        exp: (Utc::now().timestamp() + DEFAULT_VALIDITY_DURATION_SEC) as usize,
        role,
    };

    encode(
        &Header::new(ALGORITHM),
        &body,
        private_key, //&EncodingKey::from_rsa_pem(private_key)?,
    )
}

fn validate_token(token: &str, user_email: &str, public_key: &DecodingKey) -> Result<Role, Error> {
    let validator = Validation {
        sub: Some(user_email.to_owned()),
        ..Validation::new(ALGORITHM)
    };

    let token_data = decode::<Claims>(token, &public_key, &validator)?;

    Ok(token_data.claims.role)
}

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

    pub fn issue_token(
        self,
        email: &str,
        role: Role,
    ) -> Result<String, jsonwebtoken::errors::Error> {
        issue_token(email, role, &self.private_key, &self.duration)
    }
}

pub struct TokenValidator {
    // this is retarded but we do not plan on having more than one key
    // IDK what were the authors of DecodingKey thinking when they decided to use lifetime...
    public_key: DecodingKey<'static>,
}

impl TokenValidator {
    pub async fn from_rsa_pem(rsa_pem_file: &str) -> Result<TokenValidator, Error> {
        let data = tokio::fs::read(rsa_pem_file).await?;
        let validator = TokenValidator {
            public_key: DecodingKey::from_rsa_pem(&data)?.into_static(),
        };
        Ok(validator)
    }

    pub fn validate(self, token: &str, email: &str) -> Result<Role, Error> {
        validate_token(token, email, &self.public_key)
    }
}
