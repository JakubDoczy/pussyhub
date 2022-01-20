use tokio::sync::Mutex;

use shared_lib::token_validation::TokenValidator;

/// Holds application state.
pub(crate) struct ApplicationData {
    pub token_validator: Mutex<TokenValidator>,
}

impl ApplicationData {
    /// Creates a new application state.
    pub fn new(token_validator: TokenValidator) -> Self {
        Self {
            token_validator: Mutex::new(token_validator),
        }
    }
}
