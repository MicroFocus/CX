import * as angular from 'angular';
import { NgModule, Inject, Injectable, Optional } from 'ng-metadata/core';

widgetsProvider.$inject = ['dashboardProvider'];
export function widgetsProvider(dashboardProvider) {
    dashboardProvider.widget('hello-widget', {
        title : 'My Hello Widget',
        description : 'This is my first ADF widget',
        template : require('./hello.widget.html'),
        edit : {
            template : require('./hello.widget.edit.html')
        }
    });
}

@NgModule( {
    imports: [
        'adf.provider'
    ],
    declarations: [
    ],
    providers: [
        widgetsProvider
    ]
} )
export class WidgetsModule {
}
