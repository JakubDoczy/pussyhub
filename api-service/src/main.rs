use dotenv::dotenv;
use repository::user_repository::PostgresUserRepository;
use sqlx::postgres::PgPoolOptions;
use std::{env, sync::Arc};
use actix_cors::Cors;

mod repository;
mod model;
mod endpoint;

use crate::repository::{
    video_repository::{PostgresVideoRepository},
};
use actix_files::Files;

use actix_web::{web, App, HttpServer};



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
    let user_repository = Arc::new(PostgresUserRepository::new(pool.clone()));

    HttpServer::new(move || {

        let cors = Cors::default()
        .allow_any_header()
        .allow_any_origin()
        .allow_any_method();

        App::new()
            .wrap(cors)
            .app_data(web::Data::new(video_repository.clone()))
            .app_data(web::Data::new(user_repository.clone()))
            .service(
                web::scope("/api")
                .service(endpoint::video::get_video_by_id)
                .service(endpoint::user::get_user_by_id)
                .service(Files::new("/static", "./static").show_files_listing())
            )
    })
        .bind("127.0.0.1:8001")?
        .run()
        .await
}