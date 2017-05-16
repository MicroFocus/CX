import UiRouter from 'angular-ui-router';
import { NgModule } from 'ng-metadata/core';
import { RouterModule } from './shared/router.module';
import { STATES } from './app.routing';
import { AppComponent, PageOneComponent, PageTwoComponent, PageThreeComponent, PageFourComponent } from "./all.components";
import { RegistrationService } from './services/registration.service';
import { SsprService } from './services/sspr.service';
import { SsprServiceImpl } from './services/impl/sspr.service.impl';
import { RegistrationServiceImpl } from './services/impl/registration.service.impl';

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
        { provide: 'RegistrationService', useClass: RegistrationServiceImpl },
        { provide: 'SsprService', useClass: SsprServiceImpl }
    ]
} )
export class AppModule {
}
