local IGHOST = std.extVar("IGHOST");
local GHOST = std.extVar("GHOST");
local DS_IGOPS = "DS_IGOPS";
local DS_IGARA = "DS_IGARA";
  {
  "__requires": [
    {
      "type": "grafana",
      "id": "grafana",
      "name": "Grafana",
      "version": "5.1.3"
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
  "iteration": 1529421410003,
  "links": [],
  "panels": [
    {
      "collapsed": false,
      "gridPos": {
        "h": 1,
        "w": 24,
        "x": 0,
        "y": 0
      },
      "id": 30,
      "panels": [],
      "title": "Risk coverage",
      "type": "row"
    },
    {
      "cacheTimeout": null,
      "colorBackground": false,
      "colorValue": true,
      "colors": [
        "#cffaff",
        "#f4d598",
        "#ea6460"
      ],
      "datasource": "DS_IGOPS",
      "format": "none",
      "gauge": {
        "maxValue": 100,
        "minValue": 0,
        "show": true,
        "thresholdLabels": false,
        "thresholdMarkers": true
      },
      "gridPos": {
        "h": 5,
        "w": 3,
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
        "show": false
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
      "title": "Governance risk score",
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
      "datasource": "DS_IGOPS",
      "fill": 1,
      "gridPos": {
        "h": 5,
        "w": 15,
        "x": 3,
        "y": 1
      },
      "id": 33,
      "legend": {
        "alignAsTable": false,
        "avg": false,
        "current": true,
        "max": false,
        "min": false,
        "rightSide": false,
        "show": false,
        "total": false,
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
      "nullPointMode": "null as zero",
      "percentage": false,
      "pointradius": 0.5,
      "points": true,
      "renderer": "flot",
      "seriesOverrides": [],
      "spaceLength": 10,
      "stack": false,
      "steppedLine": false,
      "targets": [
        {
          "alias": "",
          "format": "time_series",
          "hide": false,
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
          "label": "Risk score",
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
      "aliasColors": {},
      "bars": false,
      "dashLength": 10,
      "dashes": false,
      "datasource": "DS_IGARA",
      "description": "Number of applications with risk score in each level",
      "fill": 1,
      "gridPos": {
        "h": 5,
        "w": 9,
        "x": 0,
        "y": 6
      },
      "id": 25,
      "legend": {
        "alignAsTable": true,
        "avg": false,
        "current": true,
        "hideZero": false,
        "max": false,
        "min": false,
        "rightSide": true,
        "show": true,
        "sideWidth": null,
        "sort": null,
        "sortDesc": null,
        "total": false,
        "values": true
      },
      "lines": true,
      "linewidth": 1,
      "links": [],
      "nullPointMode": "null as zero",
      "percentage": false,
      "pointradius": 1,
      "points": true,
      "renderer": "flot",
      "seriesOverrides": [],
      "spaceLength": 10,
      "stack": false,
      "steppedLine": false,
      "targets": [
        {
          "alias": "",
          "format": "time_series",
          "hide": false,
          "rawSql": "SELECT\n  $__time(ts),\n  low_risk as low\nFROM\n  ex_app_risk_by_level\nWHERE\n  $__timeFilter(ts)\n",
          "refId": "A",
          "scenarioId": "random_walk",
          "stringInput": ""
        },
        {
          "alias": "",
          "format": "time_series",
          "hide": false,
          "rawSql": "SELECT\n  $__time(ts),\n  mild_risk as mild\nFROM\n  ex_APP_RISK_BY_LEVEL\nWHERE\n  $__timeFilter(ts)\n",
          "refId": "B",
          "scenarioId": "random_walk"
        },
        {
          "alias": "",
          "format": "time_series",
          "hide": false,
          "rawSql": "SELECT\n  $__time(ts),\n  medium_risk as medium\nFROM\n  ex_APP_RISK_BY_LEVEL\nWHERE\n  $__timeFilter(ts)",
          "refId": "D",
          "scenarioId": "random_walk"
        },
        {
          "alias": "",
          "format": "time_series",
          "rawSql": "SELECT\n  $__time(ts),\n  high_risk as high\nFROM\n  ex_APP_RISK_BY_LEVEL\nWHERE\n  $__timeFilter(ts)",
          "refId": "E",
          "scenarioId": "random_walk"
        },
        {
          "alias": "",
          "format": "time_series",
          "hide": false,
          "rawSql": "SELECT\n  $__time(ts),\n  critical_risk as critical\nFROM\n  ex_APP_RISK_BY_LEVEL\nWHERE\n  $__timeFilter(ts)\n",
          "refId": "F"
        }
      ],
      "thresholds": [],
      "timeFrom": null,
      "timeShift": null,
      "title": "Application risk",
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
      "aliasColors": {},
      "bars": false,
      "dashLength": 10,
      "dashes": false,
      "datasource": "DS_IGARA",
      "description": "Number of users with risk score in each level",
      "fill": 1,
      "gridPos": {
        "h": 5,
        "w": 9,
        "x": 9,
        "y": 6
      },
      "id": 35,
      "legend": {
        "alignAsTable": true,
        "avg": false,
        "current": true,
        "hideZero": false,
        "max": false,
        "min": false,
        "rightSide": true,
        "show": true,
        "total": false,
        "values": true
      },
      "lines": true,
      "linewidth": 1,
      "links": [],
      "nullPointMode": "null",
      "percentage": false,
      "pointradius": 1,
      "points": true,
      "renderer": "flot",
      "seriesOverrides": [],
      "spaceLength": 10,
      "stack": false,
      "steppedLine": false,
      "targets": [
        {
          "alias": "",
          "format": "time_series",
          "hide": false,
          "rawSql": "SELECT\n  $__time(ts),\n  lowRisk as low\nFROM\n  ex_USER_RISK_BY_LEVEL\nWHERE\n  $__timeFilter(ts)\n",
          "refId": "A",
          "scenarioId": "random_walk",
          "stringInput": ""
        },
        {
          "alias": "",
          "format": "time_series",
          "hide": false,
          "rawSql": "SELECT\n  $__time(ts),\n  mildRisk as mild\nFROM\n  ex_USER_RISK_BY_LEVEL\nWHERE\n  $__timeFilter(ts)\n",
          "refId": "B",
          "scenarioId": "random_walk"
        },
        {
          "alias": "",
          "format": "time_series",
          "rawSql": "SELECT\n  $__time(ts),\n  mediumRisk as medium\nFROM\n  ex_USER_RISK_BY_LEVEL\nWHERE\n  $__timeFilter(ts)",
          "refId": "D",
          "scenarioId": "random_walk"
        },
        {
          "alias": "",
          "format": "time_series",
          "rawSql": "SELECT\n  $__time(ts),\n  highRisk as high\nFROM\n  ex_USER_RISK_BY_LEVEL\nWHERE\n  $__timeFilter(ts)",
          "refId": "E",
          "scenarioId": "random_walk"
        },
        {
          "alias": "",
          "format": "time_series",
          "hide": false,
          "rawSql": "SELECT\n  $__time(ts),\n  criticalRisk as critical\nFROM\n  ex_USER_RISK_BY_LEVEL\nWHERE\n  $__timeFilter(ts)\n",
          "refId": "F"
        }
      ],
      "thresholds": [],
      "timeFrom": null,
      "timeShift": null,
      "title": "User risk",
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
        "y": 11
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
      "datasource": "DS_IGARA",
      "description": "Changes in number of users, accounts, groups, permissions, applications and assignments over time",
      "fill": 1,
      "gridPos": {
        "h": 5,
        "w": 18,
        "x": 0,
        "y": 12
      },
      "id": 34,
      "legend": {
        "alignAsTable": true,
        "avg": false,
        "current": true,
        "max": false,
        "min": false,
        "rightSide": true,
        "show": true,
        "total": false,
        "values": true
      },
      "lines": true,
      "linewidth": 1,
      "links": [
        {
          "title": "IG Catalog",
          "type": "absolute",
          "url": "$IGHOST/#/catalog/users"
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
          "rawSql": "SELECT\n  $__time(ts),\n  users as identities\nFROM\n  ex_GOVERNANCE_COVERAGE\nWHERE\n  $__timeFilter(ts)\n",
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
          "hide": false,
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
        "#e0f9d7",
        "rgb(189, 230, 176)",
        "#b7dbab"
      ],
      "datasource": "DS_IGARA",
      "description": "Number of identities managed by Identity Governance",
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
        "y": 17
      },
      "id": 8,
      "interval": null,
      "links": [
        {
          "dashboard": "$IGHOST/#/catalog/users/",
          "targetBlank": true,
          "title": "IG identity catalog",
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
        "show": false
      },
      "tableColumn": "",
      "targets": [
        {
          "alias": "",
          "format": "time_series",
          "hide": false,
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
        "#f4d598",
        "#f4d598",
        "#f4d598"
      ],
      "datasource": "DS_IGARA",
      "description": "Number of groups managed by Identity Governance",
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
        "x": 3,
        "y": 17
      },
      "id": 10,
      "interval": null,
      "links": [
        {
          "targetBlank": true,
          "title": "IG group catalog",
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
        "show": false
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
      "datasource": "DS_IGARA",
      "description": "Number of applications managed by Identity Governance",
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
        "x": 6,
        "y": 17
      },
      "id": 18,
      "interval": null,
      "links": [
        {
          "targetBlank": true,
          "title": "IG application catalog",
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
        "show": false
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
        "#ef843c",
        "#ef843c",
        "#ef843c"
      ],
      "datasource": "DS_IGARA",
      "description": "Number of accounts managed by Identity Governance",
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
        "x": 9,
        "y": 17
      },
      "id": 17,
      "interval": null,
      "links": [
        {
          "targetBlank": true,
          "title": "IG account catalog",
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
        "show": false
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
        "#ea6460",
        "#ea6460",
        "#ea6460"
      ],
      "datasource": "DS_IGARA",
      "description": "Number of permissions managed by Identity Governance",
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
        "x": 12,
        "y": 17
      },
      "id": 6,
      "interval": null,
      "links": [
        {
          "targetBlank": true,
          "title": "IG permission catalog",
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
        "show": false
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
      "datasource": "DS_IGARA",
      "description": "Number of assignments managed by Identity Governance",
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
        "y": 17
      },
      "id": 12,
      "interval": null,
      "links": [
        {
          "targetBlank": true,
          "title": "Identity Governance",
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
        "show": false
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
        "y": 21
      },
      "id": 20,
      "panels": [],
      "title": "Identity lifecycle",
      "type": "row"
    },
    {
      "aliasColors": {},
      "bars": false,
      "dashLength": 10,
      "dashes": false,
      "datasource": "DS_IGARA",
      "description": "Number of identities added, removed or modified in Identity Governance catalog over the time",
      "fill": 1,
      "gridPos": {
        "h": 5,
        "w": 18,
        "x": 0,
        "y": 22
      },
      "id": 16,
      "legend": {
        "alignAsTable": true,
        "avg": false,
        "current": true,
        "max": false,
        "min": false,
        "rightSide": true,
        "show": true,
        "total": false,
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
          "rawSql": "SELECT\n  $__time(ts),\n  profileChanges as changes\nFROM\n  ex_IDENTITY_LIFECYCLE\nWHERE\n  $__timeFilter(ts)\n",
          "refId": "C",
          "scenarioId": "random_walk"
        }
      ],
      "thresholds": [],
      "timeFrom": null,
      "timeShift": null,
      "title": "Joiners, leavers, profile changes over time",
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
        "#9ac48a",
        "#9ac48a",
        "#9ac48a"
      ],
      "datasource": "DS_IGARA",
      "decimals": null,
      "description": "Number of identities added to catalog in the last 24 hours",
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
        "y": 27
      },
      "id": 22,
      "interval": null,
      "links": [
        {
          "targetBlank": true,
          "title": "IG identity catalog",
          "type": "absolute",
          "url": "$IGHOST/#/catalog/users"
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
        "#badff4",
        "#b7dbab",
        "#e5a8e2"
      ],
      "datasource": "DS_IGARA",
      "decimals": 0,
      "description": "Number of identities added to catalog in the last 24 hours by location",
      "esMetric": "Count",
      "gridPos": {
        "h": 4,
        "w": 5,
        "x": 3,
        "y": 27
      },
      "hideEmpty": true,
      "hideZero": true,
      "id": 27,
      "initialZoom": 1,
      "jsonUrl": "$GHOST/static/democities.json",
      "links": [],
      "locationData": "json endpoint",
      "mapCenter": "North America",
      "mapCenterLatitude": 40,
      "mapCenterLongitude": -100,
      "maxDataPoints": 1,
      "showLegend": true,
      "stickyLabels": false,
      "targets": [
        {
          "alias": "",
          "format": "time_series",
          "hide": false,
          "rawSql": "SELECT\n  ts as time,\n  joiners as value,\n  location as metric\nFROM\n  ex_joiners_by_location\nWHERE\n  $__timeFilter(ts) and location is not null",
          "refId": "A"
        }
      ],
      "thresholds": "0,10",
      "timeFrom": "24h",
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
        "#f4d598",
        "#f4d598",
        "#f4d598"
      ],
      "datasource": "DS_IGARA",
      "decimals": null,
      "description": "Number of identities removed from catalog in the last 24 hours",
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
        "y": 27
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
        "#badff4",
        "#b7dbab",
        "#f9d9f9"
      ],
      "datasource": "DS_IGARA",
      "decimals": 0,
      "description": "Number of identities removed from catalog in the last 24 hours by location",
      "esMetric": "Count",
      "gridPos": {
        "h": 4,
        "w": 4,
        "x": 11,
        "y": 27
      },
      "hideEmpty": true,
      "hideZero": true,
      "id": 28,
      "initialZoom": 1,
      "jsonUrl": "$GHOST/static/democities.json",
      "links": [],
      "locationData": "json endpoint",
      "mapCenter": "North America",
      "mapCenterLatitude": 40,
      "mapCenterLongitude": -100,
      "maxDataPoints": 1,
      "showLegend": true,
      "stickyLabels": false,
      "targets": [
        {
          "alias": "",
          "format": "time_series",
          "hide": false,
          "rawSql": "SELECT\n  ts as time,\n  leavers as value,\n  location as metric\nFROM\n  ex_leavers_by_location\nWHERE\n  $__timeFilter(ts) and location is not null\n",
          "refId": "A"
        }
      ],
      "thresholds": "5,10",
      "timeFrom": "24h",
      "timeShift": null,
      "title": "Leavers by location",
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
      "datasource": "DS_IGARA",
      "decimals": null,
      "description": "Number of identities with profile changes in the last 24 hours",
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
        "y": 27
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
          "hide": false,
          "rawSql": "SELECT\n   $__time(ts),\n  profileChanges\nFROM\n  ex_IDENTITY_LIFECYCLE\nWHERE\n  $__timeFilter(ts)\n",
          "refId": "A"
        }
      ],
      "thresholds": "",
      "title": "Profile changes",
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
  "refresh": "30s",
  "schemaVersion": 16,
  "style": "dark",
  "tags": [
    "IG 3.5"
  ],
  "templating": {
    "list": [
      {
        "current": {
          "value": "${VAR_IGHOST}",
          "text": "${VAR_IGHOST}"
        },
        "hide": 2,
        "label": "Identity Governance URL",
        "name": "IGHOST",
        "options": [
          {
            "value": "${VAR_IGHOST}",
            "text": "${VAR_IGHOST}"
          }
        ],
        "query": "${VAR_IGHOST}",
        "type": "constant"
      },
      {
        "current": {
          "value": "${VAR_GHOST}",
          "text": "${VAR_GHOST}"
        },
        "hide": 2,
        "label": "Grafana server URL",
        "name": "GHOST",
        "options": [
          {
            "value": "${VAR_GHOST}",
            "text": "${VAR_GHOST}"
          }
        ],
        "query": "${VAR_GHOST}",
        "type": "constant"
      }
    ]
  },
  "time": {
    "from": "now-7d",
    "to": "now"
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
  "title": "AAF Governance Insights (dev1)",
  "uid": "M8adTlnmz2",
  "version": 13
}