import { Component } from 'ng-metadata/core';

@Component( {
    selector: 'app-page3',
    styles: [require( './page3.component.scss' )],
    template: require( './page3.component.html' )
} )
export class PageThreeComponent {
    private password: string;
    private pwStrengthText: string;
    private pwStrengthClass: string;

    onPasswordChange(): void {
        switch (this.password.length) {
            case 0:
                this.pwStrengthClass = '';
                this.pwStrengthText = '';
                break;

            case 1:
                this.pwStrengthClass = 'mf-icon-strength1';
                this.pwStrengthText = 'Dangerous';
                break;

            case 2:
                this.pwStrengthClass = 'mf-icon-strength2';
                this.pwStrengthText = 'Weak';
                break;

            case 3:
                this.pwStrengthClass = 'mf-icon-strength3';
                this.pwStrengthText = 'Normal';
                break;

            case 4:
                this.pwStrengthClass = 'mf-icon-strength4';
                this.pwStrengthText = 'Strong';
                break;

            default:
                this.pwStrengthClass = 'mf-icon-strength5';
                this.pwStrengthText = 'Stronger';
                break;
        }
    }
}
