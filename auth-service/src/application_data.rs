use lettre::SmtpTransport;
use std::sync::Mutex;

use crate::database::user_repo::PostgresUserRepo;
use crate::token_issuer::TokenIssuer;
use shared_lib::token_validation::TokenValidator;

/// Holds application state.
pub(crate) struct ApplicationData {
    pub token_issuer: Mutex<TokenIssuer>,
    pub token_validator: Mutex<TokenValidator>,
    pub user_repo: Mutex<PostgresUserRepo>,
    pub smtp_transport: Mutex<SmtpTransport>,
}

impl ApplicationData {
    /// Creates a new application state.
    pub fn new(
        token_issuer: TokenIssuer,
        token_validator: TokenValidator,
        user_repo: PostgresUserRepo,
        smtp_transport: SmtpTransport,
    ) -> Self {
        Self {
            token_issuer: Mutex::new(token_issuer),
            token_validator: Mutex::new(token_validator),
            user_repo: Mutex::new(user_repo),
            smtp_transport: Mutex::new(smtp_transport),
        }
    }
}
