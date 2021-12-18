use wasm_bindgen::prelude::*;
use web_sys::{console, Document, Element ,HtmlElement, Node,Window};


use yew::{Component, ComponentLink, Properties, Html, html, ShouldRender};

#[derive(Properties, Clone)]
pub struct Props {
    pub src: String
}

pub struct Video {
    link: ComponentLink<Self>,
    video_source_url: String,
    video_player: Option<fluidPlayer>
}

impl Component for Video {
    type Message = ();
    type Properties = Props;

    fn create(props: Self::Properties, link: ComponentLink<Self>) -> Self {
        Self {
            link,
            video_source_url: props.src,
            video_player: None
        }
    }

    fn update(&mut self, _msg: Self::Message) -> bool { false }

    fn change(&mut self, _props: Self::Properties) -> ShouldRender { true }

    fn view(&self) -> Html {
        html!(
            <video id={"phVideoPlayer"}>
                <source src={self.video_source_url.clone()} type="application/x-mpegURL"/>
            </video>
        )
    }

    fn rendered(&mut self, _first_render: bool) {
        //playVideo("phVideoPlayer", self.video_source_url.as_str());
        // let window = web_sys::window().expect("no global `window` exists");
        // let document = window.document().expect("should have a document on window");
        // let el = document
        //     .get_element_by_id("phVideoPlayer")
        //     .expect("#resultField should exist");
        // self.video_player.loadSource(self.video_source_url.clone());
        // self.video_player.attachMedia(el);
        //self.video_player.play("phVideoPlayer", self.video_source_url.as_str())
        self.video_player = Some(fluidPlayer::new("phVideoPlayer"));
    }
}

#[wasm_bindgen(module = "/src/static/fluidplayer.js")]
extern "C" {
    type fluidPlayer;
    #[wasm_bindgen(constructor, js_name = "fluidPlayer")]
    fn new(element_id: &str) -> fluidPlayer;
}

// #[wasm_bindgen(module = "/src/static/hls.js")]
// extern "C" {
//     #[wasm_bindgen]
//     fn playVideo(element_id: &str, video_source_url: &str);
// }



