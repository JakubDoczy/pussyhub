use yew::{html, Component, ComponentLink, Html, ShouldRender};
use yew_router::prelude::*;
use yew_router::Switch;
use yewdux::prelude::*;
use yewtil::NeqAssign;

use crate::components::home::Home;
use crate::components::login::Login;
use crate::components::register::Register;
use crate::components::email_confirmation::EmailConfirmation;
use crate::components::main_layout::MainLayout;
use crate::State;

pub struct AppRouter {
    dispatch: DispatchProps<BasicStore<State>>,
}

impl Component for AppRouter {
    type Message = ();
    type Properties = DispatchProps<BasicStore<State>>;

    fn create(dispatch: Self::Properties, _link: ComponentLink<Self>) -> Self {
        Self { dispatch }
    }

    fn update(&mut self, _msg: Self::Message) -> ShouldRender {
        true
    }

    fn change(&mut self, dispatch: Self::Properties) -> ShouldRender {
        self.dispatch.neq_assign(dispatch)
    }

    fn view(&self) -> Html {
        html!(
            <Router<AppRoute, ()>
                render=Router::render(|switch: AppRoute| {
                    match switch {
                        AppRoute::Home => html! { <MainLayout> <Home /> </MainLayout> },
                        AppRoute::PageNotFound => html! { <h1> {"Page not found"} </h1> },
                        AppRoute::Login => html! { <WithDispatch<Login> /> },
                        AppRoute::Register => html! { <WithDispatch<Register> />  },
                        AppRoute::EmailConfirmation(token) => html! { <EmailConfirmation confirmation_token={token.clone()} /> }
                    }
                })
            />
        )
    }
}

#[derive(Debug, Clone, Switch)]
pub enum AppRoute {
    #[to = "/login"]
    Login,
    #[to = "/register"]
    Register,
    #[to = "/email_confirmation/{confirmation_token}"]
    EmailConfirmation(String),
    #[to = "/page-not-found"]
    PageNotFound,
    #[to = "/!"]
    Home,
}

pub(crate) type AppAnchor = RouterAnchor<AppRoute>;
