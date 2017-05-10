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

    private m_days: Array<Object> = [];
    private m_months: Array<Object> = [];
    private m_years: Array<Object> = [];

    private m_bDay: Object;
    private m_bMonth: Object;
    private m_bYear: Object;
    private m_zip: string;

    private m_officeOptions = [];
    private m_office: Object;

    private m_salut: string;

    private registrationInfo: RegistrationInfo;

    constructor(
        @Inject('$state') private $state,
        private registrationService: RegistrationService
    ) {
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

        this.m_days.push({
            name: 'Day',
            id: 'none'
        });

        for (let i = 0; i < 31; i++) {
            this.m_days.push({
                name: i + 1,
                id: i + 1
            });
        }

        this.m_bDay = this.m_days[0];

        this.m_office = this.m_officeOptions[1];

        this.m_months.push({
            name: 'Month',
            id: -1
        });

        this.m_months.push({
            name: 'Jan',
            id: 1
        });

        this.m_months.push({
            name: 'Feb',
            id: 2
        });

        this.m_months.push({
            name: 'Mar',
            id: 3
        });

        this.m_months.push({
            name: 'Apr',
            id: 4
        });

        this.m_months.push({
            name: 'May',
            id: 5
        });

        this.m_months.push({
            name: 'Jun',
            id: 6
        });

        this.m_months.push({
            name: 'Jul',
            id: 7
        });

        this.m_months.push({
            name: 'Aug',
            id: 8
        });

        this.m_months.push({
            name: 'Sep',
            id: 9
        });

        this.m_months.push({
            name: 'Oct',
            id: 10
        });

        this.m_months.push({
            name: 'Nov',
            id: 11
        });

        this.m_months.push({
            name: 'Dec',
            id: 12
        });

        this.m_bMonth = this.m_months[0];

        this.m_years.push({
            name: 'Year',
            id: -1
        });

        for (let i = 2017; i > 1905; i--) {
            this.m_years.push({
                name: i,
                id: i
            });
        }
        this.m_bYear = this.m_years[0];
    }

    ngOnInit() {
        this.registrationInfo = this.registrationService.getRegistrationInfo();
    }

    public showNext(): void {
        this.registrationInfo.birthDate = new Date(parseInt(this.m_bYear['id'], 10), parseInt(this.m_bMonth['id'], 10) - 1, parseInt(this.m_bDay['id'], 10));
        this.registrationInfo.name = this.m_name;
        this.registrationInfo.famName = this.m_famName;
        this.registrationInfo.jobTitle = this.m_title;
        this.registrationInfo.email = this.m_email;
        this.registrationInfo.location = this.m_office;
        this.registrationInfo.salut = this.m_salut;

        this.$state.go('page3');
    }
}
