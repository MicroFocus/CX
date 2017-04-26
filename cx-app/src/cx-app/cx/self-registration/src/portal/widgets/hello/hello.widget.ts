import * as angular from 'angular';
import { NgModule, Inject } from 'ng-metadata/core';

@NgModule( {
    imports: [
        'adf.provider'
    ],
    declarations: [
    ],
    providers: [
        'dashboardProvider'
    ]
} )
export class HelloWidget {
    constructor(@Inject('dashboardProvider') dashboardProvider) {
        console.log('dashboardPrivider: ' + dashboardProvider);

        dashboardProvider
            .widget('hello-widget', {
                title: 'My Hello Widget',
                description: 'This is my first ADF widget',
                templateUrl: '{widgetsPath}/hello-widget/src/hello.widget.html',
                edit: {
                    templateUrl: '{widgetsPath}/hello-widget/src/hello.widget.edit.html'
                }
            });
    }
}

//angular.module('adf.widget.hello-widget', ['adf.provider'])
//    .config(function(dashboardProvider) {
//        dashboardProvider
//            .widget('hello-widget', {
//                title: 'My Hello Widget',
//                description: 'This is my first ADF widget',
//                templateUrl: '{widgetsPath}/hello-widget/src/hello.widget.html',
//                edit: {
//                    templateUrl: '{widgetsPath}/hello-widget/src/hello.widget.edit.html'
//                }
//            });
//    });