import UiRouter from 'angular-ui-router';
import { NgModule } from 'ng-metadata/core';
import { PortalComponent } from "./all.components";

import { HelloWidget } from './widgets/hello';

portalModuleConfig.$inject = ['localStorageServiceProvider'];
function portalModuleConfig(localStorageServiceProvider: ng.local.storage.ILocalStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('adf.portal');
}

@NgModule( {
    imports: [
        UiRouter,
        'ng-ias',
        'adf',
        'adf.structures.base',
        'adf.widget.clock',
        'adf.provider',
        'LocalStorageModule',
        HelloWidget
    ],
    declarations: [
        PortalComponent
    ],
    providers: [
        portalModuleConfig
    ]
} )
export class PortalModule {
}
