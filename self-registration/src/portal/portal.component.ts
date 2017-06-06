import { Component, Inject, OnInit } from 'ng-metadata/core';

@Component( {
    selector: 'portal-root',
    styles: [require( './portal.component.scss' )],
    template: require( './portal.component.html' )
} )
export class PortalComponent implements OnInit {
    private dashboardModel: any;

    constructor(
        @Inject('localStorageService') private localStorageService: ng.local.storage.ILocalStorageService,
        @Inject('$scope') private $scope: ng.IScope
    ) {
        this.dashboardModel = localStorageService.get('portalDashboard');

        $scope.$on('adfDashboardChanged', function(event, name, model) {
            localStorageService.set(name, model);
        });
    }

    ngOnInit() {
    }

}
