import { Component } from '../../component.decorator';
import UserService from '../../services/user.service';
import { User } from '../../services/user.service';

@Component({
    templateUrl: require('./registration.component.html')
})
export default class RegistrationComponent {
    static $inject = ['userService'];

    private m_fName: string;
    private m_sName: string;
    private m_password: string;
    private m_email: string;
    private m_postalCode: string;
    private m_policyNumber: string;

    private m_day: string;
    private m_month: string;
    private m_year: string;

    constructor(private userService: UserService) {}

    public createUser(): void {
        var user: User  = new User();

        user.fName = this.m_fName;
        user.sName = this.m_sName;
        user.password = this.m_password;
        user.email = this.m_email;
        user.postalCode = this.m_postalCode;
        user.policyNumber = this.m_policyNumber;
        user.birthDate = new Date(parseInt(this.m_year, 10), 
                                  parseInt(this.m_month, 10) - 1, 
                                  parseInt(this.m_day, 10));

        this.userService.createUser(user).then((result: string[]) => {
                console.warn('result[0]: ' + result[0]);
                alert('The user was created');
            });

    }
}
