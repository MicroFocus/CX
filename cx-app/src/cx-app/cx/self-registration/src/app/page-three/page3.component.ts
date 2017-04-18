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

    constructor(@Inject('MfDialogService') private mfDialogService) {
    }

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

    openGeneratedPasswordsDialog() {
        this.generatedPasswords = [
            "sucti9on",
            "compi\ler",
            "benef-its",
            "fibhl5re",
            "p2unyrent",
            "pers7oiN",
            "infuriatwes",
            "mark!ers",
            "refun.d",
            "epl7thic",
            "cam+els",
            "debati)ng",
            "coliwa!kE",
            "scl,5osEt",
            "cNfde7ration",
            "moratOriu9m",
            "Numeri=c",
            "d3oubter",
            "f7reksth",
            "di7sputed"
        ];

        this.mfDialogService.open({
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
