use std::sync::Arc;

use anyhow::Result;
use async_trait::async_trait;
use shared_lib::payload::category::{Category, CategoryWithoutId};
use sqlx::PgPool;
use thiserror::Error;

#[async_trait]
pub trait CategoryRepository {
    async fn get_category(&self, id: i64) -> Result<Category, DBCategoryError>;
    async fn update_category(
        &self,
        id: i64,
        category: CategoryWithoutId,
    ) -> Result<Category, DBCategoryError>;
    async fn create_category(
        &self,
        category: CategoryWithoutId,
    ) -> Result<Category, DBCategoryError>;
    async fn delete_category(&self, id: i64) -> Result<(), DBCategoryError>;
    async fn list_categories(&self) -> Result<Vec<Category>, DBCategoryError>;
}

pub struct PostgresCategoryRepository {
    pg_pool: Arc<PgPool>,
}

impl PostgresCategoryRepository {
    pub fn new(pg_pool: Arc<PgPool>) -> Self {
        Self { pg_pool }
    }
}

#[async_trait]
impl CategoryRepository for PostgresCategoryRepository {
    async fn get_category(&self, id: i64) -> Result<Category, DBCategoryError> {
        let res = sqlx::query_as!(
            Category,
            r#"
            SELECT 
                id, 
                name
            FROM category 
            WHERE id = $1
            "#,
            id: i64
        )
        .fetch_one(&*self.pg_pool)
        .await;

        match res {
            Ok(category) => Ok(category),
            Err(e) => match e {
                sqlx::Error::RowNotFound => Err(DBCategoryError::CategoryDoesNotExists(id)),
                _ => Err(DBCategoryError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }

    async fn update_category(
        &self,
        id: i64,
        category: CategoryWithoutId,
    ) -> Result<Category, DBCategoryError> {
        let res = sqlx::query_as!(
            Category,
            r#"
            UPDATE category
            SET
                name = $1
            WHERE id = $2
            RETURNING
                id,
                name
            "#,
            category.name,
            id
        )
        .fetch_one(&*self.pg_pool)
        .await;

        match res {
            Ok(category) => Ok(category),
            Err(e) => match e {
                sqlx::Error::RowNotFound => Err(DBCategoryError::CategoryDoesNotExists(id)),
                _ => Err(DBCategoryError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }

    async fn create_category(
        &self,
        category: CategoryWithoutId,
    ) -> Result<Category, DBCategoryError> {
        let res = sqlx::query_as!(
            Category,
            r#"
            INSERT INTO category (
                name
            )
            VALUES ($1)
            RETURNING
                id,
                name
            "#,
            category.name
        )
        .fetch_one(&*self.pg_pool)
        .await;

        match res {
            Ok(category) => Ok(category),
            Err(e) => match e {
                _ => Err(DBCategoryError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }

    async fn delete_category(&self, id: i64) -> Result<(), DBCategoryError> {
        let res = sqlx::query!(
            r#"
            DELETE FROM category 
            WHERE id = $1
            "#,
            id
        )
        .execute(&*self.pg_pool)
        .await;

        match res {
            Ok(_) => Ok(()),
            Err(e) => match e {
                sqlx::Error::RowNotFound => Err(DBCategoryError::CategoryDoesNotExists(id)),
                _ => Err(DBCategoryError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }

    async fn list_categories(&self) -> Result<Vec<Category>, DBCategoryError> {
        // TODO: implement category search
        let res = sqlx::query_as!(
            Category,
            r#"
            SELECT 
                id,
                name
            FROM category 
            "#
        )
        .fetch_all(&*self.pg_pool)
        .await;

        match res {
            Ok(category) => Ok(category),
            Err(e) => match e {
                _ => Err(DBCategoryError::UnexpectedError(format!("{:?}", e))),
            },
        }
    }
}

#[derive(Error, Debug)]
pub enum DBCategoryError {
    #[error("The database does not contain category \"{0}\".")]
    CategoryDoesNotExists(i64),

    #[error("Unexpected error \"{0}\".")]
    UnexpectedError(String),
}
