FROM rust:latest

WORKDIR /pussyhub

COPY .env .

COPY ./auth-service ./auth-service
COPY ./shared-lib ./shared-lib

WORKDIR /pussyhub/auth-service

EXPOSE 8089

ENTRYPOINT cargo run
