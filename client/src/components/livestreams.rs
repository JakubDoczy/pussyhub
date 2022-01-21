use std::cmp::Reverse;
use gloo::console::debug;
use shared_lib::payload::stream::GetStreams;
use yew::prelude::*;
use yewtil::future::LinkFuture;
use crate::services::requests;
use crate::services::requests::request_get;
use crate::routes::{AppAnchor, AppRoute};

pub enum Msg {
    GetStreamsResult(Result<GetStreams, requests::Error>),
}

pub struct Streams {
    streams: GetStreams,
}

impl Component for Streams {
    type Message = Msg;
    type Properties = ();

    fn create(_props: Self::Properties, link: ComponentLink<Self>) -> Self {
        link.send_future(async {
            let response = request_get::<GetStreams>("/streams".to_string()).await;
            Msg::GetStreamsResult(response)
        });
        Self {
            streams: GetStreams::new(),
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::GetStreamsResult(result) => {
                match result {
                    Ok(mut streams) => {
                        streams.sort_by_key(|v| Reverse(v.views));
                        self.streams = streams;
                    },
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
            <h3 class={"title is-3"}>{"Live streams"}<i class={"fab fa-hotjar has-text-warning"}></i></h3>
            <div class={"columns is-multiline"}>
            {
                for self.streams.iter().map(|stream|
                {
                    html!(
                    <div class={"column is-6"}>
                        <AppAnchor route=AppRoute::WatchStream(stream.id)>
                        <div class={"box"}>
                            <span class={"title"}>
                                {stream.name.clone()}
                            </span>
                            <div class="ph-stream-icons-container">
                                <span class="icon-text">
                                    <span class="icon">
                                        <i class="far fa-play-circle"></i>
                                    </span>
                                    <span>{stream.views}</span>
                                </span>
                                <span class="icon-text">
                                    <span class="icon">
                                        <i class="far fa-thumbs-up"></i>
                                    </span>
                                    <span>{stream.likes}</span>
                                </span>
                                <span class="icon-text">
                                    <span class="icon">
                                        <i class="far fa-thumbs-down"></i>
                                    </span>
                                    <span>{stream.dislikes}</span>
                                </span>
                            </div>
                            <img src={stream.preview_url.clone()} />
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
