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

### Developer

- [Developer Guide](./DEVELOPER.md)