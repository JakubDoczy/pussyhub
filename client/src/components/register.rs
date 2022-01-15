use shared_lib::error::registration::RegistrationError;
use shared_lib::payload::registration::UserRegistrationPayload;
use shared_lib::token_validation::SlimUser;
use crate::services::auth::{is_auth, register};
use yew::prelude::*;
use yewdux::prelude::*;
use ybc::InputType;

use yewtil::future::LinkFuture;
use yewtil::NeqAssign;
use crate::State;

pub enum Msg {
    UpdateEmail(String),
    UpdateUsername(String),
    UpdatePass(String),
    UpdatePassConfirm(String),
    RegisterSubmit,
    RegisterResult(Result<SlimUser, RegistrationError>),
}

pub struct Register {
    email: String,
    username: String,
    password: String,
    password_confirm: String,
    error_info: Option<String>,
    link: ComponentLink<Self>,
    dispatch: DispatchProps<BasicStore<State>>,
}

impl Component for Register {
    type Message = Msg;
    type Properties = DispatchProps<BasicStore<State>>;

    fn create(dispatch: Self::Properties, link: ComponentLink<Self>) -> Self {
        Self {
            email: String::new(),
            username: String::new(),
            password: String::new(),
            password_confirm: String::new(),
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
            Msg::UpdateUsername(s) => {
                self.username = s;
                false
            }
            Msg::UpdatePass(s) => {
                self.password = s;
                false
            }
            Msg::UpdatePassConfirm(s) => {
                self.password_confirm = s;
                false
            }
            Msg::RegisterSubmit => {
                if self.password != self.password_confirm {
                    self.error_info = Some("password needs to match".to_string());
                    return true;
                }
                let payload = UserRegistrationPayload {
                    email: self.email.clone(),
                    username: self.username.clone(),
                    password: self.password.clone(),
                };
                self.link.send_future(async {
                    let res = register(payload).await;
                    Msg::RegisterResult(res)
                });
                false
            }
            Msg::RegisterResult(response) => {
                match response {
                    Ok(_) => {
                        self.dispatch.reduce(|s| s.is_auth = true);
                        self.email = String::new();
                        self.username = String::new();
                        self.password = String::new();
                        self.error_info = None;
                    },
                    Err(err) => self.error_info = Some( err.to_string() )
                }
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

        let register_form = html!(
            <ybc::Box>
                <ybc::Field>
                    <label class={"label"}>{"Email"}</label>
                    <ybc::Control classes={classes!("has-icons-left")}>
                        <ybc::Input name={"email"} value=self.email.clone() update=self.link.callback(|s| Msg::UpdateEmail(s)) placeholder={"Email"}></ybc::Input>
                        <ybc::Icon classes={classes!("is-small", "is-left")}>
                            <i class={"fas fa-user"}></i>
                        </ybc::Icon>
                    </ybc::Control>
                </ybc::Field>
                <ybc::Field>
                    <label class={"label"}>{"Username"}</label>
                    <ybc::Control classes={classes!("has-icons-left")}>
                        <ybc::Input name={"username"} value=self.username.clone() update=self.link.callback(|s| Msg::UpdateUsername(s)) placeholder={"Username"}></ybc::Input>
                        <ybc::Icon classes={classes!("is-small", "is-left")}>
                            <i class={"fas fa-user"}></i>
                        </ybc::Icon>
                    </ybc::Control>
                </ybc::Field>
                <ybc::Field>
                    <label class="label">{"Password"}</label>
                    <ybc::Control classes={classes!("has-icons-left")}>
                        <ybc::Input name={"password"} value=self.password.clone() update=self.link.callback(|p| Msg::UpdatePass(p)) r#type=InputType::Password placeholder={"Password"}></ybc::Input>
                        <ybc::Icon classes={classes!("is-small", "is-left")}>
                            <i class={"fas fa-lock"}></i>
                        </ybc::Icon>
                    </ybc::Control>
                </ybc::Field>
                <ybc::Field>
                    <label class="label">{"Confirm password"}</label>
                    <ybc::Control classes={classes!("has-icons-left")}>
                        <ybc::Input name={"password_confirm"} value=self.password_confirm.clone() update=self.link.callback(|p| Msg::UpdatePassConfirm(p)) r#type=InputType::Password placeholder={"Confirm password"}></ybc::Input>
                        <ybc::Icon classes={classes!("is-small", "is-left")}>
                            <i class={"fas fa-lock"}></i>
                        </ybc::Icon>
                    </ybc::Control>
                </ybc::Field>
                <ybc::Field>
                    <ybc::Control>
                        <ybc::Button classes={classes!("is-success")} onclick=self.link.callback(|_| Msg::RegisterSubmit)>
                            {"Submit"}
                        </ybc::Button>
                    </ybc::Control>
                </ybc::Field>
                { error }
            </ybc::Box>
        );

        html!(
            <div style="max-width: 400px; margin: auto;">
            {
                if is_auth() {
                    html!( <p> { "TODO" } </p> )
                }
                else {
                    { register_form }
                }
            }
            </div>
        )

    }
}
