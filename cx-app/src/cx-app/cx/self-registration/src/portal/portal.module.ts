import UiRouter from 'angular-ui-router';
import { NgModule } from 'ng-metadata/core';
import { PortalComponent } from "./all.components";

@NgModule( {
    imports: [
        UiRouter,
        'ng-mfux',
        'adf',
        'adf.structures.base',
        'adf.widget.clock'
    ],
    declarations: [
        PortalComponent
    ],
    providers: [
    ]
} )
export class PortalModule {
}
