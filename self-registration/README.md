# CX-App Self Registration Demo

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