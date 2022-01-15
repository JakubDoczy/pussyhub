use std::sync::Arc;

use actix_web::{web, HttpResponse, Responder};
use shared_lib::payload::video::{GetVideoResponse, GetVideos, PostVideoRequest, PostVideoResponse, PutVideoRequest, PutVideoResponse, VideoRequest};
use crate::model::video::{from_videos, Video};

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
        Err(e) => HttpResponse::InternalServerError().json(""),
    }
}

#[actix_web::put("/videos/{id}")]
pub async fn put_video_by_id(
    data: web::Data<Arc<PostgresVideoRepository>>,
    params: web::Path<i64>,
    video: web::Json<PutVideoRequest>,
) -> impl Responder {
    let id = params.into_inner();

    let response = data.update_video(id, Video::from(video.into_inner())).await;

    match response {
        Ok(video) => HttpResponse::Ok().json(PutVideoResponse::from(video)),
        Err(e) => HttpResponse::InternalServerError().json(""),
    }
}

#[actix_web::post("/videos")]
pub async fn post_video(
    data: web::Data<Arc<PostgresVideoRepository>>,
    video: web::Json<PostVideoRequest>,
) -> impl Responder {
    let response = data.create_video(Video::from(video.into_inner())).await;

    match response {
        Ok(video) => HttpResponse::Ok().json(PostVideoResponse::from(video)),
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
        Ok(videos) => HttpResponse::Ok().json(from_videos(videos)),
        Err(e) => HttpResponse::InternalServerError().json(""),
    }
}
