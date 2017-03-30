import { Component, Inject, OnInit } from 'ng-metadata/core';

@Component( {
    selector: 'app-user-portal',
    styles: [require( './user-portal.component.scss' )],
    template: require( './user-portal.component.html' )
} )
export class UserPortalComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
