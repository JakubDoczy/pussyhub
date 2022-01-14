use std::sync::Arc;

use actix_web::{web, Responder, HttpResponse};
use shared_lib::payload::video::VideoWithoutId;

use crate::repository::video_repository::{PostgresVideoRepository, VideoRepository};

#[actix_web::get("/videos/{id}")]
pub async fn get_video_by_id(
    data: web::Data<Arc<PostgresVideoRepository>>,
    params: web::Path<i64>,
) -> impl Responder {
    let id = params.into_inner();

    let response = data.get_video(id).await;

    match response {
        Ok(video) =>  HttpResponse::Ok().json(video),
        Err(e) => HttpResponse::InternalServerError().json(""),
    }
}

#[actix_web::put("/videos/{id}")]
pub async fn put_video_by_id(
    data: web::Data<Arc<PostgresVideoRepository>>,
    params: web::Path<i64>,
    video: web::Json<VideoWithoutId>
) -> impl Responder {
    let id = params.into_inner();

    let response = data.update_video(id, video.into_inner()).await;

    match response {
        Ok(video) =>  HttpResponse::Ok().json(video),
        Err(e) => HttpResponse::InternalServerError().json(""),
    }
}

#[actix_web::post("/videos")]
pub async fn post_video(
    data: web::Data<Arc<PostgresVideoRepository>>,
    video: web::Json<VideoWithoutId>
) -> impl Responder {
    let response = data.create_video(video.into_inner()).await;

    match response {
        Ok(video) =>  HttpResponse::Ok().json(video),
        Err(e) => HttpResponse::InternalServerError().json(""),
    }
}