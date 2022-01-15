use std::env;
use std::sync::Mutex;

use actix_web::{web, HttpResponse};
use anyhow::Error;
use lettre::{Message, SmtpTransport, Transport};
use tracing::{debug, error};

use shared_lib::payload::registration::UserRegistrationPayload;
use shared_lib::error::registration::{EmailVerificationError, RegistrationError};
use shared_lib::token_validation::SlimUser;

use crate::database::error::DBRegistrationError;

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
        Err(e) => {
            debug!(
                "Received invalid token \"{:?}\" for email confirmation. Error {:?}",
                token, e
            );
            return HttpResponse::Unauthorized().json(EmailVerificationError::InvalidToken);
        }
        Ok(id) => {
            debug!(
                "Received valid token for email confirmation, user id: {}",
                id
            );
            id
        }
    };

    let db_update_result = shared_call!(service_data, user_repo, set_email_verified(id)).await;

    match db_update_result {
        Ok(()) => {
            debug!("Successfuly verified email address for user id: {}", id);
            HttpResponse::Ok().json("User email was successuly verified.".to_string())
        }
        Err(e) => {
            error!(
                "Unexpected error during email confirmation, failed to update database: {:?}",
                e
            );
            HttpResponse::InternalServerError().json(EmailVerificationError::UnexpectedError)
        }
    }
}

async fn register_user_to_db(
    user_repo: &Mutex<PostgresUserRepo>,
    registration_payload: &UserRegistrationPayload,
) -> Result<SlimUser, DBRegistrationError> {
    let ret = {
        let unlocked_repo = user_repo.lock().unwrap();
        unlocked_repo.register_user(registration_payload).await
    };
    ret
}

fn create_email_validation_token(
    token_issuer: &Mutex<TokenIssuer>,
    user_id: i64,
) -> Result<String, Error> {
    let token = {
        let unlocked_issuer = token_issuer.lock().unwrap();
        unlocked_issuer.sign_invitation(user_id)
    }?;
    Ok(token)
}

fn create_message(domain: &str, user_email: &str, token: &str) -> Message {
    let link = format!(r"{}/email_confirmation/{}", domain, token);
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
) -> Result<(), Error> {
    let token = create_email_validation_token(token_issuer, user_id)?;
    let message = create_message(domain, user_email, &token);

    let _smtp_result = {
        let unlocked_smtp_transport = smtp_transport.lock().unwrap();
        unlocked_smtp_transport.send(&message)
    }?;

    Ok(())
}

fn create_jwt(token_issuer: &Mutex<TokenIssuer>, slim_user: SlimUser) -> Result<String, Error> {
    let jwt = {
        let unlocked_issuer = token_issuer.lock().unwrap();
        unlocked_issuer.issue_token(slim_user)
    }?;

    Ok(jwt)
}

pub(crate) async fn registration_handler(
    service_data: web::Data<ApplicationData>,
    provided_payload: web::Json<UserRegistrationPayload>,
) -> HttpResponse {
    let domain_name = env::var("DOMAIN_NAME").expect("DOMAIN_NAME must be set");

    let registration_payload = provided_payload.into_inner();

    if let Err(e) = registration_payload.validate() {
        return HttpResponse::BadRequest()
            .json(RegistrationError::ValidationError(e));
    }

    let user = match register_user_to_db(&service_data.user_repo, &registration_payload).await {
        Err(DBRegistrationError::UsernameAlreadyExists(username)) => {
            debug!(
                "Failed to register user {:?}, username already exists",
                registration_payload
            );
            return HttpResponse::Conflict()
                .json(RegistrationError::UsernameAlreadyExists(username));
        }
        Err(DBRegistrationError::EmailAlreadyExists(email)) => {
            debug!(
                "Failed to register user {:?}, email address already exists",
                registration_payload
            );
            return HttpResponse::Conflict().json(RegistrationError::EmailAlreadyExists(email));
        }
        Err(e) => {
            error!("Failed to register user, error: {:?}", e);
            return HttpResponse::InternalServerError().json(RegistrationError::UnexpectedError);
        }
        Ok(slim_user) => slim_user,
    };

    if let Err(e) = send_confirmation_email(
        &service_data.token_issuer,
        &service_data.smtp_transport,
        &domain_name,
        &user.email,
        user.user_id,
    ) {
        error!("Failed to send confirmation email, error: {:?}", e);
        return HttpResponse::InternalServerError().json(RegistrationError::UnexpectedError);
    }

    match create_jwt(&service_data.token_issuer, user) {
        Ok(token) => HttpResponse::Ok().content_type("application/jwt").body(token),
        Err(e) => {
            error!("Failed to create jwt, error: {:?}", e);
            HttpResponse::InternalServerError().json(RegistrationError::UnexpectedError)
        }
    }
}
