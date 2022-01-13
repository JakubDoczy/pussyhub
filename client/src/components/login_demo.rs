use shared_lib::error::auth::AuthError;
use shared_lib::payload::auth::AuthPayload;
use shared_lib::token_validation::SlimUser;
use crate::services::auth::{is_auth, login, logout, user_info};
use yew::prelude::*;

use yewtil::future::LinkFuture;

pub enum Msg {
    Login,
    LoginResult(Result<SlimUser, AuthError>),
    Logout,
}

pub struct LoginDemo {
    link: ComponentLink<Self>,
    user: SlimUser
}

impl Component for LoginDemo {
    type Message = Msg;
    type Properties = ();

    fn create(_props: Self::Properties, link: ComponentLink<Self>) -> Self {
        Self { user: user_info(), link }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::Login => {
                let payload = AuthPayload {
                    email: "admin@pussyhub.com".to_string(),
                    password: "admin".to_string()
                };
                self.link.send_future(async {
                    let res = login(payload).await;
                    Msg::LoginResult(res)
                });
                false
            }
            Msg::LoginResult(_) => {
                self.user = user_info();
                true
            }
            Msg::Logout => {
                logout();
                self.user = user_info();
                true
            }
        }
    }

    fn change(&mut self, _props: Self::Properties) -> ShouldRender {
        false
    }

    fn view(&self) -> Html {
        return html! {
            <>
            {
                if is_auth() {
                html!{ <button onclick={self.link.callback(|_| Msg::Login)}>{"Login"}</button> }
            }
                else {
                html!{ <button onclick={self.link.callback(|_| Msg::Logout)}>{"Logout"}</button> }
            }

            }
            </>
        };
    }
}