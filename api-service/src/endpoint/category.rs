use crate::repository::category_repository::CategoryRepository;
use crate::PostgresCategoryRepository;
use crate::model::category::{Category, from_categories};
use actix_web::{web, HttpResponse, Responder};
use shared_lib::payload::category::{GetCategoriesResponse, GetCategoryResponse, PostCategoryRequest, PostCategoryResponse, PutCategoryRequest, PutCategoryResponse};
use std::sync::Arc;

#[actix_web::get("/categories/{id}")]
pub async fn get_category_by_id(
    data: web::Data<Arc<PostgresCategoryRepository>>,
    params: web::Path<i64>,
) -> impl Responder {
    let id = params.into_inner();

    let response = data.get_category(id).await;

    match response {
        Ok(category) => HttpResponse::Ok().json(GetCategoryResponse::from(category)),
        Err(e) => HttpResponse::InternalServerError().json(""),
    }
}

#[actix_web::put("/categories/{id}")]
pub async fn put_category(
    data: web::Data<Arc<PostgresCategoryRepository>>,
    params: web::Path<i64>,
    category: web::Json<PutCategoryRequest>,
) -> impl Responder {
    let id = params.into_inner();

    let response = data.update_category(id, Category::from(category.into_inner())).await;

    match response {
        Ok(category) => HttpResponse::Ok().json(PutCategoryResponse::from(category)),
        Err(e) => HttpResponse::InternalServerError().json(""),
    }
}

#[actix_web::post("/categories")]
pub async fn post_category(
    data: web::Data<Arc<PostgresCategoryRepository>>,
    category: web::Json<PostCategoryRequest>,
) -> impl Responder {
    let response = data.create_category(Category::from(category.into_inner())).await;

    match response {
        Ok(category) => HttpResponse::Ok().json(PostCategoryResponse::from(category)),
        Err(e) => HttpResponse::InternalServerError().json(""),
    }
}

#[actix_web::delete("/categories/{id}")]
pub async fn delete_category(
    data: web::Data<Arc<PostgresCategoryRepository>>,
    params: web::Path<i64>,
) -> impl Responder {
    let id = params.into_inner();

    let response = data.delete_category(id).await;

    match response {
        Ok(_) => HttpResponse::Ok().json(""),
        Err(e) => HttpResponse::InternalServerError().json(""),
    }
}

#[actix_web::get("/categories")]
pub async fn list_catgeories(data: web::Data<Arc<PostgresCategoryRepository>>) -> impl Responder {
    let response = data.list_categories().await;

    match response {
        // TODO: implement for vect
        Ok(categories) => HttpResponse::Ok().json(from_categories(categories)),
        Err(e) => HttpResponse::InternalServerError().json(""),
    }
}
