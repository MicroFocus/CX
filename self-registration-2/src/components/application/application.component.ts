import { Component } from '../../component.decorator';

@Component({
    templateUrl: require('./application.component.html')
})
export default class ApplicationComponent {
    static $inject = [];
    constructor() {}
}
