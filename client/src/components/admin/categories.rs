use gloo::console::debug;
use shared_lib::payload::category::GetCategoriesResponse;
use shared_lib::payload::video::GetVideos;
use yew::prelude::*;
use yewtil::future::LinkFuture;
use crate::services::requests;
use crate::services::requests::request_get;
use crate::routes::{AppAnchor, AppRoute};

pub enum Msg {
    GetCategoriesResult(Result<GetCategoriesResponse, requests::Error>),
}

pub struct EditCategories {
    categories: Option<GetCategoriesResponse>,
}

impl Component for EditCategories {
    type Message = Msg;
    type Properties = ();

    fn create(_props: Self::Properties, link: ComponentLink<Self>) -> Self {
        link.send_future(async {
            let response = request_get::<GetCategoriesResponse>("/categories".to_string()).await;
            Msg::GetCategoriesResult(response)
        });
        Self {
            categories: None,
        }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::GetCategoriesResult(result) => {
                match result {
                    Ok(categories) => self.categories = Some(categories),
                    Err(err) => debug!(err)
                }
            }
        }
        true
    }

    fn change(&mut self, _props: Self::Properties) -> ShouldRender {
        false
    }

    fn view(&self) -> Html {

        if self.categories.is_none() {
            return html!();
        }
        let categories = self.categories.clone().unwrap();

        html!(
            <>
                <h3 class={"title is-3"}>{"Edit categories "}</h3>
                <table class="table">
                    <thead>
                        <tr>
                            <th>{"Name"}</th>
                            <th>{"edit"}</th>
                            <th>{"delete"}</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        for categories.iter().map(|cat|
                        {
                            html!(
                            <tr>
                                <th>{cat.name.as_str()}</th>
                                <td>{"tbd"}</td>
                                <td>{"tbd"}</td>
                            </tr>
                            )
                        })
                    }
                    </tbody>
                </table>


            </>
        )
    }
}
