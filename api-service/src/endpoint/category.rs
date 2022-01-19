use crate::auth::check_role;
use crate::error::auth::resolve as resolve_auth;
use crate::error::auth::AuthError;
use crate::error::category::resolve;
use crate::model::category::{from_categories, Category};
use crate::repository::category_repository::CategoryRepository;
use crate::PostgresCategoryRepository;
use actix_web::{web, HttpRequest, HttpResponse, Responder};
use shared_lib::payload::category::{
    GetCategoryResponse, PostCategoryRequest, PostCategoryResponse, PutCategoryRequest,
    PutCategoryResponse,
};
use shared_lib::token_validation::{Role, TokenValidator};
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
        Err(e) => resolve(e),
    }
}

#[actix_web::put("/categories/{id}")]
pub async fn put_category(
    data: web::Data<Arc<PostgresCategoryRepository>>,
    token_validator: web::Data<Arc<TokenValidator>>,
    params: web::Path<i64>,
    category: web::Json<PutCategoryRequest>,
    req: HttpRequest,
) -> impl Responder {
    let id = params.into_inner();

    let check = check_role(&req, token_validator, Role::Admin);
    if let Err(error) = check {
        return error;
    }

    let response = data
        .update_category(id, Category::from(category.into_inner()))
        .await;

    match response {
        Ok(category) => HttpResponse::Ok().json(PutCategoryResponse::from(category)),
        Err(e) => resolve(e),
    }
}

#[actix_web::post("/categories")]
pub async fn post_category(
    data: web::Data<Arc<PostgresCategoryRepository>>,
    token_validator: web::Data<Arc<TokenValidator>>,
    category: web::Json<PostCategoryRequest>,
    req: HttpRequest,
) -> impl Responder {
    let check = check_role(&req, token_validator, Role::Admin);
    if let Err(error) = check {
        return error;
    }

    let response = data
        .create_category(Category::from(category.into_inner()))
        .await;

    match response {
        Ok(category) => HttpResponse::Ok().json(PostCategoryResponse::from(category)),
        Err(e) => resolve(e),
    }
}

#[actix_web::delete("/categories/{id}")]
pub async fn delete_category(
    data: web::Data<Arc<PostgresCategoryRepository>>,
    token_validator: web::Data<Arc<TokenValidator>>,
    params: web::Path<i64>,
    req: HttpRequest,
) -> impl Responder {
    let id = params.into_inner();

    let check = check_role(&req, token_validator, Role::Admin);
    if let Err(error) = check {
        return error;
    }

    let response = data.delete_category(id).await;

    match response {
        Ok(_) => HttpResponse::Ok().json(""),
        Err(e) => resolve(e),
    }
}

#[actix_web::get("/categories")]
pub async fn list_catgeories(data: web::Data<Arc<PostgresCategoryRepository>>) -> impl Responder {
    let response = data.list_categories().await;

    match response {
        Ok(categories) => HttpResponse::Ok().json(from_categories(categories)),
        Err(e) => resolve(e),
    }
}
