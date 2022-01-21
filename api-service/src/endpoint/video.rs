use std::sync::Arc;

use crate::auth::check_role;
use crate::error::auth::{resolve as auth_resolve, AuthError};
use crate::error::video::resolve;
use crate::error::Error;
use crate::model::user::{Role as ModelRole, User};
use crate::model::video::{from_videos, Video};
use actix_web::{web, HttpRequest, HttpResponse, Responder};
use shared_lib::payload::video::{
    GetVideoResponse, PostVideoRequest, PostVideoResponse, PutVideoRequest, PutVideoResponse,
};
use shared_lib::token_validation::{Role, TokenValidator};

use crate::repository::video_repository::{PostgresVideoRepository, VideoRepository};

#[actix_web::get("/videos/{id}")]
pub async fn get_video_by_id(
    data: web::Data<Arc<PostgresVideoRepository>>,
    params: web::Path<i64>,
) -> impl Responder {
    let id = params.into_inner();

    let response = data.get_video(id).await;

    match response {
        Ok(video) => HttpResponse::Ok().json(GetVideoResponse::from(video)),
        Err(e) => resolve(e),
    }
}

#[actix_web::put("/videos/{id}")]
pub async fn put_video_by_id(
    data: web::Data<Arc<PostgresVideoRepository>>,
    token_validator: web::Data<Arc<TokenValidator>>,
    params: web::Path<i64>,
    video: web::Json<PutVideoRequest>,
    req: HttpRequest,
) -> impl Responder {
    if let Err(e) = video.validate_content() {
        return HttpResponse::BadRequest().json(Error {
            code: 400,
            message: e.to_string(),
        });
    }

    let check = check_role(&req, token_validator, Role::User);
    if let Err(error) = check {
        return error;
    }
    let user = User::from(check.unwrap());
    let video = Video::from(video.into_inner());

    if user.id != video.creator_id {
        return auth_resolve(AuthError::AccessDenied);
    }

    let id = params.into_inner();
    let response = data.update_video(id, video).await;

    match response {
        Ok(video) => HttpResponse::Ok().json(PutVideoResponse::from(video)),
        Err(e) => resolve(e),
    }
}

#[actix_web::post("/videos")]
pub async fn post_video(
    data: web::Data<Arc<PostgresVideoRepository>>,
    token_validator: web::Data<Arc<TokenValidator>>,
    video: web::Json<PostVideoRequest>,
    req: HttpRequest,
) -> impl Responder {
    if let Err(e) = video.validate_content() {
        return HttpResponse::BadRequest().json(Error {
            code: 400,
            message: e.to_string(),
        });
    }

    let check = check_role(&req, token_validator, Role::User);
    if let Err(error) = check {
        return error;
    }
    let user = User::from(check.unwrap());
    let video = Video::from(video.into_inner());

    if user.id != video.creator_id {
        return auth_resolve(AuthError::AccessDenied);
    }

    let response = data.create_video(video).await;

    match response {
        Ok(video) => HttpResponse::Ok().json(PostVideoResponse::from(video)),
        Err(e) => resolve(e),
    }
}

#[actix_web::delete("/videos/{id}")]
pub async fn delete_video(
    data: web::Data<Arc<PostgresVideoRepository>>,
    token_validator: web::Data<Arc<TokenValidator>>,
    params: web::Path<i64>,
    req: HttpRequest,
) -> impl Responder {
    let id = params.into_inner();
    let check = check_role(&req, token_validator, Role::User);
    if let Err(error) = check {
        return error;
    }

    let response = data.get_video(id).await;
    if let Err(e) = response {
        return resolve(e);
    }

    let user = User::from(check.unwrap());
    let video = response.unwrap();

    if user.id != video.creator_id && user.user_role != ModelRole::Admin {
        return auth_resolve(AuthError::AccessDenied);
    }

    let response = data.delete_video(video).await;

    match response {
        Ok(_) => HttpResponse::Ok().json(""),
        Err(e) => resolve(e),
    }
}

#[actix_web::get("/videos")]
pub async fn list_videos(data: web::Data<Arc<PostgresVideoRepository>>) -> impl Responder {
    let response = data.get_videos().await;

    match response {
        Ok(video) => HttpResponse::Ok().json(from_videos(video)),
        Err(e) => resolve(e),
    }
}

#[actix_web::get("/categories/{id}/videos")]
pub async fn list_videos_in_category(
    data: web::Data<Arc<PostgresVideoRepository>>,
    params: web::Path<i64>,
) -> impl Responder {
    let id = params.into_inner();
    let response = data.list_in_category(id).await;

    match response {
        Ok(videos) => HttpResponse::Ok().json(from_videos(videos)),
        Err(e) => resolve(e),
    }
}

#[actix_web::get("/users/{id}/videos")]
pub async fn list_videos_by_user(
    data: web::Data<Arc<PostgresVideoRepository>>,
    params: web::Path<i64>,
) -> impl Responder {
    let id = params.into_inner();
    let response = data.list_by_user(id).await;

    match response {
        Ok(videos) => HttpResponse::Ok().json(from_videos(videos)),
        Err(e) => resolve(e),
    }
}

#[actix_web::get("/videos/{id}/view")]
pub async fn view_video(
    data: web::Data<Arc<PostgresVideoRepository>>,
    params: web::Path<i64>,
) -> impl Responder {
    let id = params.into_inner();
    let response = data.view(id).await;

    match response {
        Ok(viewed) => HttpResponse::Ok().json(viewed),
        Err(e) => resolve(e),
    }
}
