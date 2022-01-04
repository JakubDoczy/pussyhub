use sqlx::PgPool;
use std::sync::Arc;

#[derive(Clone)]
pub struct PostgresUserRepo {
    pg_pool: Arc<PgPool>,
}


impl PostgresUserRepo {
    /// Creates a new user repository.
    pub fn new(pg_pool: Arc<PgPool>) -> Self {
        Self { pg_pool }
    }

}

