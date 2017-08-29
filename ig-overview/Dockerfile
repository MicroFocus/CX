FROM ubuntu

# Install Node.js and other dependencies
RUN apt-get update && \
    apt-get -y install curl && \
    curl -sL https://deb.nodesource.com/setup_7.x  | bash - && \
    apt-get -y install python build-essential nodejs git

WORKDIR /usr/src/app
ADD package.json /usr/src/app

RUN npm config set registry https://registry.npmjs.org/
RUN npm set progress=false



# Expose port
EXPOSE 8080

RUN echo -n | export GIT_SSL_NO_VERIFY=1
RUN git config --global http.sslverify false
RUN echo -N | git config --global http.sslverify false
RUN echo -n | openssl s_client -showcerts -connect https://secmgmtgit.provo.novell.com:8443 2>/dev/null  | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p'

CMD npm install && npm run start

