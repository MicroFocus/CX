import { Component } from '../../component.decorator';
import { UserData, Totals } from '../../services/gromit-service';

@Component({
    templateUrl: require('./dashboard.component.html')
})
export default class DashboardComponent {
    private clientid = 'iac2';
    private arserver = 'http://192.168.0.76:8080';
    private ospserver = 'http://192.168.0.76:8080';

    private userName: string;
    private totals: Totals;

    static $inject = ['gromitService'];
    constructor(private gromitService) {
    }

    getSomeData() {
        let gromitService = this.gromitService;
        let dc: DashboardComponent = this;

        gromitService.whoAmI(this.clientid, this.ospserver, this.arserver, function(data: UserData) {
            dc.userName = data.userName;

            gromitService.getTotals(function(totals: Totals) {
                dc.totals = totals;
            });
        });
    }
}
