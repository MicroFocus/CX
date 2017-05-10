import 'angular';
import 'angular-ui-router';
import 'angular-base64';
import 'ng-metadata/platform-browser-dynamic';
import 'ng-metadata/core';
import 'ng-metadata/common';

// Import Micro Focus UI library and icons
// Importing this way "undefines" Reflect, since ng-ias isn't currently compatible with reflect-metadata
import 'imports-loader?Reflect=>{}!ng-ias/dist/ng-ias';
import 'ias-icons/dist/ias-icons.css';
// End Micro Focus UI library and icons
