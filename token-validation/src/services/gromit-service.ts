declare const gromit: any;

/**
 * The Gromit service provides access to data from the server.
 */
export default class GromitService {
    static $inject = ['$http', '$rootScope', '$window'];

    constructor(private $http) {
    }

    init() {
        gromit.init();
    }

    /**
     * Get a list of users from the server.
     * 
     * @param callback The callback function to get the data.
     */
    getUsers(callback) {
        let http = this.$http;

        gromit.get('/api/users/list', http, function(data) {
            callback(data);
        });
    }
}
