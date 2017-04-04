import { RegistrationInfo } from '../shared/registration-info';
import { RegistrationService } from '../shared/registration.service';
import { Component, Inject, OnInit } from 'ng-metadata/core';

@Component({
    selector: 'app-page2',
    styles: [require('./page2.component.scss')],
    template: require('./page2.component.html')
})
export class PageTwoComponent {
    private m_name: string;
    private m_famName: string;
    private m_title: string;
    private m_email: string;
    private m_bDay: string;
    private m_bMonth: string;
    private m_bYear: string;
    private m_zip: string;

    private m_officeOptions = [];
    private m_office: Object;

    private m_salut: string;

    private registrationInfo: RegistrationInfo;

    constructor(private registrationService: RegistrationService) {
        this.m_officeOptions.push({
            name: 'Bangalore',
            id: 'bangalore'
        });

        this.m_officeOptions.push({
            name: 'Cambridge',
            id: 'cambridge'
        });

        this.m_officeOptions.push({
            name: 'Houston',
            id: 'houston'
        });

        this.m_officeOptions.push({
            name: 'Provo',
            id: 'provo'
        });

        this.m_office = this.m_officeOptions[1];
    }

    ngOnInit() {
        this.registrationInfo = this.registrationService.getRegistrationInfo();
    }

    public showNext(): void {
        this.registrationInfo.birthDate = new Date(parseInt(this.m_bYear, 10), parseInt(this.m_bMonth, 10) - 1, parseInt(this.m_bDay, 10));
        this.registrationInfo.name = this.m_name;
        this.registrationInfo.famName = this.m_famName;
        this.registrationInfo.jobTitle = this.m_title;
        this.registrationInfo.email = this.m_email;
        this.registrationInfo.location = this.m_office;
        this.registrationInfo.salut = this.m_salut;
    }
}
