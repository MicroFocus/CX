
# Grafana

This is the grafana CX project.  It's a great place to start from and a good template for new projects.  This project contains the following items:

* **Python** and the CX middle tier to create custom REST endpoints
* **Nginx** to bring together the front end and middle tier and act as a proxy
* **Grafana** Grafana 
* **Prometeus** Prometeus
* A **Docker** container to bring it all together

This project shows how to use the CX framework to build the Grafana for IG. 

## Running the Application

The easiest way to run this application is with the Docker container. 

1. Change to the docker folder and rename "env.grafana.sample" file to the ".env.grafana" and change variables there to correct values:
 
2. Run the following command:

```
docker-compose -f docker-compose-grafana.yml up --force-recreate --build
```

Once the Docker container starts the grafana will be running at http://localhost/grafana
