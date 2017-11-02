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
    }

    private myData: any;

    /**
     * This function calls to get some data from the server.  Change this URL to point
     * to a real REST endpoint on your server.
     */
    getSomeData() {
        let gromitService = this.gromitService;
        let myData = this.myData;

        gromitService.getMyData('/api/', function(data: any) {
            myData = data;
        });
    }
}
