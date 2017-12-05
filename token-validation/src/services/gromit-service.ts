declare const gromit: any;

/**
 * The Gromit service provides access to data from the server.
 */
export default class GromitService {
    static $inject = ['$http', '$rootScope', '$window'];

    constructor(private $http) {
    }

    init() {
        /*
         * By default Gromit includes some general CSS files like reset.css.  We
         * aren't loading those in this project so we set the addCSS property in
         * Gromit to false.  However, we still want to show Gromit style error
         * messages so we are loading the humanMsg.css and we've added styling for
         * the Gromit fatal error message panel to our main.scss.
         */
        gromit.addCSS = false;
        gromit.addCSSLink('gromit/css/humanMsg.css');
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
     * Logout the current user and refresh the page.
     */
    doLogout() {
        gromit.doLogout();
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
        }, function(code, subcode, reason) {
            /*
             * This function gets called if we have an error in the special Micro Focus error
             * format.  This error format is returned from most of the Micro Focus REST endpoints
             * and gives us extra information like error codes and subcodes so we can do more
             * specific error handling.
             */
            gromit.showGeneralError(code, subcode, reason);
        }, function(data) {
            // This function gets called for general errors.
            gromit.showFatalError(data.error);
        });
    }

    /**
     * Gets additional information about the current user from the token.  This
     * call will prompt the user to log in if they haven't already.
     *
     * @param callback The callback function to get the data.
     */
    getUserAttributes(callback) {
        let http = this.$http;

        gromit.get('/api/osp/attributes', http, function(data) {
            callback(data);
        }, function(code, subcode, reason) {
            /*
             * This function gets called if we have an error in the special Micro Focus error
             * format.  This error format is returned from most of the Micro Focus REST endpoints
             * and gives us extra information like error codes and subcodes so we can do more
             * specific error handling.
             */
            gromit.showGeneralError(code, subcode, reason);
        }, function(data) {
            // This function gets called for general errors.
            gromit.showFatalError(data.error);
        });
    }
}
