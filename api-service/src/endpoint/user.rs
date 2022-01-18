use crate::PostgresUserRepository;
use actix_web::{web, HttpResponse, Responder};

use crate::repository::user_repository::UserRepository;
use shared_lib::payload::user::GetUserResponse;
use std::sync::Arc;

#[actix_web::get("/users/{id}")]
pub async fn get_user_by_id(
    data: web::Data<Arc<PostgresUserRepository>>,
    params: web::Path<i64>,
) -> impl Responder {
    let id = params.into_inner();

    let response = data.get_user(id).await;

    match response {
        Ok(user) => HttpResponse::Ok().json(GetUserResponse::from(user)),
        Err(e) => HttpResponse::InternalServerError().json(e),
    }
}
