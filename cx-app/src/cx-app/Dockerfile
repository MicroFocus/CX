FROM ubuntu
WORKDIR /opt/cx

RUN apt-get update && apt-get install -qy \
    build-essential python3-dev libev4 libev-dev libpq-dev python-virtualenv openssl libffi-dev libssl-dev libpcre3 libpcre3-dev supervisor

RUN virtualenv -p /usr/bin/python3.5 /opt/penv

RUN . /opt/penv/bin/activate&&pip install uwsgi

#COPY . /opt/cx

#RUN chown -R www-data:www-data /opt/cx \
#    && chmod 770 /opt/cx/production.ini  /opt/cx/development.ini
#RUN . /opt/penv/bin/activate; python3 setup.py develop

COPY conf/supervisor-app.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80
CMD ["supervisord", "-n"]
