use shared_lib::error::registration::RegistrationError;
use shared_lib::payload::registration::UserRegistrationPayload;
use shared_lib::token_validation::SlimUser;
use crate::services::auth::{hash_pass, is_auth, register};
use yew::prelude::*;
use yewdux::prelude::*;
use ybc::InputType;

use yewtil::future::LinkFuture;
use yewtil::NeqAssign;
use crate::{State, user_info};

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
    email_helper: Option<String>,
    username: String,
    username_helper: Option<String>,
    password: String,
    password_helper: Option<String>,
    password_confirm: String,
    password_confirm_helper: Option<String>,
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
            email_helper: None,
            username: String::new(),
            username_helper: None,
            password: String::new(),
            password_helper: None,
            password_confirm: String::new(),
            password_confirm_helper: None,
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
                self.error_info = None;
                self.email_helper = None;
                self.username_helper = None;
                self.password_helper = None;
                self.password_confirm_helper = None;

                let payload = UserRegistrationPayload {
                    email: self.email.clone(),
                    username: self.username.clone(),
                    password: hash_pass(self.password.clone()),
                };

                let val = payload.validate_content();
                if val.is_err() {
                    let err = val.unwrap_err();
                    let errs = err.field_errors();
                    if errs.contains_key("email") {
                        self.email_helper = Some(errs["email"][0].clone().message.unwrap().to_string())
                    };
                    if errs.contains_key("username") {
                        self.username_helper = Some(errs["username"][0].clone().message.unwrap().to_string())
                    };
                    if errs.contains_key("password") {
                        self.password_helper = Some(errs["password"][0].clone().message.unwrap().to_string())
                    };
                    if self.password != self.password_confirm {
                        self.password_confirm_helper = Some("passwords have to match".to_string());
                    }
                    return true;
                }

                self.link.send_future(async {
                    let res = register(payload).await;
                    Msg::RegisterResult(res)
                });
                true
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

        let email_classes = classes!(if self.email_helper.is_some() {"is-danger"} else {""});
        let username_classes = classes!(if self.username_helper.is_some() {"is-danger"} else {""});
        let password_classes = classes!(if self.password_helper.is_some() {"is-danger"} else {""});
        let password_confirm_classes = classes!(if self.password_confirm_helper.is_some() {"is-danger"} else {""});

        let register_form = html!(
            <ybc::Box>
                <ybc::Field help={self.email_helper.clone()} help_has_error={self.email_helper.is_some()}>
                    <label class={"label"}>{"Email"}</label>
                    <ybc::Control classes={classes!("has-icons-left")}>
                        <ybc::Input name={"email"} value=self.email.clone() update=self.link.callback(|s| Msg::UpdateEmail(s)) placeholder={"Email"} classes={email_classes} />
                        <ybc::Icon classes={classes!("is-small", "is-left")}>
                            <i class={"fas fa-user"}></i>
                        </ybc::Icon>
                    </ybc::Control>
                </ybc::Field>
                <ybc::Field help={self.username_helper.clone()} help_has_error={self.username_helper.is_some()}>
                    <label class={"label"}>{"Username"}</label>
                    <ybc::Control classes={classes!("has-icons-left")}>
                        <ybc::Input name={"username"} value=self.username.clone() update=self.link.callback(|s| Msg::UpdateUsername(s)) placeholder={"Username"} classes={username_classes} />
                        <ybc::Icon classes={classes!("is-small", "is-left")}>
                            <i class={"fas fa-user"}></i>
                        </ybc::Icon>
                    </ybc::Control>
                </ybc::Field>
                <ybc::Field help={self.password_helper.clone()} help_has_error={self.password_helper.is_some()}>
                    <label class="label">{"Password"}</label>
                    <ybc::Control classes={classes!("has-icons-left")}>
                        <ybc::Input name={"password"} value=self.password.clone() update=self.link.callback(|p| Msg::UpdatePass(p)) r#type=InputType::Password placeholder={"Password"} classes={password_classes} />
                        <ybc::Icon classes={classes!("is-small", "is-left")}>
                            <i class={"fas fa-lock"}></i>
                        </ybc::Icon>
                    </ybc::Control>
                </ybc::Field>
                <ybc::Field help={self.password_confirm_helper.clone()} help_has_error={self.password_confirm_helper.is_some()}>
                    <label class="label">{"Confirm password"}</label>
                    <ybc::Control classes={classes!("has-icons-left")}>
                        <ybc::Input name={"password_confirm"} value=self.password_confirm.clone() update=self.link.callback(|p| Msg::UpdatePassConfirm(p)) r#type=InputType::Password placeholder={"Confirm password"} classes={password_confirm_classes} />
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

        let user_info = user_info();

        html!(
            <div style="max-width: 400px; margin: auto;">
            {
                if !is_auth() {
                    { register_form }
                }
                else if !user_info.verified {
                    html!( <ybc::Notification> { "Registration in progress. Check your email (spam folder) for confirmation link." } </ybc::Notification> )
                }
                else {
                    html!( <ybc::Notification> { "Email verified. Registration complete." } </ybc::Notification> )
                }
            }
            </div>
        )

    }
}
