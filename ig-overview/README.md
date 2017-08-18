# Identity Governance Overview
This project shows how to use the CX infrastructure to connect to Identity Governance and use OSP for single sign-on authentication with other IAS products.

## Setup

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


### Project Structure
The application directory structure is layout out as follows. This structure is [configurable](#ng-gulp).
* `images/` Place images here. Remove .gitkeep when this folder contains any images
* `src/`
  * `components/` Create components here. The structure does not matter. However, it can be beneficial to keep all 
  source code, stylesheets, and tests grouped together by naming the files similarly. Remember to add the stylesheets to
  `src/main.scss` to include them in the build output.
  * `config/`
    * `routes.ts` Register application routes here. Angular UI Router is used to add routes in this template.
  * `styles/` Site-wide styles go here.
  * `index.html` See ng-gulp options for creating separate index.html files for development and production.
  * `main.ts` Created and bootstrap the angular application module here. See ng-gulp options for creating separate 
  main.ts files for development and production.
  * `main.scss` Manifest for all Sass stylesheets in the project. Only use `@import`s in this file.
* `vendor/` Third party vendor assets (fonts, JS, CSS) that are not delivered via a package manager
* `gulpfile.js` Invoke ngGulp here. Register any custom gulp tasks here.
* `tsconfig.json` This configured the TypeScript compiler.
* `tslint.json` This is the configuration file for TSLint which checks TypeScript code.
