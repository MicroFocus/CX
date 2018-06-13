local IGHOST = std.extVar("IGHOST");
local DS_IGOPS = "DS_IGOPS";
local DS_IGARA = "DS_IGARA";
{
  "__requires": [
    {
      "type": "grafana",
      "id": "grafana",
      "name": "Grafana",
      "version": "5.1.1"
    },
    {
      "type": "panel",
      "id": "grafana-worldmap-panel",
      "name": "Worldmap Panel",
      "version": "0.0.21"
    },
    {
      "type": "panel",
      "id": "graph",
      "name": "Graph",
      "version": "5.0.0"
    },
    {
      "type": "datasource",
      "id": "postgres",
      "name": "PostgreSQL",
      "version": "5.0.0"
    },
    {
      "type": "panel",
      "id": "singlestat",
      "name": "Singlestat",
      "version": "5.0.0"
    }
  ],
  "annotations": {
    "list": [
      {
        "builtIn": 1,
        "datasource": "-- Grafana --",
        "enable": true,
        "hide": true,
        "iconColor": "rgba(0, 211, 255, 1)",
        "name": "Annotations & Alerts",
        "type": "dashboard"
      }
    ]
  },
  "editable": true,
  "gnetId": null,
  "graphTooltip": 0,
  "id": null,
  "iteration": 1528756563643,
  "links": [],
  "panels": [
    {
      "collapsed": true,
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 0
      },
      "id": 30,
      "panels": [],
      "title": "Risk Coverage",
      "type": "row"
    },
    {
      "cacheTimeout": null,
      "colorBackground": true,
      "colorValue": false,
      "colors": [
        "#cffaff",
        "#f4d598",
        "#ea6460"
      ],
      "datasource": DS_IGOPS,
      "format": "none",
      "gauge": {
        "maxValue": 100,
        "minValue": 0,
        "show": false,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 4,
        "w": 5,
        "x": 0,
        "y": 1
      },
      "id": 32,
      "interval": null,
      "links": [],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgba(31, 118, 189, 0.18)",
        "full": false,
        "lineColor": "rgb(31, 120, 193)",
        "show": true
      },
      "tableColumn": "",
      "targets": [
        {
          "alias": "",
          "format": "time_series",
          "rawSql": "SELECT\n  $__time(calculation_time),\n  risk_score\nFROM\n  risk_score\nWHERE\n  $__timeFilter(calculation_time) and entity_type = 'GOVERNANCE'\n",
          "refId": "A"
        }
      ],
      "thresholds": "20,60,80",
      "title": "Governance Risk Score",
      "type": "singlestat",
      "valueFontSize": "150%",
      "valueMaps": [
        {
          "op": "=",
          "text": "0",
          "value": "null"
        }
      ],
      "valueName": "current"
    },
    {
      "aliasColors": {},
      "bars": false,
      "dashLength": 10,
      "dashes": false,
      "datasource": DS_IGOPS,
      "fill": 1,
      "gridPos": {
        "h": 4,
        "w": 13,
        "x": 5,
        "y": 1
      },
      "id": 33,
      "legend": {
        "alignAsTable": true,
        "avg": false,
        "current": false,
        "max": false,
        "min": false,
        "rightSide": true,
        "show": true,
        "total": true,
        "values": true
      },
      "lines": true,
      "linewidth": 1,
      "links": [
        {
          "type": "absolute",
          "url": "$IGHOST/#/policy/risk"
        }
      ],
      "nullPointMode": "null",
      "percentage": false,
      "pointradius": 0.5,
      "points": false,
      "renderer": "flot",
      "seriesOverrides": [],
      "spaceLength": 10,
      "stack": false,
      "steppedLine": false,
      "targets": [
        {
          "alias": "",
          "format": "time_series",
          "rawSql": "SELECT\n  $__time(calculation_time),\n  risk_score\nFROM\n  risk_score\nWHERE\n  $__timeFilter(calculation_time) and entity_type = 'GOVERNANCE'\n",
          "refId": "A",
          "scenarioId": "random_walk",
          "stringInput": ""
        }
      ],
      "thresholds": [],
      "timeFrom": null,
      "timeShift": null,
      "title": "Governance risk over time",
      "tooltip": {
        "shared": true,
        "sort": 0,
        "value_type": "individual"
      },
      "transparent": false,
      "type": "graph",
      "xaxis": {
        "buckets": null,
        "mode": "time",
        "name": null,
        "show": true,
        "values": []
      },
      "yaxes": [
        {
          "format": "none",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        },
        {
          "format": "short",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        }
      ],
      "yaxis": {
        "align": false,
        "alignLevel": null
      }
    },
    {
      "collapsed": false,
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 5
      },
      "id": 4,
      "panels": [],
      "title": "Governance coverage",
      "type": "row"
    },
    {
      "aliasColors": {},
      "bars": false,
      "dashLength": 10,
      "dashes": false,
      "datasource": DS_IGARA,
      "fill": 1,
      "gridPos": {
        "h": 5,
        "w": 18,
        "x": 0,
        "y": 6
      },
      "id": 25,
      "legend": {
        "alignAsTable": true,
        "avg": false,
        "current": false,
        "max": false,
        "min": false,
        "rightSide": true,
        "show": true,
        "total": true,
        "values": true
      },
      "lines": true,
      "linewidth": 1,
      "links": [],
      "nullPointMode": "null",
      "percentage": false,
      "pointradius": 0.5,
      "points": false,
      "renderer": "flot",
      "seriesOverrides": [],
      "spaceLength": 10,
      "stack": false,
      "steppedLine": false,
      "targets": [
        {
          "alias": "",
          "format": "time_series",
          "rawSql": "SELECT\n  $__time(ts),\n  users\nFROM\n  ex_GOVERNANCE_COVERAGE\nWHERE\n  $__timeFilter(ts)\n",
          "refId": "A",
          "scenarioId": "random_walk",
          "stringInput": ""
        },
        {
          "alias": "",
          "format": "time_series",
          "hide": false,
          "rawSql": "SELECT\n  $__time(ts),\n  groups\nFROM\n  ex_GOVERNANCE_COVERAGE\nWHERE\n  $__timeFilter(ts)\n",
          "refId": "B",
          "scenarioId": "random_walk"
        },
        {
          "alias": "",
          "format": "time_series",
          "hide": false,
          "rawSql": "SELECT\n  $__time(ts),\n  applications\nFROM\n  ex_GOVERNANCE_COVERAGE\nWHERE\n  $__timeFilter(ts)\n",
          "refId": "C",
          "scenarioId": "random_walk"
        },
        {
          "alias": "",
          "format": "time_series",
          "rawSql": "SELECT\n  $__time(ts),\n  accounts\nFROM\n  ex_GOVERNANCE_COVERAGE\nWHERE\n  $__timeFilter(ts)",
          "refId": "D",
          "scenarioId": "random_walk"
        },
        {
          "alias": "",
          "format": "time_series",
          "rawSql": "SELECT\n  $__time(ts),\n  permissions\nFROM\n  ex_GOVERNANCE_COVERAGE\nWHERE\n  $__timeFilter(ts)",
          "refId": "E",
          "scenarioId": "random_walk"
        },
        {
          "alias": "",
          "format": "time_series",
          "rawSql": "SELECT\n  $__time(ts),\n  assignments\nFROM\n  ex_GOVERNANCE_COVERAGE\nWHERE\n  $__timeFilter(ts)\n",
          "refId": "F"
        }
      ],
      "thresholds": [],
      "timeFrom": null,
      "timeShift": null,
      "title": "Governance coverage over time",
      "tooltip": {
        "shared": true,
        "sort": 0,
        "value_type": "individual"
      },
      "transparent": false,
      "type": "graph",
      "xaxis": {
        "buckets": null,
        "mode": "time",
        "name": null,
        "show": true,
        "values": []
      },
      "yaxes": [
        {
          "format": "none",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        },
        {
          "format": "short",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        }
      ],
      "yaxis": {
        "align": false,
        "alignLevel": null
      }
    },
    {
      "cacheTimeout": null,
      "colorBackground": true,
      "colorValue": false,
      "colors": [
        "#cffaff",
        "#badff4",
        "#badff4"
      ],
      "datasource": DS_IGARA,
      "format": "none",
      "gauge": {
        "maxValue": 100,
        "minValue": 0,
        "show": false,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 5,
        "w": 3,
        "x": 0,
        "y": 11
      },
      "id": 8,
      "interval": null,
      "links": [
        {
          "dashboard": "http://137.65.220.84:8080/#/catalog/users/",
          "targetBlank": true,
          "title": "Details",
          "type": "absolute",
          "url": "$IGHOST/#/catalog/users/"
        }
      ],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgba(31, 118, 189, 0.18)",
        "full": false,
        "lineColor": "rgb(31, 120, 193)",
        "show": true
      },
      "tableColumn": "",
      "targets": [
        {
          "alias": "",
          "format": "time_series",
          "hide": true,
          "rawSql": "SELECT\n  $__time(ts),\n  users\nFROM\n  ex_GOVERNANCE_COVERAGE\nWHERE\n  $__timeFilter(ts)\n",
          "refId": "A"
        }
      ],
      "thresholds": "",
      "title": "Identities",
      "type": "singlestat",
      "valueFontSize": "150%",
      "valueMaps": [
        {
          "op": "=",
          "text": "0",
          "value": "null"
        }
      ],
      "valueName": "current"
    },
    {
      "cacheTimeout": null,
      "colorBackground": true,
      "colorValue": false,
      "colors": [
        "#cffaff",
        "#badff4",
        "#82b5d8"
      ],
      "datasource": DS_IGARA,
      "format": "none",
      "gauge": {
        "maxValue": 100,
        "minValue": 0,
        "show": false,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 5,
        "w": 3,
        "x": 3,
        "y": 11
      },
      "id": 10,
      "interval": null,
      "links": [
        {
          "targetBlank": true,
          "title": "Details",
          "type": "absolute",
          "url": "$IGHOST/#/catalog/groups/"
        }
      ],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgba(31, 118, 189, 0.18)",
        "full": false,
        "lineColor": "rgb(31, 120, 193)",
        "show": true
      },
      "tableColumn": "",
      "targets": [
        {
          "alias": "",
          "format": "time_series",
          "hide": false,
          "rawSql": "SELECT\n  $__time(ts),\n  groups\nFROM\n  ex_GOVERNANCE_COVERAGE\nWHERE\n  $__timeFilter(ts)",
          "refId": "A"
        }
      ],
      "thresholds": "",
      "title": "Groups",
      "type": "singlestat",
      "valueFontSize": "150%",
      "valueMaps": [
        {
          "op": "=",
          "text": "0",
          "value": "null"
        }
      ],
      "valueName": "current"
    },
    {
      "cacheTimeout": null,
      "colorBackground": true,
      "colorValue": false,
      "colors": [
        "#82b5d8",
        "rgb(192, 227, 248)",
        "#cffaff"
      ],
      "datasource": DS_IGARA,
      "format": "none",
      "gauge": {
        "maxValue": 100,
        "minValue": 0,
        "show": false,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 5,
        "w": 3,
        "x": 6,
        "y": 11
      },
      "id": 18,
      "interval": null,
      "links": [
        {
          "targetBlank": true,
          "title": "Catalog",
          "type": "absolute",
          "url": "$IGHOST/#/catalog/apps/"
        }
      ],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgba(31, 118, 189, 0.18)",
        "full": false,
        "lineColor": "rgb(31, 120, 193)",
        "show": true
      },
      "tableColumn": "",
      "targets": [
        {
          "alias": "",
          "format": "time_series",
          "hide": false,
          "rawSql": "SELECT\n  $__time(ts),\n  applications\nFROM\n  ex_GOVERNANCE_COVERAGE\nWHERE\n  $__timeFilter(ts)",
          "refId": "A"
        }
      ],
      "thresholds": "",
      "title": "Applications",
      "type": "singlestat",
      "valueFontSize": "150%",
      "valueMaps": [
        {
          "op": "=",
          "text": "0",
          "value": "null"
        }
      ],
      "valueName": "current"
    },
    {
      "cacheTimeout": null,
      "colorBackground": true,
      "colorValue": false,
      "colors": [
        "#badff4",
        "#70dbed",
        "#1f78c1"
      ],
      "datasource": DS_IGARA,
      "format": "none",
      "gauge": {
        "maxValue": 100,
        "minValue": 0,
        "show": false,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 5,
        "w": 3,
        "x": 9,
        "y": 11
      },
      "id": 17,
      "interval": null,
      "links": [
        {
          "targetBlank": true,
          "title": "Details",
          "type": "absolute",
          "url": "$IGHOST/#/catalog/accounts/"
        }
      ],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgba(31, 118, 189, 0.18)",
        "full": false,
        "lineColor": "rgb(31, 120, 193)",
        "show": true
      },
      "tableColumn": "",
      "targets": [
        {
          "alias": "",
          "format": "time_series",
          "hide": false,
          "rawSql": "SELECT\n  $__time(ts),\n  accounts\nFROM\n  ex_GOVERNANCE_COVERAGE\nWHERE\n  $__timeFilter(ts)",
          "refId": "A"
        }
      ],
      "thresholds": "",
      "title": "Accounts",
      "type": "singlestat",
      "valueFontSize": "150%",
      "valueMaps": [
        {
          "op": "=",
          "text": "0",
          "value": "null"
        }
      ],
      "valueName": "current"
    },
    {
      "cacheTimeout": null,
      "colorBackground": true,
      "colorValue": false,
      "colors": [
        "#82b5d8",
        "#82b5d8",
        "#0a437c"
      ],
      "datasource": DS_IGARA,
      "format": "none",
      "gauge": {
        "maxValue": 100,
        "minValue": 0,
        "show": false,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 5,
        "w": 3,
        "x": 12,
        "y": 11
      },
      "id": 6,
      "interval": null,
      "links": [
        {
          "targetBlank": true,
          "title": "Catalog",
          "type": "absolute",
          "url": "$IGHOST/#/catalog/permissions/"
        }
      ],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgba(31, 118, 189, 0.18)",
        "full": false,
        "lineColor": "rgb(31, 120, 193)",
        "show": true
      },
      "tableColumn": "",
      "targets": [
        {
          "alias": "",
          "format": "time_series",
          "hide": false,
          "rawSql": "SELECT\n  $__time(ts),\n  permissions\nFROM\n  ex_GOVERNANCE_COVERAGE\nWHERE\n  $__timeFilter(ts)",
          "refId": "A"
        }
      ],
      "thresholds": "",
      "title": "Permissions",
      "transparent": false,
      "type": "singlestat",
      "valueFontSize": "150%",
      "valueMaps": [
        {
          "op": "=",
          "text": "0",
          "value": "null"
        }
      ],
      "valueName": "current"
    },
    {
      "cacheTimeout": null,
      "colorBackground": true,
      "colorValue": false,
      "colors": [
        "#82b5d8",
        "#64b0c8",
        "#0a437c"
      ],
      "datasource": DS_IGARA,
      "format": "none",
      "gauge": {
        "maxValue": 100,
        "minValue": 0,
        "show": false,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 5,
        "w": 3,
        "x": 15,
        "y": 11
      },
      "id": 12,
      "interval": null,
      "links": [
        {
          "type": "absolute",
          "url": "$IGHOST"
        }
      ],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgba(31, 118, 189, 0.18)",
        "full": false,
        "lineColor": "rgb(31, 120, 193)",
        "show": true
      },
      "tableColumn": "",
      "targets": [
        {
          "alias": "",
          "format": "time_series",
          "hide": false,
          "rawSql": "SELECT\n  $__time(ts),\n  assignments\nFROM\n  ex_GOVERNANCE_COVERAGE\nWHERE\n  $__timeFilter(ts)\n",
          "refId": "A"
        }
      ],
      "thresholds": "",
      "title": "Assignments",
      "type": "singlestat",
      "valueFontSize": "150%",
      "valueMaps": [
        {
          "op": "=",
          "text": "0",
          "value": "null"
        }
      ],
      "valueName": "current"
    },
    {
      "collapsed": false,
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 16
      },
      "id": 20,
      "panels": [],
      "title": "Identity Lifecycle",
      "type": "row"
    },
    {
      "aliasColors": {},
      "bars": false,
      "dashLength": 10,
      "dashes": false,
      "datasource": DS_IGARA,
      "fill": 1,
      "gridPos": {
        "h": 5,
        "w": 18,
        "x": 0,
        "y": 17
      },
      "id": 16,
      "legend": {
        "alignAsTable": true,
        "avg": false,
        "current": false,
        "max": false,
        "min": false,
        "rightSide": true,
        "show": true,
        "total": true,
        "values": true
      },
      "lines": true,
      "linewidth": 1,
      "links": [],
      "nullPointMode": "null",
      "percentage": false,
      "pointradius": 0.5,
      "points": false,
      "renderer": "flot",
      "seriesOverrides": [],
      "spaceLength": 10,
      "stack": false,
      "steppedLine": false,
      "targets": [
        {
          "alias": "",
          "format": "time_series",
          "rawSql": "SELECT\n  $__time(ts),\n  joiners\nFROM\n  ex_IDENTITY_LIFECYCLE\nWHERE\n  $__timeFilter(ts)\n",
          "refId": "A",
          "scenarioId": "random_walk",
          "stringInput": ""
        },
        {
          "alias": "",
          "format": "time_series",
          "hide": false,
          "rawSql": "SELECT\n  $__time(ts),\n  leavers\nFROM\n  ex_IDENTITY_LIFECYCLE\nWHERE\n  $__timeFilter(ts)\n",
          "refId": "B",
          "scenarioId": "random_walk"
        },
        {
          "alias": "",
          "format": "time_series",
          "hide": false,
          "rawSql": "SELECT\n  $__time(ts),\n  profileChanges\nFROM\n  ex_IDENTITY_LIFECYCLE\nWHERE\n  $__timeFilter(ts)\n",
          "refId": "C",
          "scenarioId": "random_walk"
        }
      ],
      "thresholds": [],
      "timeFrom": null,
      "timeShift": null,
      "title": "Joiners, leavers, profile chnages over time",
      "tooltip": {
        "shared": true,
        "sort": 0,
        "value_type": "individual"
      },
      "transparent": false,
      "type": "graph",
      "xaxis": {
        "buckets": null,
        "mode": "time",
        "name": null,
        "show": true,
        "values": []
      },
      "yaxes": [
        {
          "format": "none",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        },
        {
          "format": "short",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        }
      ],
      "yaxis": {
        "align": false,
        "alignLevel": null
      }
    },
    {
      "cacheTimeout": null,
      "colorBackground": true,
      "colorValue": false,
      "colors": [
        "#5195ce",
        "#1f78c1",
        "#64b0c8"
      ],
      "datasource": DS_IGARA,
      "decimals": null,
      "format": "none",
      "gauge": {
        "maxValue": 100,
        "minValue": 0,
        "show": false,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 4,
        "w": 3,
        "x": 0,
        "y": 22
      },
      "id": 22,
      "interval": null,
      "links": [],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgba(31, 118, 189, 0.18)",
        "full": false,
        "lineColor": "rgb(31, 120, 193)",
        "show": true
      },
      "tableColumn": "",
      "targets": [
        {
          "alias": "",
          "format": "time_series",
          "rawSql": "SELECT\n   $__time(ts),\n  joiners\nFROM\n  ex_IDENTITY_LIFECYCLE\nWHERE\n  $__timeFilter(ts)\n",
          "refId": "A"
        }
      ],
      "thresholds": "",
      "title": "Joiners",
      "type": "singlestat",
      "valueFontSize": "150%",
      "valueMaps": [
        {
          "op": "=",
          "text": "0",
          "value": "null"
        }
      ],
      "valueName": "current"
    },
    {
      "circleMaxSize": 30,
      "circleMinSize": 2,
      "colors": [
        "rgba(245, 54, 54, 0.9)",
        "rgba(237, 129, 40, 0.89)",
        "rgba(50, 172, 45, 0.97)"
      ],
      "datasource": DS_IGARA,
      "decimals": 0,
      "esMetric": "Count",
      "gridPos": {
        "h": 4,
        "w": 5,
        "x": 3,
        "y": 22
      },
      "hideEmpty": false,
      "hideZero": false,
      "id": 27,
      "initialZoom": 1,
      "links": [],
      "locationData": "json result",
      "mapCenter": "(0°, 0°)",
      "mapCenterLatitude": 0,
      "mapCenterLongitude": 0,
      "maxDataPoints": 1,
      "showLegend": true,
      "stickyLabels": false,
      "targets": [
        {
          "alias": "",
          "format": "time_series",
          "hide": true,
          "rawSql": "SELECT\n  $__time(ts),\n  joiners as value,\n  city as metric\nFROM\n  ex_JOINERS_BY_LOCATION\nWHERE\n  $__timeFilter(ts)\n",
          "refId": "A"
        }
      ],
      "thresholds": "0,10",
      "title": "Joiners by location",
      "type": "grafana-worldmap-panel",
      "unitPlural": "",
      "unitSingle": "",
      "valueName": "current"
    },
    {
      "cacheTimeout": null,
      "colorBackground": true,
      "colorValue": false,
      "colors": [
        "#5195ce",
        "#82b5d8",
        "#64b0c8"
      ],
      "datasource": DS_IGARA,
      "decimals": null,
      "format": "none",
      "gauge": {
        "maxValue": 100,
        "minValue": 0,
        "show": false,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 4,
        "w": 3,
        "x": 8,
        "y": 22
      },
      "id": 23,
      "interval": null,
      "links": [],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgba(31, 118, 189, 0.18)",
        "full": false,
        "lineColor": "rgb(31, 120, 193)",
        "show": true
      },
      "tableColumn": "",
      "targets": [
        {
          "alias": "",
          "format": "time_series",
          "rawSql": "SELECT\n   $__time(ts),\n  leavers\nFROM\n  ex_IDENTITY_LIFECYCLE\nWHERE\n  $__timeFilter(ts)\n",
          "refId": "A"
        }
      ],
      "thresholds": "",
      "title": "Leavers",
      "type": "singlestat",
      "valueFontSize": "150%",
      "valueMaps": [
        {
          "op": "=",
          "text": "0",
          "value": "null"
        }
      ],
      "valueName": "current"
    },
    {
      "circleMaxSize": 30,
      "circleMinSize": 2,
      "colors": [
        "rgba(245, 54, 54, 0.9)",
        "rgba(237, 129, 40, 0.89)",
        "rgba(50, 172, 45, 0.97)"
      ],
      "datasource": DS_IGARA,
      "decimals": 0,
      "esMetric": "Count",
      "gridPos": {
        "h": 4,
        "w": 4,
        "x": 11,
        "y": 22
      },
      "hideEmpty": false,
      "hideZero": false,
      "id": 28,
      "initialZoom": 1,
      "links": [],
      "locationData": "json result",
      "mapCenter": "(0°, 0°)",
      "mapCenterLatitude": 0,
      "mapCenterLongitude": 0,
      "maxDataPoints": 1,
      "showLegend": true,
      "stickyLabels": false,
      "targets": [
        {
          "alias": "",
          "format": "time_series",
          "hide": true,
          "rawSql": "SELECT\n  $__time(ts),\n  leavers as value,\n  city as metric\nFROM\n  ex_LEAVERS_BY_LOCATION\nWHERE\n  $__timeFilter(ts)\n",
          "refId": "A"
        }
      ],
      "thresholds": "0,10",
      "title": "leavers by location",
      "type": "grafana-worldmap-panel",
      "unitPlural": "",
      "unitSingle": "",
      "valueName": "current"
    },
    {
      "cacheTimeout": null,
      "colorBackground": true,
      "colorValue": false,
      "colors": [
        "#5195ce",
        "#82b5d8",
        "#64b0c8"
      ],
      "datasource": DS_IGARA,
      "decimals": null,
      "format": "none",
      "gauge": {
        "maxValue": 100,
        "minValue": 0,
        "show": false,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 4,
        "w": 3,
        "x": 15,
        "y": 22
      },
      "id": 24,
      "interval": null,
      "links": [],
      "mappingType": 1,
      "mappingTypes": [
        {
          "name": "value to text",
          "value": 1
        },
        {
          "name": "range to text",
          "value": 2
        }
      ],
      "maxDataPoints": 100,
      "nullPointMode": "connected",
      "nullText": null,
      "postfix": "",
      "postfixFontSize": "50%",
      "prefix": "",
      "prefixFontSize": "50%",
      "rangeMaps": [
        {
          "from": "null",
          "text": "N/A",
          "to": "null"
        }
      ],
      "sparkline": {
        "fillColor": "rgba(31, 118, 189, 0.18)",
        "full": false,
        "lineColor": "rgb(31, 120, 193)",
        "show": true
      },
      "tableColumn": "",
      "targets": [
        {
          "alias": "",
          "format": "time_series",
          "hide": true,
          "rawSql": "SELECT\n   $__time(ts),\n  profileChnages\nFROM\n  ex_IDENTITY_LIFECYCLE\nWHERE\n  $__timeFilter(ts)\n",
          "refId": "A"
        }
      ],
      "thresholds": "",
      "title": "Profile Changes",
      "type": "singlestat",
      "valueFontSize": "150%",
      "valueMaps": [
        {
          "op": "=",
          "text": "0",
          "value": "null"
        }
      ],
      "valueName": "current"
    }
  ],
  "refresh": false,
  "schemaVersion": 16,
  "style": "dark",
  "tags": [
    "IG 3.5"
  ],
  "templating": {
    "list": [
      {
        "current": {
          "value": IGHOST,
          "text": IGHOST
        },
        "hide": 2,
        "label": "Identity Governance URL",
        "name": "IGHOST",
        "options": [
          {
            "value": IGHOST,
            "text": IGHOST
          }
        ],
        "query": IGHOST,
        "type": "constant"
      }
    ]
  },
  "time": {
    "from": "2018-06-11T17:41:19.811Z",
    "to": "2018-06-11T17:46:43.686Z"
  },
  "timepicker": {
    "refresh_intervals": [
      "5s",
      "10s",
      "30s",
      "1m",
      "5m",
      "15m",
      "30m",
      "1h",
      "2h",
      "1d"
    ],
    "time_options": [
      "5m",
      "15m",
      "1h",
      "6h",
      "12h",
      "24h",
      "2d",
      "7d",
      "30d"
    ]
  },
  "timezone": "",
  "title": "Identity Governance Insights",
  "uid": "M3adTlnmz",
  "version": 4
}