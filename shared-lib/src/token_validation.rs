use jwt_simple::prelude::*;
use serde::{Deserialize, Serialize};
use anyhow::Error;

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
pub struct Claims {
    // Registered claims, defined by standard
    // checked by default (no need to manually validate)
    //pub sub: String, // subject
    pub iat: usize, // issued at
    pub exp: usize, // expiration date

    // private claims
    pub user: SlimUser,
}


pub struct TokenValidator {
    public_key: RS256PublicKey,
}

impl TokenValidator {
    pub fn from_rsa_pem(rsa_pem_file: &'static str) -> Result<TokenValidator, Error> {
        Ok(Self { public_key: RS256PublicKey::from_pem(rsa_pem_file)? })
    }

    pub fn validate(&self, token: &str) -> Result<SlimUser, Error> {
        let claims = self.public_key.verify_token::<Claims>(&token, None)?;
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
