FROM rust:latest

# local dependency files, everything will be rebuild if changed
WORKDIR /pussyhub/
COPY shared-lib/ shared-lib
WORKDIR /pussyhub/auth-service

# cache dependencies
RUN echo "fn main() {}" > dummy.rs
COPY auth-service/Cargo.toml .
RUN sed -i 's#src/main.rs#dummy.rs#' Cargo.toml
RUN cargo build
RUN sed -i 's#dummy.rs#src/main.rs#' Cargo.toml

# build
WORKDIR /pussyhub/
COPY . .
WORKDIR /pussyhub/auth-service

EXPOSE 8089

# lazy way for sqlx to have a running database during build
ENTRYPOINT cargo run
