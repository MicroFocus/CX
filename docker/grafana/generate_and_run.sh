#!/bin/bash -e
jsonnet -J /tmp/grafonnet-lib  /tmp/dashboard.jsonnet -o /data/dashboards/dashboard.json
jsonnet /tmp/ig-dashboard.jsonnet -V IGHOST -V GHOST -o /data/dashboards/ig-dashboard.json

jsonnet /tmp/datasource.jsonnet -V IGARA_DB_URL -V IGARA_DB_PASSWORD -V IGARA_DB_USER -V IGARA_DB_NAME \
-V IGOPS_DB_URL -V IGOPS_DB_PASSWORD -V IGOPS_DB_USER -V IGOPS_DB_NAME -o /etc/grafana/provisioning/datasources/datasource.yml
/run.sh
