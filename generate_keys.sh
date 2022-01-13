#!/bin/bash

openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -outform PEM -pubout -out public.pem

mv private.pem auth-service/resources/

# move/copy to the other serrvices
cp public.pem client/resources/
mv public.pem auth-service/resources/
