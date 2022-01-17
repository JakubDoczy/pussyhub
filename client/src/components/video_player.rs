use wasm_bindgen::prelude::*;
use uuid::Uuid;
use yew::{html, Component, ComponentLink, Html, Properties, ShouldRender};

#[derive(Properties, Clone)]
pub struct Props {
    pub src: String,
}

pub struct Video {
    video_source_url: String,
    element_id: String
}

impl Component for Video {
    type Message = ();
    type Properties = Props;

    fn create(props: Self::Properties, _link: ComponentLink<Self>) -> Self {
        Self {
            video_source_url: props.src,
            element_id: format!("video-{}", Uuid::new_v4())
        }
    }

    fn update(&mut self, _msg: Self::Message) -> bool {
        false
    }

    fn change(&mut self, _props: Self::Properties) -> ShouldRender {
        false
    }

    fn view(&self) -> Html {
        html!(
            <video-js id={self.element_id.clone()} class="video-js vjs-theme-ph" />
        )
    }

    fn rendered(&mut self, _first_render: bool) {
        playVideo(self.element_id.as_str(), self.video_source_url.as_str(), "/cat.svg");
    }
}

#[wasm_bindgen(module = "/src/static/videoPlayer.js")]
extern "C" {
    #[wasm_bindgen]
    fn playVideo(element_id: &str, source_url: &str, thumbnail_url: &str);
}
