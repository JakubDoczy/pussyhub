use std::sync::Arc;

use actix_web::{web, HttpResponse, Responder};
use shared_lib::payload::video::{GetVideoResponse, PostVideoRequest, PutVideoRequest, VideoRequest, VideoWithoutId};

use crate::repository::video_repository::{PostgresVideoRepository, VideoRepository};

#[actix_web::get("/videos/{id}")]
pub async fn get_video_by_id(
    data: web::Data<Arc<PostgresVideoRepository>>,
    params: web::Path<i64>,
) -> impl Responder {
    let id = params.into_inner();

    let response = data.get_video(id).await;

    match response {
        Ok(video) => HttpResponse::Ok().json(video),
        Err(e) => HttpResponse::InternalServerError().json(""),
    }
}

#[actix_web::put("/videos/{id}")]
pub async fn put_video_by_id(
    data: web::Data<Arc<PostgresVideoRepository>>,
    params: web::Path<i64>,
    video: web::Json<VideoRequest>,
) -> impl Responder {
    let id = params.into_inner();

    let response = data.update_video(id, video.into_inner()).await;

    match response {
        Ok(video) => HttpResponse::Ok().json(video),
        Err(e) => HttpResponse::InternalServerError().json(""),
    }
}

#[actix_web::post("/videos")]
pub async fn post_video(
    data: web::Data<Arc<PostgresVideoRepository>>,
    video: web::Json<VideoRequest>,
) -> impl Responder {
    let response = data.create_video(video.into_inner()).await;

    match response {
        Ok(video) => HttpResponse::Ok().json(video),
        Err(e) => HttpResponse::InternalServerError().json(""),
    }
}

#[actix_web::delete("/videos/{id}")]
pub async fn delete_video(
    data: web::Data<Arc<PostgresVideoRepository>>,
    params: web::Path<i64>,
) -> impl Responder {
    let id = params.into_inner();

    let response = data.delete_video(id).await;

    match response {
        Ok(video) => HttpResponse::Ok().json(""),
        Err(e) => HttpResponse::InternalServerError().json(""),
    }
}

#[actix_web::get("/videos")]
pub async fn list_videos(data: web::Data<Arc<PostgresVideoRepository>>) -> impl Responder {
    let response = data.get_videos().await;

    match response {
        Ok(video) => HttpResponse::Ok().json(video),
        Err(e) =>
            HttpResponse::InternalServerError().json(""),
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
        Ok(video) => HttpResponse::Ok().json(video),
        Err(e) => HttpResponse::InternalServerError().json(""),
    }
}
