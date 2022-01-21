use std::sync::Arc;

use crate::auth::check_role;
use crate::error::auth::{resolve as auth_resolve, AuthError};
use crate::error::stream::resolve;
use crate::error::Error;
use crate::model::user::{Role as ModelRole, User};
use crate::model::stream::{from_streams, Stream};
use actix_web::{web, HttpRequest, HttpResponse, Responder};
use shared_lib::payload::stream::{
    GetStreamResponse, PostStreamRequest, PostStreamResponse, PutStreamRequest, PutStreamResponse,
};
use shared_lib::token_validation::{Role, TokenValidator};

use crate::repository::stream_repository::{PostgresStreamRepository, StreamRepository};

#[actix_web::get("/streams/{id}")]
pub async fn get_stream_by_id(
    data: web::Data<Arc<PostgresStreamRepository>>,
    params: web::Path<i64>,
) -> impl Responder {
    let id = params.into_inner();

    let response = data.get_stream(id).await;

    match response {
        Ok(stream) => HttpResponse::Ok().json(GetStreamResponse::from(stream)),
        Err(e) => resolve(e),
    }
}

#[actix_web::put("/streams/{id}")]
pub async fn put_stream_by_id(
    data: web::Data<Arc<PostgresStreamRepository>>,
    token_validator: web::Data<Arc<TokenValidator>>,
    params: web::Path<i64>,
    stream: web::Json<PutStreamRequest>,
    req: HttpRequest,
) -> impl Responder {
    if let Err(e) = stream.validate_content() {
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
    let stream = Stream::from(stream.into_inner());

    if user.id != stream.creator_id {
        return auth_resolve(AuthError::AccessDenied);
    }

    let id = params.into_inner();
    let response = data.update_stream(id, stream).await;

    match response {
        Ok(stream) => HttpResponse::Ok().json(PutStreamResponse::from(stream)),
        Err(e) => resolve(e),
    }
}

#[actix_web::post("/streams")]
pub async fn post_stream(
    data: web::Data<Arc<PostgresStreamRepository>>,
    token_validator: web::Data<Arc<TokenValidator>>,
    stream: web::Json<PostStreamRequest>,
    req: HttpRequest,
) -> impl Responder {
    if let Err(e) = stream.validate_content() {
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
    let stream = Stream::from(stream.into_inner());

    if user.id != stream.creator_id {
        return auth_resolve(AuthError::AccessDenied);
    }

    let response = data.create_stream(stream).await;

    match response {
        Ok(stream) => HttpResponse::Ok().json(PostStreamResponse::from(stream)),
        Err(e) => resolve(e),
    }
}

#[actix_web::delete("/streams/{id}")]
pub async fn delete_stream(
    data: web::Data<Arc<PostgresStreamRepository>>,
    token_validator: web::Data<Arc<TokenValidator>>,
    params: web::Path<i64>,
    req: HttpRequest,
) -> impl Responder {
    let id = params.into_inner();
    let check = check_role(&req, token_validator, Role::User);
    if let Err(error) = check {
        return error;
    }

    let response = data.get_stream(id).await;
    if let Err(e) = response {
        return resolve(e);
    }

    let user = User::from(check.unwrap());
    let stream = response.unwrap();

    if user.id != stream.creator_id && user.user_role != ModelRole::Admin {
        return auth_resolve(AuthError::AccessDenied);
    }

    let response = data.delete_stream(stream).await;

    match response {
        Ok(_) => HttpResponse::Ok().json(""),
        Err(e) => resolve(e),
    }
}

#[actix_web::get("/streams")]
pub async fn list_streams(data: web::Data<Arc<PostgresStreamRepository>>) -> impl Responder {
    let response = data.get_streams().await;

    match response {
        Ok(stream) => HttpResponse::Ok().json(from_streams(stream)),
        Err(e) => resolve(e),
    }
}

#[actix_web::get("/categories/{id}/streams")]
pub async fn list_streams_in_category(
    data: web::Data<Arc<PostgresStreamRepository>>,
    params: web::Path<i64>,
) -> impl Responder {
    let id = params.into_inner();
    let response = data.list_in_category(id).await;

    match response {
        Ok(streams) => HttpResponse::Ok().json(from_streams(streams)),
        Err(e) => resolve(e),
    }
}

#[actix_web::get("/users/{id}/streams")]
pub async fn list_streams_by_user(
    data: web::Data<Arc<PostgresStreamRepository>>,
    params: web::Path<i64>,
) -> impl Responder {
    let id = params.into_inner();
    let response = data.list_by_user(id).await;

    match response {
        Ok(streams) => HttpResponse::Ok().json(from_streams(streams)),
        Err(e) => resolve(e),
    }
}

#[actix_web::get("/streams/{id}/view")]
pub async fn view_stream(
    data: web::Data<Arc<PostgresStreamRepository>>,
    params: web::Path<i64>,
) -> impl Responder {
    let id = params.into_inner();
    let response = data.view(id).await;

    match response {
        Ok(viewed) => HttpResponse::Ok().json(viewed),
        Err(e) => resolve(e),
    }
}
