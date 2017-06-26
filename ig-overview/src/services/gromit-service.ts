declare const gromit: any;

/**
 * The user data struct contains information about the currently logged in user.
 */
export class UserData {
    userName: string;
    userId: Number;

    constructor(userName: string, userId: Number) {
        this.userName = userName;
        this.userId = userId;

    }
}

/**
 * A total is a struct containing the type and count of an object on the IG server.
 */
export class Total {
    type: string;
    count: Number;

    constructor(type: string, count: Number) {
        this.type = type;
        this.count = count;
    }
}

/**
 * The Totals class handles parsing and returning data about the totals on the IG server
 */
export class Totals {
    private totalsMap: Object = {};
    private totals: Array<Total> = new Array<Total>();

    constructor(totals: any) {
        for (let total of totals.entities) {
            this.totalsMap[total.entityType] = total.entityCount;
            this.totals.push(new Total(total.entityType, Number(total.entityCount)));
        }
    }

    /**
     * Gets the total for a specific type.
     * 
     * @param type The type you want the total for
     */
    getTotal(type: string): Number {
        return Number(this.totalsMap[type]);
    }

    /**
     * Get all of the totals as an array of Total objects
     */
    getTotals(): Array<Total> {
        return this.totals;
    }
}

/**
 * The Gromit service provides access to data from the IG server.
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
     * Get data about the current logged in user.  This will prompt the user to log in
     * if they haven't already done so.
     * 
     * @param clientid The client ID of this app
     * @param authserver The authentication server UDL
     * @param apiserver The API server URL
     * @param callback The callback function to get the data.
     */
    whoAmI(clientid, authserver, apiserver, callback) {
        let http = this.$http;
        gromit.ClientId = clientid;
        this.apiserver = apiserver;

        gromit.AuthUrl = authserver + '/osp/a/idm/auth/oauth2/grant';
        gromit.AuthLogoutUrl = authserver + '/osp/a/idm/auth/app/logout';
        gromit.get(apiserver + '/api/whoami', http, function(data) {
            this.user = data.principal;
            callback(new UserData(data.principal, data.userId));
        });
    }

    /**
     * Get a list of the first 50 users from the IG server
     * 
     * @param callback The callback for the user data
     */
    fetchUsers(callback) {
        if (gromit.ClientId == null) {
            throw new Error('You must call who am I before making other calls.');
        }
        let http = this.$http;

        let url = this.apiserver + '/api/data/users/search/?sortBy=displayName&sortOrder=ASC&indexFrom=0&size=50&showCt=true&listAttr=displayName&listAttr=jobTitle&qMatch=ANY';

        gromit.post(url, http, '{}', function(data) {
            callback(data);
        });
    }

    /**
     * Get the information about total object counts from the IG server
     * 
     * @param callback The callback for the Totals object
     */
    getTotals(callback) {
        if (gromit.ClientId == null) {
            throw new Error('You must call who am I before making other calls.');
        }

        gromit.get(this.apiserver + '/api/data/totals/', this.$http, function(data) {
            callback(new Totals(data));
        });
    }
}
