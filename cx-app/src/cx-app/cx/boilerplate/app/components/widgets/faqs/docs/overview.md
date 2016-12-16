# Overview of the ADF

Currently the documentation for the widget development is located at http://wiki.esecurity.net:8090/display/IS/Dashboard+Design+Decisions

# ADF Requirements
ADF Requires:
- Angular application
- Angular gettext

# Sample Widgets
We have two sample widgets, zipped up in an archive, that you can import into Sentinel using the plugins page on Sentinel Main.
- [Download zip file of User List Widget](_assets/samples/user-list-widget.zip)
- [Download zip file of User Profile Widget](_assets/samples/user-profile-widget.zip)

### Sample Widget Directory
- docs folder 
- EULAs
- pacakge.xml (THIS IS IMPORTANT TO GET IT PICKED UP WITH SENTINEL)
- Widget files.  (NOTE: Singular JS file in zipped plugin is required, need to concat all widget files into single JS file.)

# To register widget with the Dashboard Provider

Within the config phase of the widget module, you must register the widget with the `dashboardProvider`. 

```js
var widget = {
    title: "WIDGET TITLE",
    description: "WIDGET DESCRIPTION",
    templateUrl: "/app/components/widgets/path/to/view.html",
    controller: "widgetController as vm",
    edit: {
        templateUrl: "/app/components/widgets/new-alerts/config.html",
        controller: "NewAlertsWidgetConfigController as vm",
        resolve: {
            widgetResolve: widgetResolve,
            widgetPermission: widgetPermissionResolve
        }
    },
    config: {
        starttime: null,
        endtime: null
    },
    resolve: {
        /**
         * @name app.widgets.widgetName.widgetResolve
         * @summary
         *   This is the resolve
         *
         * @param {Function} serviceToInject
         * @returns {boolean}
         */
        widgetResolve: widgetResolve
    }
};
dashboardProvider.widget("widgetName", widget);
```
