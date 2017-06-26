import { Component } from '../../component.decorator';

@Component({
    templateUrl: require('./dashboard.component.html')
})
export default class DashboardComponent {
    static $inject = [];
    constructor() {}
}
