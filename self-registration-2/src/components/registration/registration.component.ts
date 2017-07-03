import { Component } from '../../component.decorator';
import UserService from '../../services/user.service';

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

    constructor(private userService: UserService) {}

    public createUser(): void {
        var user: any  = {};

        user.fName = this.m_fName;
        user.sName = this.m_sName;
        user.password = this.m_password;
        user.email = this.m_email;
        user.postalCode = this.m_postalCode;
        
        user.description = 'This is a user created from our Angular app';

        this.userService.createUser(user).then((result: string[]) => {
                console.warn('result[0]: ' + result[0]);
                alert('The user was created');
            });

    }
}
