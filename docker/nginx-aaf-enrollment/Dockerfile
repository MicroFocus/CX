FROM nginx

COPY nginx-app.conf /etc/nginx/conf.d/default.conf
RUN apt-get update && apt-get install -y openssl
COPY generate_certs.sh /
RUN chmod +x /generate_certs.sh
RUN /generate_certs.sh
