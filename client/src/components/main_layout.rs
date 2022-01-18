use yew::prelude::*;
use yewdux::prelude::*;
use yewtil::NeqAssign;
use crate::components::navigation::Nav;
use crate::State;

#[derive(Properties, Clone, PartialEq)]
pub struct Props {
    #[prop_or_default]
    pub dispatch: DispatchProps<BasicStore<State>>,
    #[prop_or_default]
    pub children: Children,
}

impl DispatchPropsMut for Props {
    type Store = BasicStore<State>;

    fn dispatch(&mut self) -> &mut DispatchProps<Self::Store> {
        &mut self.dispatch
    }
}

pub type MainLayout = WithDispatch<MainLayoutBase>;

pub struct MainLayoutBase {
    props: Props
}

impl Component for MainLayoutBase {
    type Message = ();
    type Properties = Props;

    fn create(props: Self::Properties, _link: ComponentLink<Self>) -> Self {
        Self { props }
    }

    fn update(&mut self, _msg: Self::Message) -> ShouldRender { false }

    fn change(&mut self, props: Self::Properties) -> ShouldRender {
        self.props.neq_assign(props)
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
