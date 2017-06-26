import { Component } from '../../component.decorator';

@Component({
    templateUrl: require('./registration.component.html')
})
export default class RegistrationComponent {
    static $inject = [];
    constructor() {}
}
