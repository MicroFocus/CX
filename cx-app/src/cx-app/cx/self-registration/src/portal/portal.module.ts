import UiRouter from 'angular-ui-router';
import { NgModule } from 'ng-metadata/core';
import { PortalComponent } from "./all.components";

import { HelloWidget } from './widgets/hello';

@NgModule( {
    imports: [
        UiRouter,
        'ng-mfux',
        'adf',
        'adf.structures.base',
        'adf.widget.clock',
        'adf.provider',
        HelloWidget
    ],
    declarations: [
        PortalComponent
    ],
    providers: [
    ]
} )
export class PortalModule {
}
