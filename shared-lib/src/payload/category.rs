use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Category {
    pub id: i64,
    pub name: String
}

pub struct CategoryWithoutId {
    pub id: i64,
    pub name: String
}

pub type GetCategoryResponse = Category;

pub type PutCategoryRequest = CategoryWithoutId;
pub type PutCategoryResponse = Category;

pub type PostCategoryRequest = CategoryWithoutId;
pub type PostCategoryResponse = Category;

pub type GetCategories = Vec<Category>;