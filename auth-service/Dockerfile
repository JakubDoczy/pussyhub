FROM rust:latest as builder

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
ENV SQLX_OFFLINE=1
RUN cargo build

EXPOSE 8089
ENTRYPOINT ["/pussyhub/auth-service/target/debug/auth_service"]
