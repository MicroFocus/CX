# Hello World!

This is the barebones CX project.  It's a great place to start from and a good template for new projects.  This project contains the following items:

* **Angular** and the set up to write your front end application
* **Python** and the CX middle tier to create custom REST endpoints
* **Nginx** to bring together the front end and middle tier and act as a proxy
* **Gromit** OAuth2 authentication so you can make REST calls
* A **Docker** container to bring it all together
* **Gulp** and the basic build 

This project shows how to use the CX framework to build the basic Hello World!  This sample comes with a simple starting page and the Gromit framework configured and ready to make REST calls.  This is a great started project for your new CX application.

### Project Structure
The application directory structure is layout out as follows. This structure is configurable.
* `src/`
  * `components/` This is where the components of your app goes.  The default component is the [application component](src/components/application/application.component.html).  It also has an accompanying [application component TypeScript file](src/components/application/application.component.ts) and a [application component SCSS file](src/components/application/application.component.scss).  You can add code to this component or add as many new components as you want.
  * `config/`
    * `routes.ts` Register application routes here. Angular UI Router is used to add routes in this template.
  * `styles/` Site-wide styles go here.
  * `index.html` This is the base HTML file for your project.  When someone first loads your front end they will go here.
  * `main.ts` Created and initialize the angular application module here.
  * `main.scss` Manifest for all Sass stylesheets in the project. Only use `@import`s in this file.
* `vendor/` Third party vendor assets (fonts, JS, CSS) that are not delivered via a package manager
* `images/` Place images here. Remove .gitkeep when this folder contains any images
* `gulpfile.js` Invoke ngGulp here. Register any custom gulp tasks here.
* `tsconfig.json` This configured the TypeScript compiler.
* `tslint.json` This is the configuration file for TSLint which checks TypeScript code.

## Running the Application

The easiest way to run this application is with the Docker container.  Change to the docker folder and run the following command:

```
docker-compose -f docker-compose-helloworld.yml up --force-recreate --build
```

Once the Docker container starts the application will be running at http://localhost, but you must access it via the URL configured during OSP SSO client configuration.

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

* `gulp` - Starts development environment (development build, file watchers, and server).  The server will be running at http://localhost:8080.
* `gulp build:development` - Development build. This build is optimized for speed. Writes files to `dist/` by 
default
* `gulp build:production` - Production build. This build is optimized for size and quality of output. Writes 
files to `dist/` by default
* `gulp clean` - Cleans all built assets by removing `dist/`