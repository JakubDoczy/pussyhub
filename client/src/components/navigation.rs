use yew::prelude::*;
use yew_router::agent::{RouteAgentDispatcher, RouteRequest};
use crate::routes::AppRoute;

pub enum Msg {
    GoToMenu(AppRoute),
}

pub struct Nav {
    link: ComponentLink<Self>,
    route_dispatcher: RouteAgentDispatcher,
}

impl Component for Nav {
    type Message = Msg;
    type Properties = ();

    fn create(_props: Self::Properties, link: ComponentLink<Self>) -> Self {
        Self {
            link,
            route_dispatcher: RouteAgentDispatcher::new(),
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::GoToMenu(route) => {
                self.route_dispatcher
                    .send(RouteRequest::ChangeRoute(route.into()));
            }
        }
        true
    }

    fn change(&mut self, _props: Self::Properties) -> ShouldRender {
        false
    }

    fn view(&self) -> Html {

        return html! {
            <div class="menu">
                <p class="menu-label">
                  {"Recommended"}
                </p>
                <ul class="menu-list">
                  <li class="is-right"><a onclick={self.link.callback(|_| Msg::GoToMenu(AppRoute::Home))} class="is-active"><i class="fab fa-css3-alt"></i> {"Home"}</a></li>
                  <li><a onclick={self.link.callback(|_| Msg::GoToMenu(AppRoute::LoginDemo))}><i class="fab fa-js"></i> {" Login Demo"}</a></li>
                  <li><a onclick={self.link.callback(|_| Msg::GoToMenu(AppRoute::Home))}><i class="fab fa-html5"></i> {" Belle Ralphine"}</a></li>
                </ul>
                <p class="menu-label">
                  {"Categories"}
                </p>
                <ul class="menu-list">
                  <li><span class="tag is-white is-medium">{"Lorem"}</span></li>
                  <li><span class="tag is-white is-medium">{"Ipsum"}</span></li>
                  <li><span class="tag is-white is-medium">{"Dolor"}</span></li>
                  <li><span class="tag is-white is-medium">{"Animi"}</span></li>
                  <li><span class="tag is-white is-medium">{"Eximi"}</span></li>
                </ul>
            </div>
        };
    }
}
