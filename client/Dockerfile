FROM rust:latest
RUN rustup target add wasm32-unknown-unknown
RUN cargo install trunk

# local dependency files, everything will be rebuild if changed
WORKDIR /pussyhub/
COPY shared-lib/ shared-lib
WORKDIR /pussyhub/client

# cache dependencies
RUN echo "fn main() {}" > dummy.rs
COPY client/Cargo.toml .
RUN sed -i 's#src/main.rs#dummy.rs#' Cargo.toml
RUN cargo build --target wasm32-unknown-unknown
RUN sed -i 's#dummy.rs#src/main.rs#' Cargo.toml

# build
WORKDIR /pussyhub/
COPY . .
WORKDIR /pussyhub/client
RUN trunk build

EXPOSE 5000

ENTRYPOINT trunk serve
