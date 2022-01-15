use shared_lib::error::auth::AuthError;
use shared_lib::payload::auth::AuthPayload;
use shared_lib::token_validation::SlimUser;
use crate::services::auth::{is_auth, login, logout, user_info};
use yew::prelude::*;
use yewdux::prelude::*;
use ybc::InputType;

use yewtil::future::LinkFuture;
use yewtil::NeqAssign;
use crate::State;

pub enum Msg {
    UpdateEmail(String),
    UpdatePass(String),
    LoginSubmit,
    LoginResult(Result<SlimUser, AuthError>),
    Logout,
}

pub struct Login {
    email: String,
    pass: String,
    error_info: Option<String>,
    link: ComponentLink<Self>,
    dispatch: DispatchProps<BasicStore<State>>,
}

impl Component for Login {
    type Message = Msg;
    type Properties = DispatchProps<BasicStore<State>>;

    fn create(dispatch: Self::Properties, link: ComponentLink<Self>) -> Self {
        Self {
            email: String::new(),
            pass: String::new(),
            error_info: None,
            dispatch,
            link
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::UpdateEmail(s) => {
                self.email = s;
                false
            }
            Msg::UpdatePass(s) => {
                self.pass = s;
                false
            }
            Msg::LoginSubmit => {
                let payload = AuthPayload {
                    email: self.email.clone(),
                    password: self.pass.clone()
                };
                self.link.send_future(async {
                    let res = login(payload).await;
                    Msg::LoginResult(res)
                });
                false
            }
            Msg::LoginResult(response) => {
                match response {
                    Ok(_) => self.dispatch.reduce(|s| s.is_auth = true),
                    Err(err) => self.error_info =  Some( match err {
                        AuthError::UserDoesNotExist(_) | AuthError::IncorrectPassword => "The email or password is incorrect".to_string(),
                        AuthError::UnexpectedError => "Unexpected error".to_string()
                    })
                }
                true
            }
            Msg::Logout => {
                logout();
                self.dispatch.reduce(|s| s.is_auth = false);
                true
            }
        }
    }

    fn change(&mut self, dispatch: Self::Properties) -> ShouldRender {
        self.dispatch.neq_assign(dispatch)
    }

    fn view(&self) -> Html {

        let error = match self.error_info.clone() {
            Some(error) => html! { <ybc::Notification classes={classes!("is-danger")}> { error } </ybc::Notification> },
            None => html!{}
        };

        let user = user_info();

        let login_form = html!(
            <ybc::Box>
                <ybc::Field>
                    <label class={"label"}>{"Email"}</label>
                    <ybc::Control classes={classes!("has-icons-left")}>
                        <ybc::Input name={"username"} value=self.email.clone() update=self.link.callback(|s| Msg::UpdateEmail(s)) placeholder={"Email"}></ybc::Input>
                        <ybc::Icon classes={classes!("is-small", "is-left")}>
                            <i class={"fas fa-user"}></i>
                        </ybc::Icon>
                    </ybc::Control>
                </ybc::Field>
                <ybc::Field>
                    <label class="label">{"Password"}</label>
                    <ybc::Control classes={classes!("has-icons-left")}>
                        <ybc::Input name={"pass"} value=self.pass.clone() update=self.link.callback(|p| Msg::UpdatePass(p)) r#type=InputType::Password placeholder={"Password"}></ybc::Input>
                        <ybc::Icon classes={classes!("is-small", "is-left")}>
                            <i class={"fas fa-lock"}></i>
                        </ybc::Icon>
                    </ybc::Control>
                </ybc::Field>
                <ybc::Field>
                    <ybc::Control>
                        <ybc::Button classes={classes!("is-success")} onclick=self.link.callback(|_| Msg::LoginSubmit)>
                            {"Submit"}
                        </ybc::Button>
                    </ybc::Control>
                </ybc::Field>
                { error }
            </ybc::Box>
        );

        let login_info = html!(
            <ybc::Box>
                <ybc::Content>
                    <p>{"Logged in as "} <em>{ user.username }</em></p>
                </ybc::Content>
                <ybc::Button classes={classes!("is-primary")} onclick=self.link.callback(|_| Msg::Logout)>
                    {"Logout"}
                </ybc::Button>
            </ybc::Box>
        );

        html!(
            <div style="max-width: 400px; margin: auto;">
            {
                if is_auth() {
                    { login_info }
                }
                else {
                    { login_form }
                }
            }
            </div>
        )

    }
}
