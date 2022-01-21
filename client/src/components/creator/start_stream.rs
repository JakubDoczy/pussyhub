use gloo::console::debug;
use shared_lib::payload::category::{CategoryResponse, GetCategoriesResponse};
use shared_lib::payload::stream::{GetStreamResponse, PostStreamRequest, PostStreamResponse, PutStreamRequest, PutStreamResponse, StreamRequest};
use shared_lib::payload::user::{GetUserResponse};
use crate::services::auth::user_info;
use yew::prelude::*;
use ybc::InputType;
use yew_router::agent::RouteRequest;
use yew_router::prelude::*;

use std::env;
use yewtil::future::LinkFuture;
use yewtil::NeqAssign;
use crate::routes::AppRoute;
use crate::services::requests;
use lazy_static::lazy_static;

use crate::services::requests::{request_get, request_post, request_put};

lazy_static!{
    // TODO does not work for now, goes to unwrap_or
    static ref STREAM_ROOT: String = env::var("STREAM_SERVICE_URL").unwrap_or("rtmp://127.0.0.1:1935/live".to_string());
    static ref HLS_ROOT: String = env::var("HLS_SERVICE_URL").unwrap_or("http://127.0.0.1:8080/hls".to_string());
}

#[derive(Properties, Clone, PartialEq)]
pub struct Props {
    #[prop_or_default]
    pub stream_id: Option<i64>,
}

pub enum Msg {
    LoadCategories(Result<GetCategoriesResponse, requests::Error>),
    LoadStream(Result<GetStreamResponse, requests::Error>),
    UpdateStreamKey(Result<GetUserResponse, requests::Error>),
    UpdateName(String),
    UpdatePreviewUrl(String),
    UpdateCategory(String),
    Submit,
    SubmitResult(Result<PostStreamResponse, requests::Error>),
}

pub struct StartStream {
    name: String,
    stream_url: String,
    stream_key: String,
    username: String,
    preview_url: String,
    category: Option<CategoryResponse>,
    error_info: Option<String>,
    categories: Vec<CategoryResponse>,
    route_dispatcher: RouteAgentDispatcher,
    link: ComponentLink<Self>,
    props: Props
}

impl Component for StartStream {
    type Message = Msg;
    type Properties = Props;

    fn create(props: Self::Properties, link: ComponentLink<Self>) -> Self {
        if props.stream_id.is_some() {
            link.send_future(async move{
                let id = props.stream_id.unwrap().clone();
                let response = request_get::<GetStreamResponse>(format!("/streams/{}", id)).await;
                Msg::LoadStream(response)
            })
        }
        link.send_future(async{
            let response = request_get::<GetCategoriesResponse>("/categories".to_string()).await;
            Msg::LoadCategories(response)
        });
        link.send_future(async {
            let response = request_get::<GetUserResponse>(format!("/users/{}", user_info().user_id)).await;
            Msg::UpdateStreamKey(response)
        });

        Self {
            name: String::new(),
            stream_url: String::new(),
            preview_url: String::new(),
            stream_key: String::new(),
            username: String::new(),
            category: None,
            error_info: None,
            categories: vec![],
            route_dispatcher: RouteAgentDispatcher::new(),
            props: props.clone(),
            link
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::UpdateName(s) => {
                self.name = s;
                false
            },
            Msg::UpdatePreviewUrl(s) => {
                self.preview_url = s;
                false
            },
            Msg::UpdateCategory(s) => {
                self.category = self.categories.iter().filter(|c| c.name == s).next().map(|c| c.clone());
                false
            }
            Msg::Submit => {
                self.error_info = None;

                if self.category.is_none() {
                    self.error_info = Some("Category not selected".to_string());
                    return true;
                }

                let payload = StreamRequest {
                    creator_id: user_info().user_id,
                    name: self.name.clone(),
                    preview_url: self.preview_url.clone(),
                    stream_url: self.stream_url.clone(),
                    category: self.category.as_ref().unwrap().id
                };

                let val = payload.validate_content();
                if val.is_err() {
                    let err = val.unwrap_err();
                    let errs = err.field_errors();
                    if errs.contains_key("name") {
                        self.error_info = Some(errs["name"][0].clone().message.unwrap().to_string())
                    };
                    return true;
                }

                let stream_id = self.props.stream_id.clone();
                self.link.send_future(async move {
                    let res = match stream_id {
                        Some(id) => {
                            request_put::<PutStreamRequest, PutStreamResponse>(format!("/streams/{}",id), payload).await
                        },
                        None => {
                            request_post::<PostStreamRequest, PostStreamResponse>("/streams".to_string(),payload).await
                        }
                    };
                    Msg::SubmitResult(res)
                });
                true
            }
            Msg::SubmitResult(response) => {
                match response {
                    Ok(_) => {
                        self.name = String::new();
                        self.stream_url = String::new();
                        self.preview_url = String::new();
                        self.category = None;
                        self.route_dispatcher
                            .send(RouteRequest::ChangeRoute(AppRoute::Livestreams.into()));
                    },
                    Err(err) => self.error_info =  Some( err.to_string() )
                }
                true
            }
            Msg::LoadCategories(response) => {
                match response {
                    Ok(categories) => {
                        if self.category.is_none() {
                            self.category = categories.iter().next().map(|c| c.clone());
                        }
                        self.categories = categories;
                    },
                    Err(err) => debug!(err)
                }
                true
            }
            Msg::LoadStream(response) => {
                match response {
                    Ok(stream) => {
                        self.name = stream.name;
                        self.stream_url = stream.stream_url;
                        self.preview_url = stream.preview_url;
                        self.category = Some(stream.category);
                    },
                    Err(err) => debug!(err)
                }
                true
            }
            Msg::UpdateStreamKey(response) => {
                match response {
                    Ok(user) => {
                        self.stream_key = user.stream_key.unwrap_or(String::new());
                        self.username = user.username;
                        self.stream_url = format!("{}/{}.m3u8", *HLS_ROOT, self.username.clone());
                    },
                    Err(err) => debug!(err)
                }
                true
            }
        }
    }

