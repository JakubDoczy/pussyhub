use gloo::console::debug;
use shared_lib::payload::user::GetUserResponse;
use shared_lib::payload::video::GetVideoResponse;
use yew::prelude::*;
use yewdux::prelude::*;
use yewtil::future::LinkFuture;
use yewtil::NeqAssign;
use crate::services::requests;
use crate::services::requests::{request_get, request_post};
use crate::components::video_player::VideoPlayer;
use crate::{State};
use wasm_bindgen_futures::spawn_local;

pub enum Msg {
    GetVideoResult(Result<GetVideoResponse, requests::Error>),
    GetUserResult(Result<GetUserResponse, requests::Error>),
    LikeClicked,
    DislikeClicked
}

#[derive(Properties, Clone, PartialEq)]
pub struct Props {
    #[prop_or_default]
    pub dispatch: DispatchProps<BasicStore<State>>,
    #[prop_or_default]
    pub id: i64
}

impl DispatchPropsMut for Props {
    type Store = BasicStore<State>;

    fn dispatch(&mut self) -> &mut DispatchProps<Self::Store> {
        &mut self.dispatch
    }
}

pub type Video = WithDispatch<VideoBase>;

pub struct VideoBase {
    link: ComponentLink<Self>,
    props: Props,
    video: Option<GetVideoResponse>,
    creator: Option<GetUserResponse>,
}

impl Component for VideoBase {
    type Message = Msg;
    type Properties = Props;

    fn create(props: Self::Properties, link: ComponentLink<Self>) -> Self {
        link.send_future(async move {
            let response = request_get::<GetVideoResponse>(format!("/videos/{}", props.id.clone())).await;
            Msg::GetVideoResult(response)
        });
        Self {
            link,
            props,
            video: None,
            creator: None
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::GetVideoResult(result) => {
                match result {
                    Ok(mut video) => {
                        self.link.send_future(async move {
                            let response = request_get::<GetUserResponse>(format!("/users/{}", video.creator_id.clone())).await;
                            Msg::GetUserResult(response)
                        });
                        video.views += 1;
                        self.video = Some(video)
                    },
                    Err(err) => debug!(err)
                }
            },
            Msg::GetUserResult(result) => {
                match result {
                    Ok(user) => {
                        self.creator = Some(user)
                    },
                    Err(err) => debug!(err)
                }
            }
            Msg::LikeClicked => {
                if let Some(video) = self.video.as_mut() {
                    let id = video.id.clone();
                    let rating = video.rating.clone();
                    spawn_local(async move {
                        let should_like = match rating {
                            None | Some(-1) => true,
                            Some(_) => false
                        };
                        match request_post::<bool,()>(format!("/videos/{}/like", id), should_like).await {
                            Ok(_) => {}
                            Err(err) => debug!(err)
                        };
                    });
                    video.rating = match video.rating {
                        None | Some(-1) => Some(1),
                        Some(_) => None
                    }
                }
            }
            Msg::DislikeClicked => {
                if let Some(video) = self.video.as_mut() {
                    let id = video.id.clone();
                    let rating = video.rating.clone();
                    spawn_local(async move {
                        let should_dislike = match rating {
                            None | Some(1) => true,
                            Some(_) => false
                        };
                        match request_post::<bool,()>(format!("/videos/{}/dislike", id), should_dislike).await {
                            Ok(_) => {}
                            Err(err) => debug!(err)
                        };
                    });
                    video.rating = match video.rating {
                        None | Some(1) => Some(-1),
                        Some(_) => None
                    }
                }
            }
        }
        true
    }

    fn change(&mut self, props: Self::Properties) -> ShouldRender {
        self.props.neq_assign(props)
    }

    fn view(&self) -> Html {

        if self.video.is_none() || self.creator.is_none() {
            return html!();
        }

        let creator = self.creator.clone().unwrap();
        let video = self.video.clone().unwrap();

        let is_like = match video.rating {
            None => false,
            Some(r) => r == 1
        };

        let is_dislike = match video.rating {
            None => false,
            Some(r) => r == -1
        };

        return html!(
            <>
            <h1> { video.name} </h1>
            <VideoPlayer src={video.video_url} thumbnail_url={video.preview_url} />

            <div class="columns">
            <div class="column is-narrow"><p>{"created by: "}{creator.username.clone()}<br />{" views: "} {video.views}</p></div>
            <div class="column"></div>
            <div class={"column is-narrow field has-addons"}>
              <p class={"control"}>
                <button class={"button"} onclick={self.link.callback(|_| Msg::LikeClicked)}>
                  <span class={"icon is-small"}>
                    {if is_like { html!(<i class={"fas fa-thumbs-up"}></i>) } else { html!(<i class={"far fa-thumbs-up"}></i>) }}
                  </span>
                  <span>{video.likes}</span>
                </button>
              </p>
              <p class={"control"}>
                <button class={"button"} onclick={self.link.callback(|_| Msg::DislikeClicked)}>
                  <span class={"icon is-small"}>
                    {if is_dislike { html!(<i class={"fas fa-thumbs-down"}></i>) } else { html!(<i class={"far fa-thumbs-down"}></i>) }}
                  </span>
                  <span>{video.dislikes}</span>
                </button>
              </p>
            </div>
            </div>
            </>
        );
    }
}

