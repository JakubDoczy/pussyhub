use gloo::console::debug;
use shared_lib::payload::rating::RatingResponse;
use shared_lib::payload::user::GetUserResponse;
use shared_lib::payload::stream::GetStreamResponse;
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
    GetStreamResult(Result<GetStreamResponse, requests::Error>),
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

pub type Stream = WithDispatch<StreamBase>;

pub struct StreamBase {
    link: ComponentLink<Self>,
    props: Props,
    stream: Option<GetStreamResponse>,
    creator: Option<GetUserResponse>,
}

impl Component for StreamBase {
    type Message = Msg;
    type Properties = Props;

    fn create(props: Self::Properties, link: ComponentLink<Self>) -> Self {
        link.send_future(async move {
            let response = request_get::<GetStreamResponse>(format!("/streams/{}", props.id.clone())).await;
            Msg::GetStreamResult(response)
        });
        spawn_local(async move{
            match request_get::<bool>(format!("/streams/{}/view", props.id.clone())).await {
                Ok(_) => {}
                Err(err) => debug!(err)
            };
        });
        Self {
            link,
            props,
            stream: None,
            creator: None
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::GetStreamResult(result) => {
                match result {
                    Ok(mut stream) => {
                        self.link.send_future(async move {
                            let response = request_get::<GetUserResponse>(format!("/users/{}", stream.creator_id.clone())).await;
                            Msg::GetUserResult(response)
                        });
                        stream.views += 1;
                        self.stream = Some(stream)
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
                if let Some(stream) = self.stream.as_mut() {
                    let id = stream.id.clone();
                    spawn_local(async move {
                        match request_post::<(),RatingResponse>(format!("/streams/{}/like", id), ()).await {
                            Ok(_) => {}
                            Err(err) => debug!(err)
                        };
                    });
                    match stream.rating.clone() {
                        None => { stream.rating = Some(1); stream.likes += 1 },
                        Some(1) => { stream.rating = None; stream.likes -= 1 },
                        Some(_) => { stream.rating = Some(1); stream.likes += 1; stream.dislikes -= 1 }
                    }
                }
            }
            Msg::DislikeClicked => {
                if let Some(stream) = self.stream.as_mut() {
                    let id = stream.id.clone();
                    spawn_local(async move {
                        match request_post::<(),RatingResponse>(format!("/streams/{}/dislike", id), ()).await {
                            Ok(_) => {}
                            Err(err) => debug!(err)
                        };
                    });
                    match stream.rating.clone() {
                        None => { stream.rating = Some(-1); stream.dislikes += 1 },
                        Some(-1) => { stream.rating = None; stream.dislikes -= 1 },
                        Some(_) => { stream.rating = Some(-1); stream.dislikes += 1; stream.likes -= 1 }
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

        if self.stream.is_none() || self.creator.is_none() {
            return html!();
        }

        let creator = self.creator.clone().unwrap();
        let stream = self.stream.clone().unwrap();

        let is_like = match stream.rating {
            None => false,
            Some(r) => r == 1
        };

        let is_dislike = match stream.rating {
            None => false,
            Some(r) => r == -1
        };

        return html!(
            <>
            <h1> { stream.name} </h1>
            <VideoPlayer src={stream.stream_url} thumbnail_url={stream.preview_url} />

            <div class="columns">
            <div class="column is-narrow"><p>{"created by: "}{creator.username.clone()}<br />{" views: "} {stream.views}</p></div>
            <div class="column"></div>
            <div class={"column is-narrow field has-addons"}>
              <p class={"control"}>
                <button class={"button"} onclick={self.link.callback(|_| Msg::LikeClicked)}>
                  <span class={"icon is-small"}>
                    {if is_like { html!(<i class={"fas fa-thumbs-up"}></i>) } else { html!(<i class={"far fa-thumbs-up"}></i>) }}
                  </span>
                  <span>{stream.likes}</span>
                </button>
              </p>
              <p class={"control"}>
                <button class={"button"} onclick={self.link.callback(|_| Msg::DislikeClicked)}>
                  <span class={"icon is-small"}>
                    {if is_dislike { html!(<i class={"fas fa-thumbs-down"}></i>) } else { html!(<i class={"far fa-thumbs-down"}></i>) }}
                  </span>
                  <span>{stream.dislikes}</span>
                </button>
              </p>
            </div>
            </div>
            </>
        );
    }
}

