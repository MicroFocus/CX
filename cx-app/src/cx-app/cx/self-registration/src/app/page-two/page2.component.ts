import {Component} from 'ng-metadata/core';

@Component({
    selector: 'app-page2',
    styles: [require('./page2.component.scss')],
    template: require('./page2.component.html')
})
export class PageTwoComponent {
    public m_name;
    public m_famName;
    public m_title;
    public m_email;
    public m_bDay;
    public m_bMonth;
    public m_bYear;
    public m_zip;
    public m_birth;
    
    public m_officeOptions = [];
    public m_office;

    constructor() {
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

    public showNext(): void {
        console.log('m_name: ' + this.m_name);
        this.m_birth = new Date(parseInt(this.m_bYear, 10), parseInt(this.m_bMonth, 10) - 1, parseInt(this.m_bDay, 10));

        console.log('m_birth: ' + this.m_birth);
    }
}
