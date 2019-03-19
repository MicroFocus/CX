# AAF enrollment UI

This project shows how to run NEW AAF enrollment ui as part of CX infrastructure.

NEW enrollment UI is not located in this repo, so you should put it locally to aaf-enrollment directory and build. For details please look to README.md from new enrollment UI repo.



## Running the Application

Before running the app, please change services-aaf.json file in the middle_tier directory:
1. change target url in proxy and data sections to your AAF instance.
2. enable '4242..' endpoint in the AAF installation


The easiest way to run this application is with the Docker container.  Change to the docker folder and run the following command:

```
docker-compose -f docker-compose-aaf-enrollment.yml up --force-recreate --build -d
```

Once the Docker container starts the application will be running at https://localhost.
