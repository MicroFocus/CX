import { Component } from '../../component.decorator';

@Component({
    templateUrl: require('./registration-success.component.html')
})
export default class RegistrationSuccessComponent {
    static $inject = ['userService'];

    constructor() {}
}
