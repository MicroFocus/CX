import { Component } from '../../component.decorator';
import UserService from '../../services/user.service';
import { User } from '../../services/user.service';

@Component({
    templateUrl: require('./registration.component.html')
})
export default class RegistrationComponent {
    private validationErrors: string[];
    private fieldErrors: any;

    private m_fName: string;
    private m_sName: string;
    private m_password: string;
    private m_confirmPassword: string;
    private m_email: string;
    private m_confirmEmail: string;
    private m_postalCode: string;
    private m_policyNumber: string;

    private m_day: string;
    private m_month: string;
    private m_year: string;

    private m_termsConsent: boolean;

    static $inject = ['$state', 'userService'];
    constructor(private $state: angular.ui.IStateService, private userService: UserService) {
        this.validationErrors = [];
    }

    public createUser(): void {
        this.validateFields();

        if (this.validationErrors.length == 0) {
            const user: User  = new User();

            user.fName = this.m_fName;
            user.sName = this.m_sName;
            user.password = this.m_password;
            user.email = this.m_email;
            user.postalCode = this.m_postalCode;
            user.policyNumber = this.m_policyNumber;
            user.birthDate = new Date(parseInt(this.m_year, 10),
                    parseInt(this.m_month, 10) - 1,
                    parseInt(this.m_day, 10));

            this.userService.createUser(user)
                    .then((result: string[]) => {
                        console.warn('result[0]: ' + result[0]);
                        this.$state.go('app.registration-success');
                    })
                    .catch((error) => {
                        this.validationErrors.push(`Status code ${error.status}: ${error.statusText}`);
                    });
        }
    }

    private validateFields() {
        this.fieldErrors = {};
        this.validationErrors = [];

        this.validateFieldHasText('firstName', this.m_fName, 'First name is required.');
        this.validateFieldHasText('surName', this.m_sName, 'Surname is required.');
        this.validateFieldHasText('policyNumber', this.m_policyNumber, 'Policy number is required.');
        this.validateFieldHasText('email', this.m_email, 'Email is required.');
        this.validateFieldHasText('confirmEmail', this.m_confirmEmail, 'Confirmation email is required.');
        this.validateFieldHasText('password', this.m_password, 'Password is required.');
        this.validateFieldHasText('confirmPassword', this.m_confirmPassword, 'Confirmation password is required.');
        this.validateTrue('termsConsent', this.m_termsConsent, 'You must agree to the terms and conditions before' +
                ' you can register.');

        if (this.m_email && this.m_confirmEmail && this.m_email !== this.m_confirmEmail) {
            let errMsg = 'The confirmation email address does not match the email address.';
            this.fieldErrors['confirmEmail'] = errMsg;
            this.validationErrors.push(errMsg);
        }

        if (this.m_password && this.m_confirmPassword && this.m_password !== this.m_confirmPassword) {
            let errMsg = 'The password and confirmation password do not match.';
            this.fieldErrors['confirmPassword'] = errMsg;
            this.validationErrors.push(errMsg);
        }
    }

    private validateFieldHasText(fieldName: string, fieldValue: string, errorMsg: string) {
        if (!fieldValue) {
            this.fieldErrors[fieldName] = errorMsg;
            this.validationErrors.push(errorMsg);
        }
    }

    private validateTrue(fieldName: string, fieldValue: boolean, errorMsg: string) {
        if (!fieldValue) {
            this.fieldErrors[fieldName] = errorMsg;
            this.validationErrors.push(errorMsg);
        }
    }
}
