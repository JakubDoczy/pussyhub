use serde::{Deserialize, Serialize};
use shared_lib::payload::category::{GetCategories, GetCategoriesResponse, GetCategoryResponse, PostCategoryRequest, PostCategoryResponse, PutCategoryRequest, PutCategoryResponse};

#[derive(Debug, Serialize, Deserialize)]
pub struct Category {
    pub id: Option<i64>,
    pub name: String
}

impl From<PostCategoryRequest> for Category {
    fn from(request: PostCategoryRequest) -> Self {
        Category {
            id: None,
            name: request.name
        }
    }
}

impl From<PutCategoryRequest> for Category {
    fn from(request: PutCategoryRequest) -> Self {
        Category {
            id: None,
            name: request.name
        }
    }
}

impl From<Category> for PostCategoryResponse {
    fn from(category: Category) -> Self {
        PostCategoryResponse {
            id: category.id.expect("Id has to be defined!"),
            name: category.name
        }
    }
}

impl From<Category> for PutCategoryResponse {
    fn from(category: Category) -> Self {
        PutCategoryResponse {
            id: category.id.expect("Id has to be defined!"),
            name: category.name
        }
    }
}

impl From<Category> for GetCategoryResponse {
    fn from(category: Category) -> Self {
        GetCategoryResponse {
            id: category.id.expect("Id has to be defined!"),
            name: category.name
        }
    }
}