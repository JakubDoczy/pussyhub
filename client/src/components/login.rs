use shared_lib::error::auth::AuthError;
use shared_lib::payload::auth::AuthPayload;
use shared_lib::token_validation::SlimUser;
use crate::services::auth::{is_auth, login, logout, user_info};
use yew::prelude::*;
use yewdux::prelude::*;
use ybc::InputType;
use yew_router::agent::RouteRequest;
use yew_router::prelude::*;

use yewtil::future::LinkFuture;
use yewtil::NeqAssign;
use crate::routes::AppRoute;
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
    email_helper: Option<String>,
    pass: String,
    pass_helper: Option<String>,
    error_info: Option<String>,
    route_dispatcher: RouteAgentDispatcher,
    link: ComponentLink<Self>,
    dispatch: DispatchProps<BasicStore<State>>,
}

impl Component for Login {
    type Message = Msg;
    type Properties = DispatchProps<BasicStore<State>>;

    fn create(dispatch: Self::Properties, link: ComponentLink<Self>) -> Self {
        Self {
            email: String::new(),
            email_helper: None,
            pass: String::new(),
            pass_helper: None,
            error_info: None,
            route_dispatcher: RouteAgentDispatcher::new(),
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
                self.error_info = None;
                self.email_helper = None;
                self.pass_helper = None;

                let payload = AuthPayload {
                    email: self.email.clone(),
                    password: self.pass.clone()
                };

                let val = payload.validate_content();
                if val.is_err() {
                    let err = val.unwrap_err();
                    let errs = err.field_errors();
                    if errs.contains_key("email") {
                        self.email_helper = Some(errs["email"][0].clone().message.unwrap().to_string())
                    };
                    if errs.contains_key("password") {
                        self.pass_helper = Some(errs["password"][0].clone().message.unwrap().to_string())
                    };
                    return true;
                }

                self.link.send_future(async {
                    let res = login(payload).await;
                    Msg::LoginResult(res)
                });
                true
            }
            Msg::LoginResult(response) => {
                match response {
                    Ok(_) => {
                        self.dispatch.reduce(|s| s.is_auth = true);
                        self.email = String::new();
                        self.pass = String::new();
                        self.route_dispatcher
                            .send(RouteRequest::ChangeRoute(AppRoute::Home.into()));
                    },
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

        let error_banner = match self.error_info.clone() {
            Some(error) => html! { <ybc::Notification classes={classes!("is-danger")}> { error } </ybc::Notification> },
            None => html!{}
        };

        let email_classes = classes!(if self.email_helper.is_some() {"is-danger"} else {""});
        let pass_classes = classes!(if self.pass_helper.is_some() {"is-danger"} else {""});

        let login_form = html!(
            <ybc::Box>
                <ybc::Field help={self.email_helper.clone()} help_has_error={self.email_helper.is_some()}>
                    <label class={"label"}>{"Email"}</label>
                    <ybc::Control classes={classes!("has-icons-left")}>
                        <ybc::Input name={"email"} value=self.email.clone() update=self.link.callback(|s| Msg::UpdateEmail(s)) r#type=InputType::Email placeholder={"Email"} classes={email_classes} />
                        <ybc::Icon classes={classes!("is-small", "is-left")}>
                            <i class={"fas fa-user"}></i>
                        </ybc::Icon>
                    </ybc::Control>
                </ybc::Field>
                <ybc::Field help={self.pass_helper.clone()} help_has_error={self.pass_helper.is_some()}>
                    <label class="label">{"Password"}</label>
                    <ybc::Control classes={classes!("has-icons-left")}>
                        <ybc::Input name={"pass"} value=self.pass.clone() update=self.link.callback(|p| Msg::UpdatePass(p)) r#type=InputType::Password placeholder={"Password"} classes={pass_classes} />
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
                { error_banner }
            </ybc::Box>
        );


        let user = user_info();
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
