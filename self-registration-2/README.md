# User Self Registration Proof of Concept
This project shows how to use the CX framework to create a highly polished user experience for create users.  This sample connets to eDirectory using a REST service written in Python and creates users in eDirectory.

[CX Self Registration](https://raw.github.com/MicroFocus/cx/master/self-registration-2/screenshot.png)

## Running the Application

The easiest way to run this application is with the Docker container.  Change to the docker folder and run the following command:

```
docker-compose -f docker-compose-self-v2.yml up --force-recreate --build
```

Once the Docker container starts the application will be running at http://localhost.


## Building the Client Side Separately
You can build the client-side of this application separately.  You don't have to, but it can sometimes be useful to see better build errors.

### Node Package Manager
This sample requires the [Node Package Manager](https://www.npmjs.com).  The best way to get the Node Package Manager is to install [Node.js](https://nodejs.org/en).  

After you have installed the Node Package Manager you can install the project dependencies with this command:

```
npm install
```

### Gulp
This application builds with [Gulp](http://gulpjs.com).  Use the following commands to install Gulp:

```
npm install gulp-cli -g
npm install gulp -D
```

## Development

These are the commands to build the project:

* `gulp` - Starts development environment (development build, file watchers, and server).  The server will be running at http://localhost:8081.
* `gulp build:development` - Development build. This build is optimized for speed. Writes files to `dist/` by 
default
* `gulp build:production` - Production build. This build is optimized for size and quality of output. Writes 
files to `dist/` by default
* `gulp clean` - Cleans all built assets by removing `dist/`

