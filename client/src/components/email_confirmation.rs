use shared_lib::error::registration::EmailVerificationError;
use yew::prelude::*;

use yewtil::future::LinkFuture;
use crate::services::auth::confirm_email;

#[derive(Properties, Clone)]
pub struct Props {
    #[prop_or_default]
    pub confirmation_token: String,
}

pub enum Msg {
    ConfirmationResult(Result<String, EmailVerificationError>),
}

#[derive(Clone)]
enum Status {
    Loading,
    Success(String),
    Error(EmailVerificationError)
}

pub struct EmailConfirmation {
    status: Status,
}

impl Component for EmailConfirmation {
    type Message = Msg;
    type Properties = Props;

    fn create(props: Self::Properties, link: ComponentLink<Self>) -> Self {
        let token  = props.confirmation_token.clone();
        link.send_future(async  move {
            let response = confirm_email(token).await;
            Msg::ConfirmationResult(response)
        });
        Self {
            status: Status::Loading,
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::ConfirmationResult(response) => {
                match response {
                    Ok(s) => self.status = Status::Success(s),
                    Err(err) => self.status = Status::Error(err)
                }
                true
            }
        }
    }

    fn change(&mut self, _props: Self::Properties) -> ShouldRender { false }

    fn view(&self) -> Html {

        match self.status.clone() {
            Status::Loading => html!( <ybc::Notification> { "Confirmation request sent, failed to get response from server." } </ybc::Notification> ),
            Status::Success(_) =>  html!( <ybc::Notification classes={classes!("is-success")}> { "Confirmation successful, continue to login." } </ybc::Notification> ),
            Status::Error(s) => match s {
                EmailVerificationError::InvalidToken => html!( <ybc::Notification classes={classes!("is-danger")}> { "Verification token is not valid." } </ybc::Notification> ),
                EmailVerificationError::UnexpectedError => html!( <ybc::Notification classes={classes!("is-danger")}> { "UnexpectedError." } </ybc::Notification> )
            }
        }

    }
}
