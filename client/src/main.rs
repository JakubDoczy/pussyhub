mod components;
mod services;
mod routes;


use crate::components::header::Header;
use crate::components::footer::Footer;

use yew::{html, Component, ComponentLink, Html, ShouldRender};

use yewdux::prelude::*;
use yewtil::NeqAssign;
use crate::services::auth::{is_auth, user_info};
use crate::routes::AppRouter;

#[derive(Clone)]
pub struct State {
    is_auth: bool,
}

impl Default for State {
    fn default() -> Self {
        Self { is_auth: is_auth() }
    }
}

pub struct App {
    dispatch: DispatchProps<BasicStore<State>>,
}

impl Component for App {
    type Message = ();
    type Properties = DispatchProps<BasicStore<State>>;

    fn create(dispatch: Self::Properties, _link: ComponentLink<Self>) -> Self {
        Self { dispatch }
    }

    fn update(&mut self, _msg: Self::Message) -> ShouldRender { false }

    fn change(&mut self, dispatch: Self::Properties) -> ShouldRender {
        self.dispatch.neq_assign(dispatch)
    }

    fn view(&self) -> Html {
        html!(
            <>
                <WithDispatch<Header>/>
                <section class="section" style="flex-grow: 1;">
                    <div class="container">
                        <WithDispatch<AppRouter> />
                    </div>
                </section>
                <Footer />
            </>
        )
    }
}

fn main() {
    yew::start_app::<WithDispatch<App>>();
}
