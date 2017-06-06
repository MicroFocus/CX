# CX-App Self Registration Demo

#### Certificate required for downloading dependencies from the internal Bitbucket server

In order to build this project using npm, you'll need to make sure your git client is able to connect to our internal Bitbucket server, which uses a digital certificate signed using the Micro Focus internal Certificate Authority.

Instructions for downloading and configuring the Micro Focus certificate for use with Git can be found at the following location:
https://wiki.provo.microfocus.com:8443/display/ENG/Bitbucket+Server+-+Getting+Started

However, for the condensed version version...

Download the secmgmtgit.provo.novell.com.pem file from the following location, and save it somewhere, like your user home directory: 
https://wiki.provo.microfocus.com:8443/download/attachments/32741329/secmgmtgit.provo.novell.com.pem.txt?version=1&modificationDate=1450809745832&api=v2

Tell git to recognize it as a trusted Certificate Authority by running the command:

```
$ git config --global http."https://secmgmtgit.provo.novell.com:8443/".sslCAInfo C:/path/to/secmgmtgit.provo.novell.com.pem
```

You can verify it was set correctly by running the following command:

```
$ git config http.https://secmgmtgit.provo.novell.com:8443/.sslcainfo
```

### Running in a Docker Container

The easiest way to run this application is with the Docker container.  Change to the docker folder and run the following command:

```
docker-compose -f docker-compose-self.yml up --force-recreate --build
```

Once the Docker container starts the self-registration app will be running at http://localhost.


### Running the client separately


Running the Docker container should work for most cases, but if you want to run the client separately you can use the following commands.  Start by installing all of the dependencies like this:

```
$ npm install
```

#### Running Production Builds

Production builds get minified, obfuscated, and cache busted, and are output to the ./dist folder.

To perform a production build, run the following command:

```
$ npm run build
```

If you'd like to run a web server against whatever has been produced in the ./dist folder, you can run the command:

```
$ npm run server
```

You should now be able to open a browser to: http://localhost:8080

#### Running Development  Builds

Development builds get don't get minified, obfuscated, or cache busted, but do contain unit tests.  Development builds are output to the ./dist folder as well.

To perform a development build, run the following command:

```
$ npm run build:dev
```

You can run the web server against the dist folder as you did with the production build.  However, you can also run the web server in live development mode, which watches for file changes, and automatically transpiles and reloads them.  To run the web server in live development mode, run the following command:

```
$ npm run server:dev
```

#### Other Commands

There are other commands available in the scripts section of the package.json file.  Below is a table listing the commands and their descriptions:

| Command                  | Build Feature                            |
| ------------------------ | ---------------------------------------- |
| $ npm run clean          | Clean the output folder                  |
| $ npm run security-check | Run security checks against the npm packages |
| $ npm run lint           | Lint the source code (one time)          |
| $ npm run lint:watch     | Lint the source code (continuously while watching for file changes) |
| $ npm run test           | Run unit tests (one time)                |
| $ npm run test:watch     | Run unit tests (continuously while watching for file changes) |
| $ npm run localtunnel    | Share work in progress by firing up localtunnel on the development webserver's port |
| $ npm run share          | Fire up the web server for serving files in the dist folder, and start localtunnel for sharing |
| $ npm start              | Runs server:dev, but turns on all the development bells and whistles (security, linting, testing, etc.) |