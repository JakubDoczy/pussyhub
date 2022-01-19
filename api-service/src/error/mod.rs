pub mod auth;
pub mod category;
pub mod user;
pub mod video;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct Error {
    code: u16,
    message: String,
}
