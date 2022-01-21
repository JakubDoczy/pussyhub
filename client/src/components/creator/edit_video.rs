use gloo::console::debug;
use shared_lib::payload::category::{CategoryResponse, GetCategoriesResponse};
use shared_lib::payload::video::{GetVideoResponse, PostVideoRequest, PostVideoResponse, PutVideoRequest, PutVideoResponse, VideoRequest};
use crate::services::auth::user_info;
use yew::prelude::*;
use ybc::InputType;
use yew_router::agent::RouteRequest;
use yew_router::prelude::*;

use yewtil::future::LinkFuture;
use yewtil::NeqAssign;
use crate::routes::AppRoute;
use crate::services::requests;
use crate::services::requests::{request_get, request_post, request_put};

#[derive(Properties, Clone, PartialEq)]
pub struct Props {
    #[prop_or_default]
    pub video_id: Option<i64>,
}

pub enum Msg {
    LoadCategories(Result<GetCategoriesResponse, requests::Error>),
    LoadVideo(Result<GetVideoResponse, requests::Error>),
    UpdateName(String),
    UpdateVideoUrl(String),
    UpdatePreviewUrl(String),
    UpdateCategory(String),
    Submit,
    SubmitResult(Result<PostVideoResponse, requests::Error>),
}

pub struct EditVideo {
    name: String,
    video_url: String,
    preview_url: String,
    category: Option<CategoryResponse>,
    error_info: Option<String>,
    categories: Vec<CategoryResponse>,
    route_dispatcher: RouteAgentDispatcher,
    link: ComponentLink<Self>,
    props: Props
}

impl Component for EditVideo {
    type Message = Msg;
    type Properties = Props;

    fn create(props: Self::Properties, link: ComponentLink<Self>) -> Self {
        if props.video_id.is_some() {
            link.send_future(async move{
                let id = props.video_id.unwrap().clone();
                let response = request_get::<GetVideoResponse>(format!("/videos/{}", id)).await;
                Msg::LoadVideo(response)
            })
        }
        link.send_future(async{
            let response = request_get::<GetCategoriesResponse>("/categories".to_string()).await;
            Msg::LoadCategories(response)
        });

        Self {
            name: String::new(),
            video_url: String::new(),
            preview_url: String::new(),
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
            Msg::UpdateVideoUrl(s) => {
                self.video_url = s;
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

                let payload = VideoRequest {
                    creator_id: user_info().user_id,
                    name: self.name.clone(),
                    preview_url: self.preview_url.clone(),
                    video_url: self.video_url.clone(),
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

                let video_id = self.props.video_id.clone();
                self.link.send_future(async move {
                    let res = match video_id {
                        Some(id) => {
                            request_put::<PutVideoRequest, PutVideoResponse>(format!("/videos/{}",id), payload).await
                        },
                        None => {
                            request_post::<PostVideoRequest, PostVideoResponse>("/videos".to_string(),payload).await
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
                        self.video_url = String::new();
                        self.preview_url = String::new();
                        self.category = None;
                        self.route_dispatcher
                            .send(RouteRequest::ChangeRoute(AppRoute::CreatorVideos.into()));
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
            Msg::LoadVideo(response) => {
                match response {
                    Ok(video) => {
                        self.name = video.name;
                        self.video_url = video.video_url;
                        self.preview_url = video.preview_url;
                        self.category = Some(video.category);
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

        html!(
            <>
            <h1 class="title">{if self.props.video_id.is_some() {"Edit video"} else {"Upload video"} }</h1>
            <ybc::Box>
                <ybc::Field>
                    <label class={"label"}>{"Video title"}</label>
                    <ybc::Control>
                        <ybc::Input name={"name"} value=self.name.clone() update=self.link.callback(|s| Msg::UpdateName(s)) r#type=InputType::Text placeholder={"Video title"} />
                    </ybc::Control>
                </ybc::Field>
                <ybc::Field>
                    <label class={"label"}>{"Video URL"}</label>
                    <ybc::Control>
                        <ybc::Input name={"video_url"} value=self.video_url.clone() update=self.link.callback(|s| Msg::UpdateVideoUrl(s)) r#type=InputType::Text placeholder={"Video URL"} />
                    </ybc::Control>
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
