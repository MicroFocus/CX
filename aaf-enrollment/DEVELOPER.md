# Developer

This project was created using `create-react-app`. After ejecting the build configuration,
the scripts have been modified according to project needs.

This code follows most of the styles from the
[Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
and the [Airbnb Javascript Style Guide](https://github.com/airbnb/javascript)
These styles are incorporated into the ESLint rules in `.eslintrc`, along with the basic
rules from `create-react-app.` See the create-react-app ESLint config
[here](https://github.com/facebook/create-react-app/blob/v1.1.4/packages/eslint-config-react-app/index.js).

To set up the application:

1. Install Yarn package manager from [yarnpkg.com](https://yarnpkg.com/). Yarn is similar to NPM.
2. Run `yarn` to install NPM packages
3. Run one of the following commands to build and/or host the application

- `yarn start` Runs the app in development mode
- `yarn mock` Runs the app in development mode using a mock API in place of an Advanced Authentication server
- `yarn build` Builds app assets for production

### How to set up development mode (for `yarn start`)

1. Create an endpoint in the Advanced Auth Admin application.

2. Add the endpoint id and secret, along
with the Advanced Auth application hostname to a new file ignored by Git, 
`config/server.config.json`:

```
{
  "endpoint": {
    "id": "endpoint-id",
    "secret": "endpoint-secret"
  },
  "proxy": "https://path-to-advanced-auth-server"
}
```

3. Now you can run `yarn start`. It will open a web browser to localhost:3000 from which you can view the
Advanced Auth Enrollment UI. 

Notes:

- To view the application from another host in development, you must use the `yarn mock` command. Or you can
set `DANGEROUSLY_DISABLE_HOST_CHECK=true` in the environment when running `yarn start`. (Why is this necessary?
For security reasons, `create-react-app` does not allow viewing the development application from another host when a proxy is configured.
See `webpackDevServer.config.js`.) 

- To use a mock API in place of Advanced Authentication Device Service,
  set `REACT_APP_MOCK_DEVICE_SERVICE=true` as an environmental variable when running the application. Note that only
  a few devices such as Fingerprint can be mocked at present.

- In order to test some functionality in development mode, such as U2F enrollment, you will need to run the server in HTTPS mode.
To do this, set `HTTPS=true` as an environmental variable when running the application.

- To log Redux state, set `REACT_APP_LOGGING=true` as an environmental variable when running the application.

### Comments about Application Architecture

- This application checks for unsaved work on the page before any page navigation takes place (see navigation.actions.js).
  For this reason, we do not use <a> tags for routing within the application. Instead we call a method that changes
  the URL manually after first checking for unsaved work. If there is unsaved work on the page, the user must confirm
  they wish to leave the page before navigation will take place.
 
- This application uses [trashable-react](https://github.com/hjylewis/trashable-react) to cancel pending promises when a
React component unmounts. This avoids memory leaks and is much easier than having to abort every promise during unmount.
See examples in AuthenticatorContainer.js. If a promise originates from another file, the proper place to call
this.props.registerPromise(promise) is in the React component right on the new promise that is returned from the other file.
 
- Create-React-App injects several environmental variables into this application, including `NODE_ENV` and anything
  starting with `REACT_APP`. The injection occurs at compile time via the Webpack define plugin. This enables us to
  exclude code and imported libraries that we don't need in our production build. See
  https://webpack.js.org/plugins/define-plugin/#usage

- This application transforms data from the server to be in camelCase, which is JavaScript convention. Within the
  application camelCase is used wherever possible. Data from the application is changed into snake_case before being
  sent back to the server.
  
- This application uses `isFullyEnrolled` and `isEnrolled` to distinguish between enrolled templates that have all the
  authentication information needed to be used for login and those that don't. This is much easier to understand
  than the template data coming from the server, so we augment the data in this manner within the application.

### Naming Strategy

The following names are used within the application code. The definitions are meant to avoid confusion about naming.

- **Authenticator** - A means of verifying a user's identity
- **Category** - A classification allowing login to an event using only templates of the same classification.
  An administrator may use categories to allow users to enroll in the same method multiple times while
  enforcing that only certain templates of that method are allowed to be used during a login to a chosen event.
  Advanced Auth 6.1 only allows a single template to exist for a given category and method.
- **Comment** - A user-provided description of a template. When enrolling in the same method multiple times, the user
  can distinguish between the templates that are created via this description.
- **Enroll** - The process of providing the server with authentication information for a given method.
  This occurs via one or more doEnroll calls to the server.
- **Enrollment** - The process of creating or modifying an authenticator. This occurs via providing the 
  server with both authentication information and a template for a given method. Thus, enrolling is
  different from enrollment in that it does not include a template.
- **Event** - A destination site a user may access after logging in
- **Method** - A means for login, for example PASSWORD or CARD.
  Also used in the front-end UI to denote an authenticator. This language makes it much easier
  for users to understand the enrollment process. Hence some of the React components are
  named "Method" in place of "Authenticator" where it makes sense.
- **Template** - Associates authentication information with a user. Also may contain a comment and category.
  Defines a step in a user's login process.
  