use yew::prelude::*;

pub struct Footer {}

impl Component for Footer {
    type Message = ();
    type Properties = ();

    fn create(_props: Self::Properties, _link: ComponentLink<Self>) -> Self {
        Self { }
    }

    fn update(&mut self, _msg: Self::Message) -> ShouldRender { false }

    fn change(&mut self, _props: Self::Properties) -> ShouldRender {
        false
    }

    fn view(&self) -> Html {
        html!(
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
                                    <a href="https://www.rust-lang.org/" target="_blank" class="content" style="text-decoration: none;">
                                        <h1 class="title is-size-4">{"Rust"}</h1>
                                        <p class="is-size-5 subtitle">
                                          {"built with love️, using Rust"}
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
        )
    }
}
