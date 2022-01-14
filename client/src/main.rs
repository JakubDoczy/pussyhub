mod components;
mod services;

use crate::components::home::Home;
use crate::components::login_demo::LoginDemo;
use crate::components::main_layout::MainLayout;
use crate::components::plain_layout::PlainLayout;
use crate::components::header::Header;
use crate::components::footer::Footer;

use yew::{html, Component, ComponentLink, Html, ShouldRender};
use yew_router::router::Router;
use yew_router::Switch;
use yewdux::prelude::*;
use yewtil::NeqAssign;
use crate::services::auth::{is_auth, user_info};


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
                <section class="section">
                    <div class="container">
                        <Router<AppRoute, ()>
                            render=Router::render(|switch: AppRoute| {
                                match switch {
                                    AppRoute::LoginDemo => html! { <LoginDemo /> },
                                    AppRoute::Home => html! { <MainLayout> <Home /> </MainLayout> },
                                    AppRoute::PageNotFound => html! { <PlainLayout> <h1> {"Page not found"} </h1> </PlainLayout> },
                                    AppRoute::Login => html! { <PlainLayout> <WithDispatch<LoginDemo> /> </PlainLayout> },
                                    AppRoute::Register => html! {}
                                }
                            })
                        />
                    </div>
                </section>
                <Footer />
            </>
        )
    }
}

#[derive(Debug, Copy, Clone, Switch)]
pub enum AppRoute {
    #[to = "/login"]
    Login,
    #[to = "/register"]
    Register,
    #[to = "/login-demo"]
    LoginDemo,
    #[to = "/page-not-found"]
    PageNotFound,
    #[to = "/!"]
    Home,
}

fn main() {
    yew::start_app::<WithDispatch<App>>();
}
