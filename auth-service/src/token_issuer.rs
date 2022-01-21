use anyhow::Error;
use jwt_simple::prelude::{RS256KeyPair, Claims, Duration};
use jwt_simple::algorithms::RSAKeyPairLike;

use serde::Serialize;
use serde::de::DeserializeOwned;

use shared_lib::token_validation::{CustomClaims, SlimUser};

pub const DEFAULT_VALIDITY_DURATION_SEC: u64 = 24 * 60 * 60;

/// Structure that holds an encoding key that
/// may be used to sign data.
#[derive(Clone)]
pub struct TokenIssuer {
    private_key: RS256KeyPair,
}

impl TokenIssuer {
    /// Creates a new token issuer from a PEM file that contains a private key.
    pub fn from_rsa_pem(rsa_pem_file: &'static str) -> Result<Self, Error> {
        Ok(Self { private_key: RS256KeyPair::from_pem(rsa_pem_file)? })
    }
    
    /// Encodes any serializable data.
    pub fn encode<T: DeserializeOwned + Serialize>(
        &self,
        claims: T
    ) -> Result<String, Error> {
        let claims = Claims::with_custom_claims(claims, Duration::from_secs(DEFAULT_VALIDITY_DURATION_SEC));
        self.private_key.sign(claims)
    }

    /// Issues a new jwt token. This token contains information about a user.
    /// The user that holds the token is authenticated.
    pub fn issue_token(&self, user: SlimUser) -> Result<String, Error> {
        self.encode(CustomClaims{ user })
    }
}
