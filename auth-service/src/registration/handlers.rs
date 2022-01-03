use std::env;
use std::sync::Mutex;

use actix_web::{web, HttpResponse};

use shared_lib::auth::UserRegistrationPayload;
use shared_lib::errors::{EmailVerificationError, RegistrationError};
use shared_lib::token_validation::SlimUser;

use lettre::{Message, SmtpTransport, Transport};

use crate::application_data::ApplicationData;
use crate::database::user_repo::PostgresUserRepo;
use crate::registration::invitation::{InvitationIssuer, InvitationValidator};
use crate::token_issuer::TokenIssuer;

macro_rules! shared_call {
    ($app_data:expr, $argument:ident, $method:ident($($method_args:expr),*)) => {
        $app_data.$argument.lock().unwrap().$method($($method_args),*)
    };
}

// Since this is a get request, we do not want to issue any token.
pub(crate) async fn confirmation_handler(
    service_data: web::Data<ApplicationData>,
    token: web::Path<String>,
) -> HttpResponse {
    let token = token.into_inner();
    let token_result = shared_call!(service_data, token_validator, validate_invitation(&token));

    let id = match token_result {
        Err(e) => return HttpResponse::Unauthorized().json(EmailVerificationError::InvalidToken()),
        Ok(id) => id,
    };

    let db_update_result = shared_call!(service_data, user_repo, set_email_verified(id)).await;

    match db_update_result {
        Ok(()) => HttpResponse::Ok().json("User email was successuly verified.".to_string()),
        Err(e) => HttpResponse::InternalServerError().json(e),
    }
}

async fn register_user_to_db(
    user_repo: &Mutex<PostgresUserRepo>,
    registration_payload: &UserRegistrationPayload,
) -> Result<SlimUser, RegistrationError> {
    let registration_result = {
        let unlocked_repo = user_repo.lock().unwrap();
        unlocked_repo.register_user(registration_payload).await
    };
    // TODO: log
    registration_result
}

fn create_email_validation_token(
    token_issuer: &Mutex<TokenIssuer>,
    user_id: i64,
) -> Result<String, RegistrationError> {
    let token_result = {
        let unlocked_issuer = token_issuer.lock().unwrap();
        unlocked_issuer.sign_invitation(user_id)
    };

    match token_result {
        Err(e) => Err(RegistrationError::new_unexpected(&e)),
        Ok(token) => Ok(token),
    }
}

fn create_message(domain: &str, user_email: &str, token: &str) -> Message {
    let link = format!(r"{}/email_confirmation/{}", domain, token);
    // TODO: create /email_confirmation/ on client to confirm email

    let from = format!("OurApp <noreply@{}>", domain);

    Message::builder()
        .to(user_email.parse().unwrap())
        .from(from.parse().unwrap())
        .subject("Confirm your email address")
        .body(format!("Please confirm your email address by clicking the following link to complete the registration:\n{}", link))
        .unwrap()
}

fn send_confirmation_email(
    token_issuer: &Mutex<TokenIssuer>,
    smtp_transport: &Mutex<SmtpTransport>,
    domain: &str,
    user_email: &str,
    user_id: i64,
) -> Result<(), RegistrationError> {
    let token = create_email_validation_token(token_issuer, user_id)?;
    let message = create_message(domain, user_email, &token);

    let smtp_result = {
        let unlocked_smtp_transport = smtp_transport.lock().unwrap();
        unlocked_smtp_transport.send(&message)
    };

    match smtp_result {
        Err(e) => Err(RegistrationError::new_unexpected(&e)),
        ok => Ok(()),
    }
}

fn create_jwt(
    token_issuer: &Mutex<TokenIssuer>,
    slim_user: SlimUser,
) -> Result<String, RegistrationError> {
    let jwt_result = {
        let unlocked_issuer = token_issuer.lock().unwrap();
        unlocked_issuer.issue_token(slim_user)
    };

    match jwt_result {
        Err(e) => Err(RegistrationError::new_unexpected(&e)),
        Ok(jwt) => Ok(jwt),
    }
}

pub(crate) async fn registration_handler(
    service_data: web::Data<ApplicationData>,
    provided_payload: web::Json<UserRegistrationPayload>,
) -> HttpResponse {
    let domain_name = env::var("DOMAIN_NAME").expect("DOMAIN_NAME must be set");

    let registration_payload = provided_payload.into_inner();

    let user = match register_user_to_db(&service_data.user_repo, &registration_payload).await {
        Err(e) => {
            return HttpResponse::InternalServerError().json(e);
        }
        // TODO: username / email already exists error
        Ok(slim_user) => slim_user,
    };

    if let Err(e) = send_confirmation_email(
        &service_data.token_issuer,
        &service_data.smtp_transport,
        &domain_name,
        &user.email,
        user.user_id,
    ) {
        return HttpResponse::InternalServerError().json(e);
    }

    match create_jwt(&service_data.token_issuer, user) {
        Ok(token) => HttpResponse::Ok().json(token),
        Err(e) => HttpResponse::InternalServerError().json(RegistrationError::new_unexpected(&e)),
    }
}
