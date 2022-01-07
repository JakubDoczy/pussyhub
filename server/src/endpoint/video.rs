use std::sync::Arc;

use actix_web::{web, Responder, HttpResponse};

use crate::repository::video_repository::{PostgresVideoRepository, VideoRepository};

#[actix_web::get("/video/{id}")]
pub async fn get_video_by_id(
    data: web::Data<Arc<PostgresVideoRepository>>,
    // Get id from path via params
    params: web::Path<i32>,
) -> impl Responder {
    let id = params.into_inner();

    let patient_response = data.get_video(id).await;

    match patient_response {
        Ok(video) =>  HttpResponse::Ok().json(video),
        Err(_) => HttpResponse::InternalServerError().json(""),
    }
}