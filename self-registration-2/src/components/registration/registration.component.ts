import { Component } from '../../component.decorator';
import UserService from '../../services/user.service';
import { User } from '../../services/user.service';

@Component({
    templateUrl: require('./registration.component.html')
})
export default class RegistrationComponent {
    private validationErrors: string[];

    private m_fName: string;
    private m_sName: string;
    private m_password: string;
    private m_email: string;
    private m_postalCode: string;

    static $inject = ['$state', 'userService'];
    constructor(private $state: angular.ui.IStateService, private userService: UserService) {
        this.validationErrors = [];
    }

    public createUser(): void {
        this.validateField(this.m_fName, 'First name is required.');
        this.validateField(this.m_sName, 'Surname is required.');
        this.validateField(this.m_password, 'Password is required.');
        this.validateField(this.m_email, 'Email is required.');
        this.validateField(this.m_postalCode, 'Post code is required.');

        if (this.validationErrors.length == 0) {
            const user: User  = new User();

            user.fName = this.m_fName;
            user.sName = this.m_sName;
            user.password = this.m_password;
            user.email = this.m_email;
            user.postalCode = this.m_postalCode;

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

    private validateField(field: string, errorMsg: string) {
        if (!field) {
            this.validationErrors.push(errorMsg);
        }
    }
}
