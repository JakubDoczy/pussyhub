use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct CategoryResponse {
    pub id: i64,
    pub name: String
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CategoryRequest {
    pub name: String
}

pub type GetCategoryResponse = CategoryResponse;

pub type PutCategoryRequest = CategoryRequest;
pub type PutCategoryResponse = CategoryResponse;

pub type PostCategoryRequest = CategoryRequest;
pub type PostCategoryResponse = CategoryResponse;

pub type GetCategoriesResponse = Vec<CategoryResponse>;