use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Rating {
    pub id: i64,
    pub rating: i8
}