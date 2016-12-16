FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
RUN npm install -g grunt grunt-cli bower

WORKDIR /usr/src/app

# Install app dependencies
COPY bower.json /usr/src/app/
COPY bower-shrinkwrap.json /usr/src/app/
COPY .bowerrc /usr/src/app/
COPY package.json /usr/src/app/
COPY npm-shrinkwrap.json /usr/src/app/
COPY app /usr/src/app/app
COPY i18n /usr/src/app/
COPY styles /usr/src/app/
COPY tasks /usr/src/app/
COPY test /usr/src/app/
COPY . /usr/src/app


# Bundle app source
# COPY . /usr/src/app

EXPOSE 8080

RUN echo -n | export GIT_SSL_NO_VERIFY=1
RUN git config --global http.sslverify false
RUN echo -N | git config --global http.sslverify false
RUN echo -n | openssl s_client -showcerts -connect https://secmgmtgit.provo.novell.com:8443 2>/dev/null  | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p'

RUN echo '{ "allow_root": true }' > /root/.bowerrc

# RUN echo -n | npm install
# RUN echo -n | bower install

RUN npm install
RUN grunt replace:bowerForDev
RUN bower install

CMD [ "npm", "install" ]
CMD [ "bower", "install" ]
CMD [ "npm", "start" ]

# ENTRYPOINT ["/bin/bash", "-c", "npm install"]
# ENTRYPOINT ["/bin/bash", "-c", "bower install"]
# ENTRYPOINT ["/bin/bash", "-c", "grunt dev"]

# CMD [ "npm", "install" ]
# CMD [ "bower", "install" ]
# CMD [ "grunt", "dev" ]
