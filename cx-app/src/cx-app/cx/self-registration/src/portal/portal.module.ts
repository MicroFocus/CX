import UiRouter from 'angular-ui-router';
import { NgModule } from 'ng-metadata/core';
import { PortalComponent } from "./all.components";

import { WidgetsModule } from './widgets/hello/hello.widget';

@NgModule( {
    imports: [
        UiRouter,
        'ng-mfux',
        'adf',
        'adf.structures.base',
        'adf.widget.clock',
        WidgetsModule
    ],
    declarations: [
        PortalComponent
    ],
    providers: [
    ]
} )
export class PortalModule {
}
