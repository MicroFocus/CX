FROM ubuntu

# File Author / Maintainer
MAINTAINER Tony Stephens

# Install Node.js and other dependencies
RUN apt-get update && \
    apt-get -y install curl && \
    curl -sL https://deb.nodesource.com/setup_0.12 | bash - && \
    apt-get -y install python build-essential nodejs git

RUN apt-get install -y npm
# Install nodemon
RUN npm install -g nodemon

WORKDIR /usr/src/app

ADD bower.json /usr/src/app
ADD bower-shrinkwrap.json /usr/src/app
ADD .bowerrc /usr/src/app
ADD package.json /usr/src/app
ADD npm-shrinkwrap.json /usr/src/app

RUN npm config set registry https://registry.npmjs.org/
RUN npm set progress=false

RUN npm install -g grunt grunt-cli bower
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN npm install  --unsafe-perm

# NOTE: MUST UPDATE USERNAME/PASSWORD in /boilerplate/bower.json file.
RUN echo -n | export GIT_SSL_NO_VERIFY=1
RUN git config --global http.sslverify false
RUN echo -N | git config --global http.sslverify false
RUN echo -n | openssl s_client -showcerts -connect https://secmgmtgit.provo.novell.com:8443 2>/dev/null  | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p'

RUN echo '{ "allow_root": true }' > /root/.bowerrc

RUN npm install
ADD gruntfile.js /usr/src/app
ADD config.json /usr/src/app
ADD tasks /usr/src/app/tasks
RUN grunt replace:bowerForDev
RUN bower install

# Define working directory

RUN ls
COPY . /usr/src/app/
RUN ls
#RUN grunt dist
# Expose port
EXPOSE 8080
CMD ["grunt", "dev"]

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
