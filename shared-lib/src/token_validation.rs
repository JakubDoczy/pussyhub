use jsonwebtoken::{decode, Algorithm, DecodingKey, Validation, TokenData};
use serde::{Deserialize, Serialize};
use anyhow::Error;
use serde::de::DeserializeOwned;

// Quickstart:
// let validator = TokenValidator("/resources/public.pem")
// ...
// let slim_user = validator.validate(token)?;


pub const ALGORITHM: Algorithm = Algorithm::RS256;


#[derive(Clone, PartialEq, Serialize, Deserialize, Debug, sqlx::Type)]
#[sqlx(type_name = "role", rename_all = "snake_case")]
pub enum Role {
    Admin,
    User,
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

    pub fn decode<T: DeserializeOwned>(&self, token: &str) -> jsonwebtoken::errors::Result<TokenData<T>> {
        let validator = Validation {
            ..Validation::new(ALGORITHM)
        };
    
        decode::<T>(token, &self.public_key, &validator)
    }

    pub fn validate(&self, token: &str) -> Result<SlimUser, Error> {
        let result = self.decode::<Claims>(token)?;
        Ok(result.claims.user)
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
