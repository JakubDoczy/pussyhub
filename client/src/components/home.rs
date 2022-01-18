use yew::prelude::*;

pub struct Home {
    hls_root: &'static str,
}

impl Component for Home {
    type Message = ();
    type Properties = ();

    fn create(_props: Self::Properties, _link: ComponentLink<Self>) -> Self {
        Self {
            hls_root: "http://localhost:8080",
        }
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
                <h1> {"Welcome 💦"} </h1>
                <p>{"PussyHub is a community place where you can share pussy cat videos to the world. Upload moments with your kitties to brighten the day of other wanderers that end up on this site. If you are feeling super fancy, start a stream and share your happy me time live."}</p>
            </>
        );
    }
}
