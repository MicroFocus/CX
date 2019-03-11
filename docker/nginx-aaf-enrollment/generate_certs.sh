#!/bin/bash
openssl req  -nodes -new -x509  -keyout server.key -out server.cert -subj "/C=GB/ST=London/L=London/O=Global Security/OU=IT Department/CN=example.com"
cp server.key  /etc/ssl/certs/
cp server.cert  /etc/ssl/certs/

