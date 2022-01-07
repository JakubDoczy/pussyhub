use std::sync::Arc;

use actix_web::{web, Responder, HttpResponse};

use crate::repository::user_repository::{PostgresUserRepository, UserRepository};


#[actix_web::get("/users/{id}")]
pub async fn get_user_by_id(
    params: web::Path<i64>,
    user_repository: web::Data<Arc<PostgresUserRepository>>
) -> impl Responder {
    let id = params.into_inner();
    let result= user_repository.get_user(id).await;

    match result {
        Ok(user) => HttpResponse::Ok().json(user),
        _ => HttpResponse::InternalServerError().json("")
    }
}