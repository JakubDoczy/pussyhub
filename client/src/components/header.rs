use yew::prelude::*;
use yew_router::agent::RouteRequest;
use yew_router::prelude::RouteAgentDispatcher;
use yewdux::prelude::*;
use yewtil::NeqAssign;
use crate::{AppRoute, State, user_info};
use crate::services::auth::{is_auth, logout};

pub enum Msg {
    GoTo(AppRoute),
    Logout
}

pub struct Header {
    route_dispatcher: RouteAgentDispatcher,
    link: ComponentLink<Self>,
    dispatch: DispatchProps<BasicStore<State>>,
}

impl Component for Header {
    type Message = Msg;
    type Properties = DispatchProps<BasicStore<State>>;

    fn create(dispatch: Self::Properties, link: ComponentLink<Self>) -> Self {
        Self {
            route_dispatcher: RouteAgentDispatcher::new(),
            link,
            dispatch
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::GoTo(route) => {
                self.route_dispatcher
                    .send(RouteRequest::ChangeRoute(route.into()));
            }
            Msg::Logout => {
                logout();
                self.dispatch.reduce(|s| s.is_auth = is_auth())
            }
        }
        true
    }

    fn change(&mut self, dispatch: Self::Properties) -> ShouldRender {
        self.dispatch.neq_assign(dispatch)
    }

    fn view(&self) -> Html {
        let user = user_info();
        html!(
            <section class="hero is-link">
                <div class="hero-body">
                    <div class="container content">
                        <div class="columns">
                            <div class="column is-8">
                                <a onclick={self.link.callback(|_| Msg::GoTo(AppRoute::Home))}>
                                   <img src="cat.svg" style="max-width: 18%;" />
                                   <h1 class="title">{"PussyHub"}</h1>
                                   <h3 class="subtitle">{"Cute pussy videos for your lonely time"}</h3>
                                </a>
                            </div>
                            <div class="column">
                                <div style="display: flex; justify-content: flex-end; flex-direction: column; height: 100%;">
                                    <div class="buttons" style="margin-bottom: 0.666em;">
                                        {
                                            if is_auth() { html!(
                                                <>
                                                    { user.username }
                                                    <a class="button is-light" onclick={self.link.callback(|_| Msg::Logout)}>
                                                          {"Log out"}
                                                    </a>
                                                </>
                                            )}
                                            else { html!(
                                                <>
                                                    <a class="button is-primary" onclick={self.link.callback(|_| Msg::GoTo(AppRoute::Register))}>
                                                    <strong>{"Sign up"}</strong>
                                                    </a>
                                                    <a class="button is-light" onclick={self.link.callback(|_| Msg::GoTo(AppRoute::Login))}>
                                                      {"Log in"}
                                                    </a>
                                                </>
                                            )}
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
