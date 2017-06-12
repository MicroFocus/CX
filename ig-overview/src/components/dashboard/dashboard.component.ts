import { Component } from '../../component.decorator';
import { UserData, Totals } from '../../services/gromit-service';

@Component({
    templateUrl: require('./dashboard.component.html')
})
export default class DashboardComponent {
    private clientid: string = 'iac2';
    private arserver: string = 'http://192.168.0.76:8080';
    private ospserver: string = 'http://192.168.0.76:8080';

    private userName: string;
    private totals: Totals;

    static $inject = ['gromitService'];
    constructor(private gromitService) {
    }

    getSomeData() {
        let gromitService = this.gromitService;
        let dc: DashboardComponent = this;

        gromitService.whoAmI(this.clientid, this.arserver, this.ospserver, function(data: UserData) {
            dc.userName = data.userName;

            gromitService.getTotals(function(totals: Totals) {
                dc.totals = totals;
            });

            gromitService.fetchUsers(function(users: any) {
                console.log('number of users', users.arraySize);

            });

        });
    }
}
