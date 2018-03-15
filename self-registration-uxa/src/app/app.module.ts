import * as angular from 'angular';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UpgradeModule, downgradeComponent, setAngularJSGlobal } from '@angular/upgrade/static';
import { PageHeaderModule } from '@ux-aspects/ux-aspects';
import '@ux-aspects/ux-aspects/ng1/ux-aspects-ng1';

import { AppComponent } from './app.component';
import { SelfRegistrationModule } from './self-registration/self-registration.module';
import { SelfRegistrationComponent } from './self-registration/self-registration.component';

const routes: Routes = [
  {
    path: 'self-registration',
    component: SelfRegistrationComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'self-registration'
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    UpgradeModule,

    PageHeaderModule,

    SelfRegistrationModule
  ],
  providers: [
    {
      provide: '$rootScope',
      useFactory: (injector: Injector) => injector.get('$rootScope'),
      deps: ['$injector']
    }
  ],
  entryComponents: [
    AppComponent
  ]
})
export class AppModule {

  constructor(private _upgrade: UpgradeModule) { }

  ngDoBootstrap() {
    this._upgrade.bootstrap(document.body, ['app'], { strictDi: true });
  }
}

/*
  AngularJS Module
*/
setAngularJSGlobal(angular);

angular.module('app', ['ux-aspects'])
  .directive('appRoot', downgradeComponent({ component: AppComponent }) as angular.IDirectiveFactory);