    fn change(&mut self, props: Self::Properties) -> ShouldRender {
        self.props.neq_assign(props)
    }

    fn view(&self) -> Html {

        if self.category.is_none() {
            return html!();
        }

        let error_banner = match self.error_info.clone() {
            Some(error) => html! { <ybc::Notification classes={classes!("is-danger")}> { error } </ybc::Notification> },
            None => html!{}
        };

        let category = self.category.as_ref().unwrap();
        let stream_url = format!("{}", *STREAM_ROOT);
        let stream_key_show = format!("{}/{}", self.username, self.stream_key);

        html!(
            <>
            <h1 class="title">{"Start stream"}</h1>
            <ybc::Box>
                <ybc::Field>
                    <label class={"label"}>{"Stream title"}</label>
                    <ybc::Control>
                        <ybc::Input name={"name"} value=self.name.clone() update=self.link.callback(|s| Msg::UpdateName(s)) r#type=InputType::Text placeholder={"Video title"} />
                    </ybc::Control>
                </ybc::Field>
                <ybc::Field>
                    <label class={"label"}>{"Stream URL"}</label>
                    <code>{stream_url}</code>
                    <p>{"Use this URL as the server address in OBS Studio."}</p>
                </ybc::Field>
                <ybc::Field>
                    <label class={"label"}>{"Stream Key"}</label>
                    <code>{stream_key_show.clone()}</code>
                    <p>{"Use this as the stream key. Do NOT share the stream key with anyone!"}</p>
                </ybc::Field>
                <ybc::Field>
                    <label class={"label"}>{"Thumbnail URL"}</label>
                    <ybc::Control>
                        <ybc::Input name={"thumbnail_url"} value=self.preview_url.clone() update=self.link.callback(|s| Msg::UpdatePreviewUrl(s)) r#type=InputType::Text placeholder={"Thumbnail URL"} />
                    </ybc::Control>
                </ybc::Field>
                <ybc::Field>
                    <label class={"label"}>{"Category"}</label>
                    <ybc::Control>
                        <ybc::Select name={"category"} value=category.name.clone() update=self.link.callback(|c| Msg::UpdateCategory(c))>
                        {
                            for self.categories.iter().map(|c| {
                                html!( <option selected={ category.name == c.name } >{c.name.clone()}</option> )
                            })
                        }
                        </ybc::Select>
                    </ybc::Control>
                </ybc::Field>
                <ybc::Field>
                    <ybc::Control>
                        <ybc::Button classes={classes!("is-success")} onclick=self.link.callback(|_| Msg::Submit)>
                            {"Submit"}
                        </ybc::Button>
                    </ybc::Control>
                </ybc::Field>
                { error_banner }
            </ybc::Box>
            </>
        )

    }
}
