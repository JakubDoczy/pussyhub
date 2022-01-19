#!/bin/bash

openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -outform PEM -pubout -out public.pem

mkdir -p auth-service/resources/
mv private.pem auth-service/resources/

# move/copy to the other serrvices
mkdir -p client/resources/
cp public.pem client/resources/
cp public.pem file-service/resources/
mv public.pem auth-service/resources/
