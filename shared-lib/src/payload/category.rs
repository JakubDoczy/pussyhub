use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Category {
    pub id: i64,
    pub name: String
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CategoryRequest {
    pub name: String
}

pub type GetCategoryResponse = Category;

pub type PutCategoryRequest = CategoryRequest;
pub type PutCategoryResponse = Category;

pub type PostCategoryRequest = CategoryRequest;
pub type PostCategoryResponse = Category;

pub type GetCategoriesResponse = Vec<Category>;