use gloo::console::debug;
use shared_lib::payload::video::GetVideos;
use yew::prelude::*;
use yewtil::future::LinkFuture;
use crate::services::requests;
use crate::services::requests::request_get;
use crate::routes::{AppAnchor, AppRoute};

pub enum Msg {
    GetVideosResult(Result<GetVideos, requests::Error>),
}

pub struct Videos {
    videos: GetVideos,
}

impl Component for Videos {
    type Message = Msg;
    type Properties = ();

    fn create(_props: Self::Properties, link: ComponentLink<Self>) -> Self {
        link.send_future(async {
            let response = request_get::<GetVideos>("/videos".to_string()).await;
            Msg::GetVideosResult(response)
        });
        Self {
            videos: GetVideos::new(),
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::GetVideosResult(result) => {
                match result {
                    Ok(videos) => self.videos = videos,
                    Err(err) => debug!(err)
                }
            }
        }
        true
    }

    fn change(&mut self, _props: Self::Properties) -> ShouldRender {
        false
    }

    fn view(&self) -> Html {
        return html!(
            <>
            <h3 class={"title is-3"}>{"Trending videos "}<i class={"fab fa-hotjar has-text-warning"}></i></h3>
            <div class={"columns"}>
            {
                for self.videos.iter().map(|video|
                {
                    html!(
                    <div class={"column is-6"}>
                        <AppAnchor route=AppRoute::WatchVideo(video.id)>
                        <div class={"box"}>
                            <span class={"title"}>
                                {video.name.clone()}
                            </span>
                            <div class="ph-video-icons-container">
                                <span class="icon-text">
                                    <span class="icon">
                                        <i class="far fa-play-circle"></i>
                                    </span>
                                    <span>{video.views}</span>
                                </span>
                                <span class="icon-text">
                                    <span class="icon">
                                        <i class="far fa-thumbs-up"></i>
                                    </span>
                                    <span>{video.likes}</span>
                                </span>
                                <span class="icon-text">
                                    <span class="icon">
                                        <i class="far fa-thumbs-down"></i>
                                    </span>
                                    <span>{video.dislikes}</span>
                                </span>
                            </div>
                            <img src={video.preview_url.clone()} />
                        </div>
                        </AppAnchor>
                    </div>
                    )
                })
            }
            </div>
            </>
        );
    }
}
