import UiRouter from 'angular-ui-router';
import { NgModule } from 'ng-metadata/core';
import { RouterModule } from './shared/router.module';
import { STATES } from './app.routing';
import { AppComponent, PageOneComponent, PageTwoComponent, PageThreeComponent, PageFourComponent } from "./all.components";
import { RegistrationService } from './shared/registration.service';
import { SsprService } from './shared/sspr.service';

@NgModule( {
    imports: [
        UiRouter,
        'ng-ias',
        'base64'
    ],
    declarations: [
        AppComponent,
        PageOneComponent,
        PageTwoComponent,
        PageThreeComponent,
        PageFourComponent
    ],
    providers: [
        RouterModule.forRoot( STATES ),
        RegistrationService,
        SsprService
    ]
} )
export class AppModule {
}
