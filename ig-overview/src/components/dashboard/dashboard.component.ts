import { Component } from '../../component.decorator';

@Component({
    templateUrl: require('./dashboard.component.html')
})
export default class DashboardComponent {
    private clientid: string = 'iac2';
    private arserver: string = 'http://jalbright:8080';
    private ospserver: string = 'http://jalbright:8080';

    static $inject = ['gromitService'];
    constructor(private gromitService) {
    }

    getSomeData() {
        this.gromitService.fetchUsers(this.clientid, this.arserver, this.ospserver, 'bjones');
    }
}
