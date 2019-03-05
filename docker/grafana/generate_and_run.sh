#!/bin/bash -e
jsonnet -J /tmp/grafonnet-lib  /tmp/dashboard.jsonnet -o /data/dashboards/dashboard.json

# generating multiple dashbords
# maybe we should automate this action?
mkdir -p /data/dashboards/ig
jsonnet /tmp/provisioning/ig/ig-dashboard.jsonnet -V IGHOST -V GHOST -o /data/dashboards/ig/ig-dashboard.json
jsonnet /tmp/provisioning/ig/ig-dataprod-dashboard.jsonet -V IGHOST -V GHOST -o /data/dashboards/ig/ig-dataprod-dashboard.json

mkdir -p /data/dashboards/aaf
jsonnet /tmp/provisioning/aaf/aaf-dashboard.jsonnet -V IGHOST -V GHOST -o /data/dashboards/aaf/aaf-dashboard.json

jsonnet /tmp/datasource.jsonnet -V IGARA_DB_URL -V IGARA_DB_PASSWORD -V IGARA_DB_USER -V IGARA_DB_NAME \
-V IGOPS_DB_URL -V IGOPS_DB_PASSWORD -V IGOPS_DB_USER -V IGOPS_DB_NAME -o /etc/grafana/provisioning/datasources/datasource.yml
/run.sh
