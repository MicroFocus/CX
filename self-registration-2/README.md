# ng-gulp-template
Template for Angular 1 applications using [ng-gulp](https://github.com/jedwardhawkins/ng-gulp), Angular UI Router, 
Typescript, Webpack, and Gulp.  

## ng-gulp
For more information about configuring ng-gulp visit the project on [Github](https://github.com/jedwardhawkins/ng-gulp).

## Setup
Before you begin you'll need to fork the project and clone it.

1. `npm install`
2. Replace all instances of `[APP_NAME_TITLE]` in the project with the title case version of your application name. 
(ex: Application Name)
3. Edit `package.json` with the appropriate information for your project.

## Development
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
* `tsconfig.json`
* `tslint.json`

## Commands
Run these commands from the root of the consuming application:
* `gulp` - Starts development environment (development build, file watchers, and server)
* `gulp build:development` - Development build. This build is optimized for speed. Writes files to `dist/` by 
default
* `gulp build:production` - Production build. This build is optimized for size and quality of output. Writes 
files to `dist/` by default
* `gulp clean` - Cleans all built assets by removing `dist/`

## Testing
Coming soon