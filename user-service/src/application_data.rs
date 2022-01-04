use std::sync::Mutex;

use crate::user_repo::PostgresUserRepo;
use shared_lib::token_validation::TokenValidator;

/// Holds application state.
pub(crate) struct ApplicationData {
    pub token_validator: Mutex<TokenValidator>,
    pub user_repo: Mutex<PostgresUserRepo>,
}

impl ApplicationData {
    /// Creates a new application state.
    pub fn new(
        token_validator: TokenValidator,
        user_repo: PostgresUserRepo
    ) -> Self {
        Self {
            token_validator: Mutex::new(token_validator),
            user_repo: Mutex::new(user_repo)
        }
    }
}