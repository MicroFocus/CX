import { RegistrationInfo } from '../shared/registration-info';
import { RegistrationService } from '../shared/registration.service';
import { Component, Inject, OnInit } from 'ng-metadata/core';

@Component({
    selector: 'app-page2',
    styles: [require('./page2.component.scss')],
    template: require('./page2.component.html')
})
export class PageTwoComponent {
    public m_name: string;
    public m_famName: string;
    public m_title: string;
    public m_email: string;
    public m_bDay: string;
    public m_bMonth: string;
    public m_bYear: string;
    public m_zip: string;
    
    public m_officeOptions = [];
    public m_office: Object;

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
    }
}
