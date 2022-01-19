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
use crate::components::livestreams::Livestreams;
use crate::components::videos::Videos;
use crate::components::video::Video;
use crate::components::admin::categories::EditCategories;
use crate::components::creator::my_videos::MyVideos;
use crate::components::creator::edit_video::EditVideo;
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
                        AppRoute::EmailConfirmation(token) => html! { <EmailConfirmation confirmation_token={token.clone()} /> },
                        AppRoute::Livestreams => html! { <MainLayout> <Livestreams /> </MainLayout> },
                        AppRoute::Videos => html! { <MainLayout> <Videos /> </MainLayout> },
                        AppRoute::Creators => html! { <MainLayout> {"tbd"} </MainLayout> },
                        AppRoute::EditCategories => html! { <MainLayout> <EditCategories /> </MainLayout> },
                        AppRoute::WatchVideo(id) => html! { <MainLayout> <Video id={id} /> </MainLayout> },
                        AppRoute::CreatorVideos => html! { <MainLayout> <MyVideos /> </MainLayout> },
                        AppRoute::UploadVideo => html! { <MainLayout> <EditVideo /> </MainLayout> },
                        AppRoute::EditVideo(id) => html! { <MainLayout> <EditVideo video_id={id} /> </MainLayout> },

                    }
                })
            />
        )
    }
}

#[derive(Debug, Clone, Switch, PartialEq)]
pub enum AppRoute {
    #[to = "/login"]
    Login,
    #[to = "/register"]
    Register,
    #[to = "/email_confirmation/{confirmation_token}"]
    EmailConfirmation(String),
    #[to = "/livestreams"]
    Livestreams,
    #[to = "/videos"]
    Videos,
    #[to = "/creators"]
    Creators,
    #[to = "/creator/videos/upload"]
    UploadVideo,
    #[to = "/creator/videos/edit/{id}"]
    EditVideo(i64),
    #[to = "/creator/videos"]
    CreatorVideos,
    #[to = "/adm/categories"]
    EditCategories,
    #[to = "/watch/video/{id}"]
    WatchVideo(i64),
    #[to = "/page-not-found"]
    PageNotFound,
    #[to = "/!"]
    Home,
}

pub(crate) type AppAnchor = RouterAnchor<AppRoute>;
