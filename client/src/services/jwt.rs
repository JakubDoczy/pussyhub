use gloo::storage::{LocalStorage, Storage};
use lazy_static::lazy_static;
use parking_lot::RwLock;
use shared_lib::token_validation::{SlimUser, TokenValidator};

const TOKEN_KEY: &str = "pussyhub.jwt.token";
const PUBLIC_KEY_PEM: &str = include_str!("../../resources/public.pem");

pub fn validate(token: &str) -> Result<SlimUser, anyhow::Error> {
    let validator = TokenValidator::from_rsa_pem(PUBLIC_KEY_PEM).unwrap();
    validator.validate(token)
}

// Copyright 2021 Jet Li | Apache licence | https://github.com/jetli/rust-yew-realworld-example-app

lazy_static! {
    /// Jwt token read from local storage.
    pub static ref TOKEN: RwLock<Option<String>> = {
        if let Ok(token) = LocalStorage::get(TOKEN_KEY) {
            RwLock::new(Some(token))
        } else {
            RwLock::new(None)
        }
    };
}

/// Set jwt token to local storage.
pub fn set_token(token: Option<String>) {
    if let Some(t) = token.clone() {
        LocalStorage::set(TOKEN_KEY, t).expect("failed to set");
    } else {
        LocalStorage::delete(TOKEN_KEY);
    }
    let mut token_lock = TOKEN.write();
    *token_lock = token;
}

/// Get jwt token from lazy static.
pub fn get_token() -> Option<String> {
    let token_lock = TOKEN.read();
    token_lock.clone()
}