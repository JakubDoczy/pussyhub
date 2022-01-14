use yew::prelude::*;

#[derive(Properties, Clone)]
pub struct Props {
    #[prop_or_default]
    pub children: Children,
}

pub struct PlainLayout {
    props: Props
}

impl Component for PlainLayout {
    type Message = ();
    type Properties = Props;

    fn create(props: Self::Properties, _link: ComponentLink<Self>) -> Self {
        Self { props }
    }

    fn update(&mut self, _msg: Self::Message) -> ShouldRender { false }

    fn change(&mut self, _props: Self::Properties) -> ShouldRender {
        false
    }

    fn view(&self) -> Html {
        html!(
            <div class="container is-widescreen">
                <main class="content is-medium">
                    { for self.props.children.iter() }
                </main>
            </div>
        )
    }
}
