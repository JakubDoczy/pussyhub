pub mod auth;
pub mod category;
pub mod stream;
pub mod user;
pub mod video;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Error {
    pub(crate) code: u16,
    pub(crate) message: String,
}
