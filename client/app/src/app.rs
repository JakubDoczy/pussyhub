use yew::{html, Component, Html, classes, ComponentLink, ShouldRender};
use yew_router::{
    agent::{RouteAgentDispatcher, RouteRequest},
    router::Router,
    Switch,
};
use yewprint::{IconName, Menu, MenuItem, MenuDivider};

pub struct App {
    link: ComponentLink<Self>,
    dark_theme: bool,
    route_dispatcher: RouteAgentDispatcher,
}

pub enum Msg {
    ToggleLight,
    GoToMenu(AppRoute),
}

impl Component for App {
    type Message = Msg;
    type Properties = ();

    fn create(_props: Self::Properties, link: ComponentLink<Self>) -> Self {
        App {
            dark_theme: web_sys::window()
                .and_then(|x| x.match_media("(prefers-color-scheme: dark)").ok().flatten())
                .map(|x| x.matches())
                .unwrap_or(true),
            link,
            route_dispatcher: RouteAgentDispatcher::new(),
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::ToggleLight => self.dark_theme ^= true,
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
        let go_to_theme_label = if !self.dark_theme {
            "Light theme"
        } else {
            "Dark theme"
        };
        let go_to_theme_icon = if !self.dark_theme {
            IconName::Flash
        } else {
            IconName::Moon
        };

        html! {
            <div class={classes!("ph-root", self.dark_theme.then(|| "bp3-dark"))}>
                <div class="ph-app">
                    <div class="ph-nav-wrapper">
                        <div class="ph-nav">
                            <div class="ph-nav-title">
                                <a href="/">
                                    <img src="cat.svg" class="ph-logo" />
                                </a>
                                <div>
                                    <div class={classes!("bp3-navbar-heading", "ph-heading")}>
                                        {"PussyHub"}
                                    </div>
                                    <a
                                        class="bp3-text-muted"
                                        href="https://github.com/JakubDoczy/pussyhub"
                                        target="_blank"
                                    >
                                        <small>{"View on GitHub"}</small>
                                    </a>
                                </div>
                            </div>
                            <Menu>
                                <MenuItem
                                    text={html!(go_to_theme_label)}
                                    onclick={self.link.callback(|_| Msg::ToggleLight)}
                                    icon={go_to_theme_icon}
                                />
                                <MenuDivider />
                                <MenuItem
                                    text={html!("Home")}
                                    onclick={self.link.callback(|_| Msg::GoToMenu(AppRoute::Home))}
                                />
                                <MenuItem
                                    text={html!("Test")}
                                    onclick={self.link.callback(|_| Msg::GoToMenu(AppRoute::Test(42)))}
                                />
                            </Menu>
                        </div>
                    </div>
                    <main class="ph-content-wrapper" role="main">
                        <div class="ph-page">
                            <Router<AppRoute, ()>
                                render=Router::render(|switch: AppRoute| {
                                    match switch {
                                        AppRoute::Test(n) => html! { <h1> {"Test: "} {n} </h1> },
                                        AppRoute::Home => html! { <h1> {"Home"} </h1>},
                                        AppRoute::PageNotFound => html! { <h1> {"Page not found"} </h1> }
                                    }
                                })
                            />
                        </div>
                    </main>
                </div>
            </div>
        }
    }
}

#[derive(Debug, Copy, Clone, Switch)]
pub enum AppRoute {
    #[to = "/test/{n}"]
    Test (u64),
    #[to = "/page-not-found"]
    PageNotFound,
    #[to = "/!"]
    Home,
}
