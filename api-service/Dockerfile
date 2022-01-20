FROM rust:latest as builder

# local dependency files, everything will be rebuild if changed
WORKDIR /pussyhub/
COPY shared-lib/ shared-lib
WORKDIR /pussyhub/api-service

# cache dependencies
RUN echo "fn main() {}" > dummy.rs
COPY api-service/Cargo.toml .
RUN sed -i 's#src/main.rs#dummy.rs#' Cargo.toml
RUN cargo build
RUN sed -i 's#dummy.rs#src/main.rs#' Cargo.toml

# build
WORKDIR /pussyhub/
COPY . .
WORKDIR /pussyhub/api-service
ENV SQLX_OFFLINE=1
RUN cargo build

EXPOSE 8001
ENTRYPOINT ["/pussyhub/api-service/target/debug/api_service"]