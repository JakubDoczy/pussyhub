use jwt_simple::prelude::*;
use serde::{Deserialize, Serialize};
use anyhow::Error;
use serde::de::DeserializeOwned;

// Quickstart:
// let validator = TokenValidator("/resources/public.pem")
// ...
// let slim_user = validator.validate(token)?;


#[derive(Clone, PartialEq, Serialize, Deserialize, Debug)]
pub enum Role {
    Admin,
    User,
    Unauthorized
}

#[derive(Deserialize, Serialize, Debug)]
pub struct SlimUser {
    pub user_id: i64,
    pub email: String,
    pub verified: bool,
    pub username: String,
    pub role: Role,
    //hash: String,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct CustomClaims {
    pub user: SlimUser,
}


pub struct TokenValidator {
    public_key: RS256PublicKey,
}

impl TokenValidator {
    pub fn from_rsa_pem(rsa_pem_file: &'static str) -> Result<TokenValidator, Error> {
        Ok(Self { public_key: RS256PublicKey::from_pem(rsa_pem_file)? })
    }

    pub fn decode<T: DeserializeOwned + Serialize>(&self, token: &str) -> Result<JWTClaims<T>, Error> {
        self.public_key.verify_token::<T>(&token, None)
    }

    pub fn validate(&self, token: &str) -> Result<SlimUser, Error> {
        let claims = self.decode::<CustomClaims>(token)?;
        Ok(claims.custom.user)
    }
}


// #[cfg(test)]
// mod tests {
//     #[test]
//     fn it_works() {
//         let result = 2 + 2;
//         assert_eq!(result, 4);
//     }
// }
