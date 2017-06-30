import { Component } from '../../component.decorator';
import UserService from '../../services/user.service';

@Component({
    templateUrl: require('./registration.component.html')
})
export default class RegistrationComponent {
    static $inject = ['userService'];

    private m_fName: string = 'Zack';
    private m_sName: string = 'Zack Test From Angular';

    constructor(private userService: UserService) {}

    public createUser(): void {
        var user: any  = {};

        user.fName = this.m_fName;
        user.lName = this.m_sName;
        user.description = 'This is a user created from our Angular app';

        this.userService.createUser(user).then((result: string[]) => {
                console.warn('result[0]: ' + result[0]);
                alert('The user was created');
            });

    }
}
