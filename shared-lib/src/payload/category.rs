use serde::{Deserialize, Serialize};
use validator::Validate;

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq, Validate)]
pub struct CategoryResponse {
    pub id: i64,
    #[validate(length(min = 1, max = 255, message = "Category name must not be empty"))]
    pub name: String
}

#[derive(Debug, Serialize, Deserialize, Validate)]
pub struct CategoryRequest {
    #[validate(length(min = 1, max = 255, message = "Category name must not be empty"))]
    pub name: String
}

pub type GetCategoryResponse = CategoryResponse;

pub type PutCategoryRequest = CategoryRequest;
pub type PutCategoryResponse = CategoryResponse;

pub type PostCategoryRequest = CategoryRequest;
pub type PostCategoryResponse = CategoryResponse;

pub type GetCategoriesResponse = Vec<CategoryResponse>;