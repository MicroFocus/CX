import { SsprService } from '../shared/sspr.service';
import { Component, Inject } from 'ng-metadata/core';

@Component( {
    selector: 'app-page3',
    styles: [require( './page3.component.scss' )],
    template: require( './page3.component.html' )
} )
export class PageThreeComponent {
    private password: string;
    private password2: string;
    private pwStrengthText: string;
    private pwStrengthClass: string;
    private generatedPasswords: string[];
    private showPassword: boolean = false;

    constructor(@Inject('IasDialogService') private IasDialogService, private ssprService: SsprService) {
    }

    onPasswordChange(): void {
        this.updatePasswordStrengthMeter();
    }

    updatePasswordStrengthMeter() {
        // For now, the strength only depends on how many characters are typed:
        switch (this.password.length) {
            case 0:
                this.pwStrengthClass = '';
                this.pwStrengthText = '';
                break;

            case 1:
                this.pwStrengthClass = 'ias-icon-strength1';
                this.pwStrengthText = 'Dangerous';
                break;

            case 2:
                this.pwStrengthClass = 'ias-icon-strength2';
                this.pwStrengthText = 'Weak';
                break;

            case 3:
                this.pwStrengthClass = 'ias-icon-strength3';
                this.pwStrengthText = 'Normal';
                break;

            case 4:
                this.pwStrengthClass = 'ias-icon-strength4';
                this.pwStrengthText = 'Strong';
                break;

            default:
                this.pwStrengthClass = 'ias-icon-strength5';
                this.pwStrengthText = 'Stronger';
                break;
        }
    }

    openGeneratedPasswordsDialog() {
        this.ssprService.getGeneratedPasswords()
            .then((passwords: string[]) => {
                this.generatedPasswords = passwords;
            });

        this.IasDialogService.open({
            controller: this
        }, require('./password-suggestions.html'));
    }

    selectPassword(password: string, closeFn: any) {
        this.password = password;
        this.password2 = password;
        this.onPasswordChange();
        closeFn();
    }

    toggleShowHidePassword() {
        this.showPassword = !this.showPassword;
    }
}
