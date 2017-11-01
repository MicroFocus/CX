import { Component } from '../../component.decorator';

@Component({
    templateUrl: require('./application.component.html')
})

/**
 * This is the TypeScript controller for our application component.  It has a single
 * function call which invokes the Gromit Service.  You can add more calls to the 
 * Gromit Service to make more REST calls.
 */
export default class ApplicationComponent {
    static $inject = ['gromitService'];
    constructor(private gromitService) {

        this.getTokenInfo();
    }

    private users = [];
    private tokenInfo: any;

    /**
     * Load users from the middle tier and add them to the users array
     */
    getUsers() {
        let gromitService = this.gromitService;
        this.users = [];
        let users = this.users;

        gromitService.getUsers(function(data: any) {
            for (let user of data) {
                users.push(user);
            }
        });
    }

    /**
     * Load information about the current user
     */
    getTokenInfo() {
        let gromitService = this.gromitService;
        let appComp = this;

        gromitService.getTokenInfo(function(data: any) {
            appComp.tokenInfo = data;

            /*
             * We want to wait until we finish getting token information before
             * we call for more information in the server.  This is more efficient
             * since it means we only have to replay one REST call instead of 
             * multiple calls.
             */
            appComp.getUsers();
        });
    }
}
