FROM ubuntu

# Install Node.js and other dependencies
RUN apt-get update && \
    apt-get -y install curl gnupg2 && \
    curl -sL https://deb.nodesource.com/setup_8.x  | bash - && \
    apt-get -y install python build-essential nodejs git
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn

WORKDIR /usr/src/app
ADD package.json /usr/src/app


ENV DANGEROUSLY_DISABLE_HOST_CHECK=true
# Expose port
EXPOSE 8080
CMD yarn install && yarn start

