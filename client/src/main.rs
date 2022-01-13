mod components;
mod services;
use crate::components::home::Home;
use crate::components::login_demo::LoginDemo;

use yew::{classes, html, Component, ComponentLink, Html, ShouldRender};
use yew_router::{
    agent::{RouteAgentDispatcher, RouteRequest},
    router::Router,
    Switch,
};

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
        /*
        let go_to_theme_icon = if !self.dark_theme {
            IconName::Flash
        } else {
            IconName::Moon
        }; */

        html!{
            <>
                <section class="hero is-link">
                    <div class="hero-body">
                        <div class="container content">
                            <div class="columns">
                                <div class="column is-8">
                                    <img src="cat.svg" style="max-width: 18%;" />
                                    <h1 class="title">{"PussyHub"}</h1>
                                    <h3 class="subtitle">{"Cute pussy videos for your lonely time"}</h3>
                                </div>
                                <div class="column">
                                   <div style="display: flex; justify-content: flex-end; flex-direction: column; height: 100%;">
                                       <div class="buttons" style="margin-bottom: 0.666em;">
                                           <a class="button is-primary">
                                             <strong>{"Sign up"}</strong>
                                           </a>
                                           <a class="button is-light">
                                             {"Log in"}
                                           </a>
                                       </div>
                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="section">
                    <div class="container">
                        <div class="columns">
                            <div class="column is-3">
                                <aside class="is-medium menu">
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
                                </aside>
                            </div>
                            <div class="column is-9">
                                <main class="content is-medium">
                                    <Router<AppRoute, ()>
                                        render=Router::render(|switch: AppRoute| {
                                            match switch {
                                                AppRoute::LoginDemo => html! { <LoginDemo /> },
                                                AppRoute::Home => html! { <Home /> },
                                                AppRoute::PageNotFound => html! { <h1> {"Page not found"} </h1> }
                                            }
                                        })
                                    />
                                </main>
                            </div>
                        </div>
                    </div>
                </section>
                <footer class="footer">
                    <section class="section">
                        <div class="container">
                            <div class="columns is-multiline">
                                <div class="column is-one-third">
                                    <article class="notification media has-background-white">
                                        <figure class="media-left">
                                            <span class="icon">
                                              <i class="fab fa-github fa-lg"></i>
                                            </span>
                                        </figure>
                                        <a href="https://github.com/JakubDoczy/pussyhub" target="_blank" class="content" style="text-decoration: none;">
                                            <h1 class="title is-size-4">{"Github"}</h1>
                                            <p class="is-size-5 subtitle">
                                              {"view the sourcecode"}
                                            </p>
                                        </a>
                                    </article>
                                </div>
                                <div class="column is-one-third">
                                    <article class="notification has-background-white media">
                                        <figure class="media-left">
                                            <span class="icon">
                                                <img src="https://is.muni.cz/pics/design/r6/loga/1433.svg" />
                                            </span>
                                        </figure>
                                        <a href="https://www.fi.muni.cz/about" target="_blank" class="content" style="text-decoration: none;">
                                            <h1 class="title is-size-4">{"FI MUNI"}</h1>
                                            <p class="is-size-5 subtitle">
                                                {"crated at Masaryk University,"}
                                                <br/>
                                                {"Faculty of Informatics"}
                                            </p>
                                        </a>
                                    </article>
                                </div>
                                <div class="column is-one-third">
                                    <article class="notification has-background-white media">
                                        <figure class="media-left">
                                            <span class="icon">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Rust_programming_language_black_logo.svg" />
                                            </span>
                                        </figure>
                                        <a href="https://www.fi.muni.cz/about" target="_blank" class="content" style="text-decoration: none;">
                                            <h1 class="title is-size-4">{"Rust"}</h1>
                                            <p class="is-size-5 subtitle">
                                              {"built with <3, using Rust"}
                                            </p>
                                        </a>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </section>
                    /*
                    <hr />
                    <div class="columns is-mobile is-centered">
                      <div class="field is-grouped is-grouped-multiline">
                        <div class="control">
                          <div class="tags has-addons"><a class="tag is-link" href="https://github.com/BulmaTemplates/bulma-templates">{"Bulma Templates"}</a>
                          <span class="tag is-info">{"MIT license"}</span>
                        </div>
                      </div>
                      <div class="control">
                        <div class="tags has-addons">
                          <span class="tag is-dark">{"based on a pen"}</span>
                          <span class="tag has-addons is-warning"><a href="https://codepen.io/melanieseltzer/pen/odOXWM"><i class="fab fa-lg fa-codepen"></i></a></span>
                        </div>
                      </div>
                    </div>
                    </div> */
               </footer>
            </>
        }
    }
}

#[derive(Debug, Copy, Clone, Switch)]
pub enum AppRoute {
    #[to = "/login-demo"]
    LoginDemo,
    #[to = "/page-not-found"]
    PageNotFound,
    #[to = "/!"]
    Home,
}

fn main() {
    yew::start_app::<App>();
}
