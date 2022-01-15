use yew::prelude::*;
use yewdux::prelude::*;
use yewtil::NeqAssign;
use crate::{State, user_info};
use crate::routes::{AppRoute, AppAnchor};
use crate::services::auth::{is_auth, logout};

pub enum Msg {
    Logout
}

pub struct Header {
    link: ComponentLink<Self>,
    dispatch: DispatchProps<BasicStore<State>>,
}

impl Component for Header {
    type Message = Msg;
    type Properties = DispatchProps<BasicStore<State>>;

    fn create(dispatch: Self::Properties, link: ComponentLink<Self>) -> Self {
        Self {
            link,
            dispatch
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
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
                                <AppAnchor route=AppRoute::Home>
                                   <img src="cat.svg" style="max-width: 18%;" />
                                   <h1 class="title">{"PussyHub"}</h1>
                                   <h3 class="subtitle">{"Cute pussy videos for your lonely time"}</h3>
                                </AppAnchor>
                            </div>
                            <div class="column">
                                <div style="display: flex; justify-content: flex-end; flex-direction: column; height: 100%;">
                                    <div class="buttons" style="margin-bottom: 0.666em;">
                                        {
                                            if is_auth() { html!(
                                                <>
                                                    { user.username }
                                                    <a classes="button is-light" onclick={self.link.callback(|_| Msg::Logout)}>
                                                        {"Log out"}
                                                    </a>
                                                </>
                                            )}
                                            else { html!(
                                                <>
                                                    <AppAnchor classes="button is-primary" route=AppRoute::Register>
                                                        <strong>{"Sign up"}</strong>
                                                    </AppAnchor>
                                                    <AppAnchor classes="button is-light" route=AppRoute::Login>
                                                        {"Log in"}
                                                    </AppAnchor>
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
