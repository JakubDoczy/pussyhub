use crate::error::video::resolve;
use crate::model::user::{Role, User};
use crate::repository::video_repository::VideoRepository;
use crate::PostgresVideoRepository;
use actix_web::{web, HttpResponse, Responder};
use shared_lib::payload::rating::RatingResponse;
use std::sync::Arc;

#[actix_web::post("/videos/{id}/like")]
pub async fn like_video(
    data: web::Data<Arc<PostgresVideoRepository>>,
    params: web::Path<i64>,
) -> impl Responder {
    let id = params.into_inner();
    let response = data
        .toggle_like(
            id,
            User {
                id: 1,
                email: "".to_string(),
                verified: true,
                user_role: Role::Admin,
                username: "".to_string(),
                description: None,
                picture_url: None,
                created_at: chrono::offset::Utc::now(),
            },
        )
        .await;

    match response {
        Ok(toggled) => HttpResponse::Ok().json(RatingResponse { toggled }),
        Err(e) => resolve(e),
    }
}

#[actix_web::post("/videos/{id}/dislike")]
pub async fn dislike_video(
    data: web::Data<Arc<PostgresVideoRepository>>,
    params: web::Path<i64>,
) -> impl Responder {
    let id = params.into_inner();
    let response = data
        .toggle_dislike(
            id,
            User {
                id: 1,
                email: "".to_string(),
                verified: true,
                user_role: Role::Admin,
                username: "".to_string(),
                description: None,
                picture_url: None,
                created_at: chrono::offset::Utc::now(),
            },
        )
        .await;

    match response {
        Ok(toggled) => HttpResponse::Ok().json(RatingResponse { toggled }),
        Err(e) => resolve(e),
    }
}
