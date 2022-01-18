use yew::prelude::*;

pub struct Livestreams {}

impl Component for Livestreams {
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
                <h3 class="title is-3">{"Live streams "}<i class="fas fa-satellite-dish has-text-danger"></i></h3>
                <div class="box">
                    <p class="title">{"One"}</p>
                </div>
                <div class="tile is-ancestor">
                  <div class="tile is-4 is-vertical is-parent">
                    <div class="tile is-child box">
                      <p class="title">{"Three"}</p>
                    </div>
                    <div class="tile is-child box">
                      <p class="title">{"Four"}</p>
                    </div>
                  </div>
                  <div class="tile is-parent">
                    <div class="tile is-child box">
                      <p class="title">{"Two"}</p>
                    </div>
                  </div>
                </div>

            </>
        );
    }
}
