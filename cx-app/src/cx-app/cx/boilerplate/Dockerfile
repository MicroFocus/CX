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
# Not sure if this . replicates all above items.  Find out.
COPY . /usr/src/app

EXPOSE 8080

# This section to try and allow bower install to Stash work.
# NOTE: MUST UPDATE USERNAME/PASSWORD in /boilerplate/bower.json file.
RUN echo -n | export GIT_SSL_NO_VERIFY=1
RUN git config --global http.sslverify false
RUN echo -N | git config --global http.sslverify false
RUN echo -n | openssl s_client -showcerts -connect https://secmgmtgit.provo.novell.com:8443 2>/dev/null  | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p'

RUN echo '{ "allow_root": true }' > /root/.bowerrc

RUN npm install
RUN grunt replace:bowerForDev
RUN bower install
RUN npm rebuild node-sass

RUN npm install
RUN grunt dev

