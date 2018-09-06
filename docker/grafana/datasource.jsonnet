local IGARA_DB_URL = std.extVar("IGARA_DB_URL");
local IGARA_DB_PASSWORD = std.extVar("IGARA_DB_PASSWORD");
local IGARA_DB_USER = std.extVar("IGARA_DB_USER");
local IGARA_DB_NAME = std.extVar("IGARA_DB_NAME");
local IGOPS_DB_URL = std.extVar("IGOPS_DB_URL");
local IGOPS_DB_PASSWORD = std.extVar("IGOPS_DB_PASSWORD");
local IGOPS_DB_USER = std.extVar("IGOPS_DB_USER");
local IGOPS_DB_NAME = std.extVar("IGOPS_DB_NAME");

{
	"apiVersion": 1,
	"deleteDatasources": [
		{
			"name": "Graphite",
			"orgId": 1
		}
	],
	"datasources": [
		{
			"name": "PostgreSQL",
			"type": "postgres",
			"org_id": 1,
			"access": "proxy",
			"url": "postgres:5432",
			"password": "grafana",
			"user": "grafana",
			"database": "grafana",
			"is_default": false,
			"jsonData": {"sslmode":"disable"},
			"secureJsonData": {"password":"grafana"},
			"editable": true
		},
		{
			"name": "DS_IGOPS",
			"type": "postgres",
			"org_id": 1,
			"access": "proxy",
			"url": IGOPS_DB_URL,
			"password": IGOPS_DB_PASSWORD,
			"user": IGOPS_DB_USER,
			"database": IGOPS_DB_NAME,
			"is_default": false,
			"jsonData": {"sslmode":"disable"},
			"secureJsonData": {"password":IGOPS_DB_PASSWORD},
			"editable": true
		},
		{
			"name": "DS_IGARA",
			"type": "postgres",
			"org_id": 1,
			"access": "proxy",
			"url": IGARA_DB_URL,
			"password": IGARA_DB_PASSWORD,
			"user": IGARA_DB_USER,
			"database": IGARA_DB_NAME,
			"is_default": false,
			"jsonData": {"sslmode":"disable"},
			"secureJsonData": {"password":IGARA_DB_PASSWORD},
			"editable": true
		},
		{
			"name": "Prometheus",
			"type": "prometheus",
			"access": "proxy",
			"orgId": 1,
			"url": "http://prometheus:9090",
			"password": null,
			"user": null,
			"database": null,
			"basicAuth": true,
			"basicAuthUser": "admin",
			"basicAuthPassword": "foobar",
			"withCredentials": null,
			"isDefault": null,
			"jsonData": {
				"graphiteVersion": "1.1",
				"tlsAuth": false,
				"tlsAuthWithCACert": false
			},
			"secureJsonData": {
				"tlsCACert": "...",
				"tlsClientCert": "...",
				"tlsClientKey": "..."
			},
			"version": 1,
			"editable": true
		}
	]
}