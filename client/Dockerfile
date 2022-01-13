FROM rust:latest

WORKDIR /pussyhub

RUN rustup target add wasm32-unknown-unknown && cargo install --locked trunk

COPY ./client ./client
COPY ./shared-lib ./shared-lib

WORKDIR /pussyhub/client

EXPOSE 5000

ENTRYPOINT trunk serve
