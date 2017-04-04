import 'angular';
import 'angular-ui-router';
import 'ng-metadata/platform-browser-dynamic';
import 'ng-metadata/core';
import 'ng-metadata/common';

// Import Micro Focus UI library and icons
// Importing this way "undefines" Reflect, since ng-mfux isn't currently compatible with reflect-metadata
import 'imports-loader?Reflect=>{}!ng-mfux/dist/ng-mfux';
import 'mf-icons/dist/mf-icons.css';
// End Micro Focus UI library and icons