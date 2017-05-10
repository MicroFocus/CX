import UiRouter from 'angular-ui-router';
import { NgModule } from 'ng-metadata/core';
import { PortalComponent } from "./all.components";

import { HelloWidget } from './widgets/hello';
import { SsprStatusWidget } from './widgets/sspr-status';

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
        'base64',
        HelloWidget,
        SsprStatusWidget
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
