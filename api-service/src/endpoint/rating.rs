use crate::auth::check_role;
use crate::error::video::resolve;
use crate::model::user::User;
use crate::repository::video_repository::VideoRepository;
use crate::PostgresVideoRepository;
use actix_web::{web, HttpRequest, HttpResponse, Responder};
use shared_lib::payload::rating::RatingResponse;
use shared_lib::token_validation::{Role, TokenValidator};
use std::sync::Arc;

#[actix_web::post("/videos/{id}/like")]
pub async fn like_video(
    data: web::Data<Arc<PostgresVideoRepository>>,
    token_validator: web::Data<Arc<TokenValidator>>,
    params: web::Path<i64>,
    req: HttpRequest,
) -> impl Responder {
    let check = check_role(&req, token_validator, Role::User);
    if let Err(error) = check {
        return error;
    }

    let id = params.into_inner();
    let response = data.toggle_like(id, User::from(check.unwrap())).await;

    match response {
        Ok(toggled) => HttpResponse::Ok().json(RatingResponse { toggled }),
        Err(e) => resolve(e),
    }
}

#[actix_web::post("/videos/{id}/dislike")]
pub async fn dislike_video(
    data: web::Data<Arc<PostgresVideoRepository>>,
    token_validator: web::Data<Arc<TokenValidator>>,
    params: web::Path<i64>,
    req: HttpRequest,
) -> impl Responder {
    let check = check_role(&req, token_validator, Role::User);
    if let Err(error) = check {
        return error;
    }
    let id = params.into_inner();
    let response = data.toggle_dislike(id, User::from(check.unwrap())).await;

    match response {
        Ok(toggled) => HttpResponse::Ok().json(RatingResponse { toggled }),
        Err(e) => resolve(e),
    }
}
