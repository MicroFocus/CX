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
     * Gets data from the server.  Change the URL to point to your REST API.
     * You can change this function to GET, PUT, POST, DELETE or process the
     * data in any way you'd like.
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
