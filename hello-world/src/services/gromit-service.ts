declare const gromit: any;

/**
 * The Gromit service provides access to data from the server.
 */
export default class GromitService {
    static $inject = ['$http', '$rootScope', '$window'];
    private apiserver: string;

    constructor(private $http) {
    }

    init() {
        gromit.init();
    }

    /**
     * Gets date from the server.  Change the URL to point to your REST API.
     *
     * @param apiserver The base URL of your API server
     * @param callback The callback function to get the data.
     */
    getMyData(apiserver: string, callback) {
        let http = this.$http;
        this.apiserver = apiserver;

        gromit.get(apiserver + 'someData', http, function(data) {
            callback(data);
        });
    }
}
