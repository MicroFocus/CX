# Set the base image to Ubuntu
FROM ubuntu:trusty
# was FROM node:argon

# File Author / Maintainer
MAINTAINER Tony Stephens

# Install Node.js and other dependencies
RUN apt-get update && \
    apt-get -y install curl && \
    curl -sL https://deb.nodesource.com/setup | sudo bash - && \
    apt-get -y install python build-essential nodejs git

# Install nodemon
RUN npm install -g nodemon

# Provides cached layer for node_modules
# ADD package.json /tmp/package.json
ADD bower.json /usr/src/app/bower.json
ADD bower-shrinkwrap.json /usr/src/app/bower-shrinkwrap.json
ADD .bowerrc /usr/src/app/.bowerrc
ADD package.json /usr/src/app/package.json
ADD npm-shrinkwrap.json /usr/src/app/npm-shrinkwrap.json
ADD app /usr/src/app/app
ADD i18n /usr/src/app/i18n
ADD styles /usr/src/app/styles
ADD tasks /usr/src/app/tasks
ADD test /usr/src/app/test
# Not sure if this . replicates all above items.  Find out.
# ADD . /usr/src/app

RUN cd /usr/src/app && npm install -g grunt grunt-cli bower && npm install

# Define working directory
WORKDIR /usr/src/app
ADD . /usr/src/app

# Expose port
EXPOSE  8080

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
RUN grunt dist


# Create app directory
# RUN mkdir -p /usr/src/app
# RUN npm install -g grunt grunt-cli bower
#
# WORKDIR /usr/src/app
#
# # Install app dependencies
# COPY bower.json /usr/src/app/
# COPY bower-shrinkwrap.json /usr/src/app/
# COPY .bowerrc /usr/src/app/
# COPY package.json /usr/src/app/
# COPY npm-shrinkwrap.json /usr/src/app/
# COPY app /usr/src/app/app
# COPY i18n /usr/src/app/
# COPY styles /usr/src/app/
# COPY tasks /usr/src/app/
# COPY test /usr/src/app/
# # Not sure if this . replicates all above items.  Find out.
# COPY . /usr/src/app
#
# EXPOSE 8080

# This section to try and allow bower install to Stash work.
# NOTE: MUST UPDATE USERNAME/PASSWORD in /boilerplate/bower.json file.
# RUN echo -n | export GIT_SSL_NO_VERIFY=1
# RUN git config --global http.sslverify false
# RUN echo -N | git config --global http.sslverify false
# RUN echo -n | openssl s_client -showcerts -connect https://secmgmtgit.provo.novell.com:8443 2>/dev/null  | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p'
#
# RUN echo '{ "allow_root": true }' > /root/.bowerrc
#
# RUN npm install
# RUN grunt replace:bowerForDev
# RUN bower install
# RUN npm rebuild node-sass
#
# RUN npm install
# RUN grunt dev
#
