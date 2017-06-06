import { RegistrationInfo, RegistrationService } from '../services/registration.service';
import { Component, Inject, OnInit } from 'ng-metadata/core';

@Component( {
    selector: 'app-page4',
    styles: [require( './page4.component.scss' )],
    template: require( './page4.component.html' )
} )
export class PageFourComponent implements OnInit {
    private registrationInfo: RegistrationInfo;
    private message: string;

    constructor(
        @Inject('RegistrationService') private registrationService: RegistrationService
    ) {
    }

    ngOnInit() {
        this.registrationInfo = this.registrationService.getRegistrationInfo();
    }

    createAccount() {
        window.location.href = '/portal.html';
    }
}
