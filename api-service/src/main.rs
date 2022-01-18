use actix_cors::Cors;
use actix_files::Files;
use actix_web::middleware::Logger;
use actix_web::{middleware, web, App, HttpServer};
use dotenv::dotenv;
use sqlx::postgres::PgPoolOptions;
use std::{env, sync::Arc};

mod endpoint;
mod error;
mod model;
mod repository;

use crate::repository::category_repository::PostgresCategoryRepository;
use crate::repository::user_repository::PostgresUserRepository;
use crate::repository::video_repository::PostgresVideoRepository;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    tracing_subscriber::fmt::init();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL cannot be empty");

    let pool = Arc::new(
        PgPoolOptions::new()
            .max_connections(5)
            .connect(&database_url)
            .await
            .unwrap(),
    );

    let video_repository = Arc::new(PostgresVideoRepository::new(pool.clone()));
    let category_repository = Arc::new(PostgresCategoryRepository::new(pool.clone()));
    let user_repository = Arc::new(PostgresUserRepository::new(pool.clone()));

    let address = env::var("API_SERVICE_ADDRESS").unwrap_or_else("127.0.0.1:8001");

    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_header()
            .allow_any_origin()
            .allow_any_method();

        App::new()
            .wrap(cors)
            .app_data(web::Data::new(video_repository.clone()))
            .app_data(web::Data::new(category_repository.clone()))
            .app_data(web::Data::new(user_repository.clone()))
            .service(
                web::scope("/api")
                    .service(endpoint::video::get_video_by_id)
                    .service(endpoint::video::put_video_by_id)
                    .service(endpoint::video::post_video)
                    .service(endpoint::video::delete_video)
                    .service(endpoint::video::list_videos)
                    .service(endpoint::video::list_videos_in_category)
                    .service(endpoint::video::list_videos_by_user)
                    .service(endpoint::category::get_category_by_id)
                    .service(endpoint::category::put_category)
                    .service(endpoint::category::post_category)
                    .service(endpoint::category::delete_category)
                    .service(endpoint::category::list_catgeories)
                    .service(endpoint::rating::like_video)
                    .service(endpoint::rating::dislike_video)
                    .service(endpoint::video::view_video)
                    .service(endpoint::user::get_user_by_id),
            )
    })
    .bind(address)?
    .run()
    .await
}
