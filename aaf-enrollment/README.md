# Advanced Auth Enrollment UI

This project shows how to run the new Advanced Auth Enrollment UI in the CX infrastructure.

## Running the Application

Before running the app, you must do the following:

1. Open CX/middle_tier/services-aaf.json. Change target_url in both the proxy and data sections to point to your Advanced Authentication Framework instance.

2. In the admin portal of your Advanced Authentication Framework instance, go to Endpoints and enable Endpoint42.

The easiest way to run this application is with the Docker container. In the CX/docker folder run the following command:

```
docker-compose -f docker-compose-aaf-enrollment.yml up --force-recreate --build -d
```

Once the Docker container starts the application will be running at https://localhost/account.

### Routing within Application

Methods:

- Use `/account/{method}` as in `/account/card`.
- If multiple authenticators of same method, use `/account/{method}/{template_id}` as in `/account/card/22a5f822b392aae2`.
  If creating a new authenticator, use `/account/{method}/new` as in `/account/card/new`.

Chains:

- Use `/account/chains/{chain_short_name}/{method}` as in `/account/chains/companylogin/card`
- If categories enabled, use `/account/chains/{chain_short_name}/{method}?category={category_name}`
  as in `/account/chains/companylogin/card?category=remote`
- Chain id may be substituted for chain short name as in `/account/chains/180625182fd511e99be40/card`
- Category id may be substituted for category name as in `/account/chains/companylogin/card?category=2ac120002`

### Notes

This project was created using `create-react-app`. After ejecting the build configuration,
the scripts have been modified according to project needs.

This code follows most of the styles from the
[Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
and the [Airbnb Javascript Style Guide](https://github.com/airbnb/javascript)
These styles are incorporated into the ESLint rules in `.eslintrc`, along with the basic
rules from `create-react-app.` See the create-react-app ESLint config
[here](https://github.com/facebook/create-react-app/blob/v1.1.4/packages/eslint-config-react-app/index.js).

### Developer

To set up the application:

1. Install Yarn package manager from [yarnpkg.com](https://yarnpkg.com/). Yarn is similar to NPM.
2. Run `yarn` to install NPM packages
3. Run one of the following commands to build and/or host the application

- `yarn start` Runs the app in development mode
- `yarn mock` Runs the app in development mode using a mock API
- `yarn build` Builds app assets for production

#### How to set up development mode (for `yarn start`)

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

- In order to test some functionality in development mode, such as U2F enrollment, you will need to run the server in HTTPS mode.
To do this, set `HTTPS=true` as an environmental variable when running the application.

#### Naming Strategy

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
  