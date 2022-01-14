use shared_lib::error::auth::AuthError;
use shared_lib::payload::auth::AuthPayload;
use shared_lib::token_validation::SlimUser;
use crate::services::auth::{is_auth, login, logout, user_info};
use yew::prelude::*;
use yewdux::prelude::*;

use yewtil::future::LinkFuture;
use yewtil::NeqAssign;
use crate::State;

pub enum Msg {
    Login,
    LoginResult(Result<SlimUser, AuthError>),
    Logout,
}

pub struct LoginDemo {
    link: ComponentLink<Self>,
    dispatch: DispatchProps<BasicStore<State>>,
}

impl Component for LoginDemo {
    type Message = Msg;
    type Properties = DispatchProps<BasicStore<State>>;

    fn create(dispatch: Self::Properties, link: ComponentLink<Self>) -> Self {
        Self { dispatch, link }
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
                self.dispatch.reduce(|s| s.is_auth = is_auth());
                true
            }
            Msg::Logout => {
                logout();
                self.dispatch.reduce(|s| s.is_auth = is_auth());
                true
            }
        }
    }

    fn change(&mut self, dispatch: Self::Properties) -> ShouldRender {
        self.dispatch.neq_assign(dispatch)
    }

    fn view(&self) -> Html {
        let user = user_info();

        return html!(
            <>
            {
                if !is_auth() {
                    html!{ <button onclick={self.link.callback(|_| Msg::Login)}>{"Login"}</button> }
                }
                else {
                    html!{ <button onclick={self.link.callback(|_| Msg::Logout)}>{"Logout"}</button> }
                }
            }
            <br />
            { format!("{:?}", user) }
            </>
        );
    }
}
