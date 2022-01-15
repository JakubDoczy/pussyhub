use crate::model::user::{Role, User};
use crate::repository::video_repository::VideoRepository;
use crate::PostgresVideoRepository;
use actix_web::{web, HttpResponse, Responder};
use std::sync::Arc;

#[actix_web::post("/videos/{id}/like")]
pub async fn like_video(
    data: web::Data<Arc<PostgresVideoRepository>>,
    params: web::Path<i64>,
) -> impl Responder {
    let id = params.into_inner();
    let response = data
        .like(
            id,
            User {
                id: 1,
                email: "".to_string(),
                user_role: Role::Admin,
                username: "".to_string(),
                description: None,
                picture_url: None,
            },
        )
        .await;

    match response {
        Ok(_) => HttpResponse::Ok().json(()),
        Err(e) => HttpResponse::InternalServerError().json(e),
    }
}

#[actix_web::post("/videos/{id}/dislike")]
pub async fn dislike_video(
    data: web::Data<Arc<PostgresVideoRepository>>,
    params: web::Path<i64>,
) -> impl Responder {
    let id = params.into_inner();
    let response = data
        .dislike(
            id,
            User {
                id: 1,
                email: "".to_string(),
                user_role: Role::Admin,
                username: "".to_string(),
                description: None,
                picture_url: None,
            },
        )
        .await;

    match response {
        Ok(_) => HttpResponse::Ok().json(()),
        Err(e) => HttpResponse::InternalServerError().json(e),
    }
}
