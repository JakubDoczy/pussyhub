use shared_lib::token_validation::Role;
use yew::prelude::*;
use yew_router::agent::{RouteAgentDispatcher, RouteRequest};
use yew_router::prelude::{Route, RouteService};
use yew_router::Switch;
use yewdux::prelude::*;
use yewtil::NeqAssign;
use crate::routes::AppRoute;
use crate::{State, user_info};

pub enum Msg {
    GoToMenu(AppRoute),
}

pub struct Nav {
    dispatch: DispatchProps<BasicStore<State>>,
    link: ComponentLink<Self>,
    route_dispatcher: RouteAgentDispatcher,
    route_service: RouteService,
    target_route: Option<AppRoute>,
}

impl Component for Nav {
    type Message = Msg;
    type Properties = DispatchProps<BasicStore<State>>;

    fn create(dispatch: Self::Properties, link: ComponentLink<Self>) -> Self {
        Self {
            dispatch,
            link,
            route_dispatcher: RouteAgentDispatcher::new(),
            route_service: RouteService::new(),
            target_route: None
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::GoToMenu(route) => {
                self.target_route = Some(route.clone());
                self.route_dispatcher
                    .send(RouteRequest::ChangeRoute(route.into()));
            }
        }
        true
    }

    fn change(&mut self, dispatch: Self::Properties) -> ShouldRender {
        self.dispatch.neq_assign(dispatch)
    }

    fn view(&self) -> Html {

        let is_active = |route: AppRoute| -> &str {

            let mut curr_route = self.target_route.clone();
            if curr_route.is_none() {
                let curr_path = self.route_service.get_route().route;
                curr_route = AppRoute::switch(Route::new_no_state(curr_path));
            }

            if let Some(curr_route) = curr_route {
                if curr_route == route {
                    return "is-active";
                }
            }
            ""
        };

        let admin_menu = if user_info().role == Role::Admin {
            html!(
                <>
                    <p class="menu-label">
                      {"Admin"}
                    </p>
                    <ul class="menu-list">
                      <li><a onclick={self.link.callback(|_| Msg::GoToMenu(AppRoute::EditCategories))} class={ is_active(AppRoute::EditCategories) }><i class="fas fa-edit"></i> {" Categories"}</a></li>
                    </ul>
                </>
            )} else {
                html!()
            };

        return html! {
            <div class="menu">
                <p class="menu-label">
                  {"Navigation"}
                </p>
                <ul class="menu-list">
                  <li class="is-right"><a onclick={self.link.callback(|_| Msg::GoToMenu(AppRoute::Home))} class={ is_active(AppRoute::Home) }><i class="fas fa-cat"></i> {" Home"}</a></li>
                  <li><a onclick={self.link.callback(|_| Msg::GoToMenu(AppRoute::Livestreams))} class={ is_active(AppRoute::Livestreams) }><i class="fas fa-satellite-dish"></i> {" Livestreams"}</a></li>
                  <li><a onclick={self.link.callback(|_| Msg::GoToMenu(AppRoute::Videos))} class={ is_active(AppRoute::Videos) }><i class="fas fa-video"></i> {" Videos"}</a></li>
                </ul>
                { admin_menu }
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
