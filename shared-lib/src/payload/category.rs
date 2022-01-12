use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Category {
    pub id: Option<i64>,
    pub name: String
}

pub type GetCategoryResponse = Category;

pub type PutCategoryRequest = Category;
pub type PutCategoryResponse = Category;

pub type PostCategoryRequest = Category;
pub type PostCategoryResponse = Category;

pub type GetCategories = Vec<Category>;