declare const gromit: any;

/**
 * The Gromit service provides access to data from the server.
 */
export default class GromitService {
    static $inject = ['$http', '$rootScope', '$window'];

    constructor(private $http) {
    }

    init() {
        gromit.addCSSLink = function() {
            /*
             * We are doing this so we don't get the Gromit CSS.  Gromit has added
             * a real flag for this in the latest release, but it isn't out yet.
             */
        };
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

    /**
     * Gets information about the current user from the token.  This call
     * will prompt the user to log in if they haven't already.
     * 
     * @param callback The callback function to get the data.
     */
    getTokenInfo(callback) {
        let http = this.$http;

        gromit.get('/api/osp/token', http, function(data) {
            callback(data);
        });
    }
}
