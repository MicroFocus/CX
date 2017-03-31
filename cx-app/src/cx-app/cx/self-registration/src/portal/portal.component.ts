import { Component, Inject, OnInit } from 'ng-metadata/core';

@Component( {
    selector: 'portal-root',
    styles: [require( './portal.component.scss' )],
    template: require( './portal.component.html' )
} )
export class PortalComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
