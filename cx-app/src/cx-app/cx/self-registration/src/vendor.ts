import 'angular';
import 'angular-ui-router';
import 'ng-metadata/platform-browser-dynamic';
import 'ng-metadata/core';
import 'ng-metadata/common';

// For some reason, this doesn't work.  You have to use it in a script tag, otherwise you get an "Uncaught TypeError"
// import 'ng-mfux/dist/ng-mfux';

// Here is everything needed for Angular Dashboard Framework
// ADF Stylesheets:
import 'bootstrap/dist/css/bootstrap.css';
import 'angular-dashboard-framework/dist/angular-dashboard-framework.css';
import 'adf-widget-clock/dist/adf-widget-clock.css';
// ADF Scripts
import 'angular-ui-bootstrap/dist/ui-bootstrap-tpls';
import 'imports-loader?Sortable=sortablejs!angular-dashboard-framework/dist/angular-dashboard-framework-tpls';
import 'adf-structures-base/dist/adf-structures-base';
import 'imports-loader?moment!adf-widget-clock/dist/adf-widget-clock';
// End Angular Dashboard Framework