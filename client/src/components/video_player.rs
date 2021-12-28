use wasm_bindgen::prelude::*;

use yew::{html, Component, ComponentLink, Html, Properties, ShouldRender};

#[derive(Properties, Clone)]
pub struct Props {
    pub src: String,
}

pub struct Video {
    video_source_url: String,
}

impl Component for Video {
    type Message = ();
    type Properties = Props;

    fn create(props: Self::Properties, _link: ComponentLink<Self>) -> Self {
        Self {
            video_source_url: props.src,
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
            <div id={"phVideoPlayer"}></div>
        )
    }

    fn rendered(&mut self, _first_render: bool) {
        playVideo("phVideoPlayer", self.video_source_url.as_str());
    }
}

#[wasm_bindgen(module = "/src/static/videoPlayer.js")]
extern "C" {
    #[wasm_bindgen]
    fn playVideo(element_id: &str, video_source_url: &str);
}
