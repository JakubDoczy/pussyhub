use yew::prelude::*;
use yewtil::NeqAssign;
use crate::components::navigation::Nav;

#[derive(Properties, Clone)]
pub struct Props {
    #[prop_or_default]
    pub children: Children,
}

pub struct MainLayout {
    props: Props
}

impl Component for MainLayout {
    type Message = ();
    type Properties = Props;

    fn create(props: Self::Properties, _link: ComponentLink<Self>) -> Self {
        Self { props }
    }

    fn update(&mut self, _msg: Self::Message) -> ShouldRender { false }

    fn change(&mut self, props: Self::Properties) -> ShouldRender {
        self.props.children.neq_assign(props.children)
    }

    fn view(&self) -> Html {
        return html!(
            <div class="columns">
                <div class="column is-3">
                    <aside class="is-medium menu">
                        <Nav />
                    </aside>
                </div>
                <div class="column is-9">
                    <main class="content is-medium">
                        { for self.props.children.iter() }
                    </main>
                </div>
            </div>
        );
    }
}
