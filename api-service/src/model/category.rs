use serde::{Deserialize, Serialize};
use shared_lib::payload::category::{CategoryRequest, CategoryResponse, GetCategoriesResponse, GetCategoryResponse, PostCategoryRequest, PostCategoryResponse, PutCategoryRequest, PutCategoryResponse};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Category {
    pub id: Option<i64>,
    pub name: String
}

impl From<CategoryRequest> for Category {
    fn from(request: PostCategoryRequest) -> Self {
        Category {
            id: None,
            name: request.name
        }
    }
}

impl From<Category> for CategoryResponse {
    fn from(category: Category) -> Self {
        PostCategoryResponse {
            id: category.id.expect("Id has to be defined!"),
            name: category.name
        }
    }
}

pub fn from_categories(categories: Vec<Category>) -> GetCategoriesResponse {
    let mut response = GetCategoriesResponse::new();
    for category in categories {
        response.push(CategoryResponse::from(category));
    }
    response
}