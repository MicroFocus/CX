import UiRouter from 'angular-ui-router';
import { NgModule } from 'ng-metadata/core';
import { RouterModule } from './shared/router.module';
import { STATES } from './app.routing';
import { AppComponent, PageOneComponent, PageTwoComponent, PageThreeComponent, PageFourComponent } from "./all.components";

@NgModule( {
    imports: [
        UiRouter,
        'ng-mfux'
    ],
    declarations: [
        AppComponent,
        PageOneComponent,
        PageTwoComponent,
        PageThreeComponent,
        PageFourComponent
    ],
    providers: [
        // angular 1 config functions are registered here
        RouterModule.forRoot( STATES )
    ]
} )
export class AppModule {
}
