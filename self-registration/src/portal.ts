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

// Import Micro Focus UI library and icons
// Importing this way "undefines" Reflect, since ng-ias isn't currently compatible with reflect-metadata
import 'imports-loader?Reflect=>{}!@microfocus/ng-ias/dist/ng-ias';
import '@microfocus/ias-icons/dist/ias-icons.css';
// End Micro Focus UI library and icons

import 'angular-local-storage';
import 'angular-base64';

import { platformBrowserDynamic } from 'ng-metadata/platform-browser-dynamic';
import { enableProdMode } from 'ng-metadata/core';
import { PortalModule } from './portal/index';
import './main.css';
import '@microfocus/ias-icons/dist/ias-icons.css';

if ( ENV === 'production' ) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule( PortalModule );
