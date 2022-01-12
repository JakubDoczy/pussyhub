FROM rust:latest

WORKDIR /pussyhub

COPY .env ..
COPY . .


COPY ./auth-service ./auth-service
COPY ./shared-lib ./shared-lib

EXPOSE 8089

WORKDIR /pussyhub/auth-service

ENTRYPOINT cargo run