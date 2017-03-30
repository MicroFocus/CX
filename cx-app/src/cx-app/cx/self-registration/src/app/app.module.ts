import UiRouter from 'angular-ui-router';
import { NgModule } from 'ng-metadata/core';
import { RouterModule } from './shared/router.module';
import { STATES } from './app.routing';
import { AppComponent, PageOneComponent, PageTwoComponent, PageThreeComponent, PageFourComponent, UserPortalComponent } from "./all.components";
import { RegistrationService } from './shared/registration.service';

@NgModule( {
    imports: [
        UiRouter,
        'ng-mfux',
        'adf',
        'adf.structures.base',
        'adf.widget.clock'
    ],
    declarations: [
        AppComponent,
        PageOneComponent,
        PageTwoComponent,
        PageThreeComponent,
        PageFourComponent,
        UserPortalComponent
    ],
    providers: [
        RouterModule.forRoot( STATES ),
        RegistrationService
    ]
} )
export class AppModule {
}
