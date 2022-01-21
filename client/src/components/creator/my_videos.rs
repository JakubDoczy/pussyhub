use std::cmp::Reverse;
use gloo::console::debug;
use shared_lib::payload::video::GetVideos;
use yew::prelude::*;
use yewtil::future::LinkFuture;
use crate::services::requests;
use crate::services::requests::{request_delete, request_get};
use crate::routes::{AppAnchor, AppRoute};
use crate::user_info;

pub enum Msg {
    GetVideos,
    GetVideosResult(Result<GetVideos, requests::Error>),
    DeleteVideo(i64),
    DeleteVideoResult(Result<String, requests::Error>)
}

pub struct MyVideos {
    videos: Option<GetVideos>,
    link: ComponentLink<Self>
}

impl Component for MyVideos {
    type Message = Msg;
    type Properties = ();

    fn create(_props: Self::Properties, link: ComponentLink<Self>) -> Self {
        link.send_message(Msg::GetVideos);
        Self {
            videos: None,
            link
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::GetVideos => {
                self.link.send_future(async {
                    let response = request_get::<GetVideos>(format!("/users/{}/videos", user_info().user_id)).await;
                    Msg::GetVideosResult(response)
                })
            }
            Msg::GetVideosResult(result) => {
                match result {
                    Ok(mut videos) => {
                        videos.sort_by_key(|v| Reverse(v.created_at.clone()));
                        self.videos = Some(videos);
                    },
                    Err(err) => debug!(err)
                }
            }
            Msg::DeleteVideo(id) => {
                if gloo_dialogs::confirm("Confirm video deletion.") {
                    self.link.send_future(async move {
                        let response = request_delete::<String>(format!("/videos/{}", id)).await;
                        Msg::DeleteVideoResult(response)
                    });
                }
            }
            Msg::DeleteVideoResult(result) => {
                match result {
                    Ok(_) => self.link.send_message(Msg::GetVideos),
                    Err(err) => debug!(err)
                };
            }
        }
        true
    }

    fn change(&mut self, _props: Self::Properties) -> ShouldRender {
        false
    }

    fn view(&self) -> Html {
        match self.videos.clone() {
            Some(videos) => {
                 html!(
                     <>
                     <h3 class={"title is-3"}>{"My videos"}</h3>

                     <div class="block">
                         <AppAnchor classes="button is-primary" route=AppRoute::UploadVideo>{"Upload new"}</AppAnchor>
                         <AppAnchor classes="button is-primary" route=AppRoute::StartStream>{"Start stream"}</AppAnchor>
                     </div>
                     <div>
                     {
                         for videos.into_iter().map(|video|
                         {
                             html!(
                             <div class="block">
                                 <div class={"box columns"}>
                                     <div class="column">
                                         <div class={"title"}>
                                             {video.name.clone()}
                                         </div>
                                         <div class="content">
                                             {"views: "}{video.views}<br />
                                             {"likes: "}{video.likes}<br />
                                             {"dislikes: "}{video.dislikes}<br />
                                             {"created: "}{video.created_at.clone()}<br />
                                             {"category: "}{video.category.name.clone()}<br />
                                         </div>
                                         <div class="buttons">
                                             <AppAnchor classes="button is-primary" route=AppRoute::EditVideo(video.id.clone())>{"edit"}</AppAnchor>
                                             <button class="button is-danger" onclick={self.link.callback(move |_| Msg::DeleteVideo(video.id.clone()))}>{"delete"}</button>
                                         </div>
                                     </div>
                                     <div class="column">
                                         <img src={video.preview_url.clone()} />
                                     </div>
                                 </div>
                             </div>
                             )
                         })
                     }
                     </div>
                     </>
                 )
            },
            None => html!()
        }
    }
}