use crate::components::video_player::Video;
use yew::prelude::*;

pub struct Videos {}

impl Component for Videos {
    type Message = ();
    type Properties = ();

    fn create(_props: Self::Properties, _link: ComponentLink<Self>) -> Self {
        Self {}
    }

    fn update(&mut self, _msg: Self::Message) -> ShouldRender {
        false
    }

    fn change(&mut self, _props: Self::Properties) -> ShouldRender {
        false
    }

    fn view(&self) -> Html {
        return html!(
            <>
                <h3 class="title is-3">{"Trending videos "}<i class="fab fa-hotjar has-text-warning"></i></h3>
                  <div class="columns">
                    <div class="column is-6">
                        <div class="box">
                          <p class="title">{"Two"}</p>
                          <Video src={"https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8"} />
                        </div>
                    </div>
                    <div class="column">
                        <div class="box">
                          <p class="title">{"Two"}</p>
                          <Video src={""} />
                        </div>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column is-6">
                        <div class="box">
                          <p class="title">{"Two"}</p>
                          <Video src={""} />
                        </div>
                    </div>
                    <div class="column">
                        <div class="box">
                          <p class="title">{"Two"}</p>
                          <Video src={""} />
                        </div>
                    </div>
                  </div>

            </>
        );
    }
}
