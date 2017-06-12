declare const gromit: any;

export class UserData {
    userName: string;
    userId: Number;

    constructor(userName: string, userId: Number) {
        this.userName = userName;
        this.userId = userId;

    }
}

export class Totals {
    private totals: Object;

    constructor(totals: any) {
        this.totals = {};
        for (let total of totals.entities) {
            this.totals[total.entityType] = total.entityCount;
        }
    }

    getTotal(type: string): Number {
        return Number(this.totals[type]);
    }
}

export default class GromitService {
    static $inject = ['$http', '$rootScope', '$window'];
    private apiserver: string;

    constructor(private $http) {
    }

    init() {
        gromit.init();

        // gromit.addCSSLink('css/lib/bootstrap.min.css');
        // gromit.addCSSLink('css/lib/rainbow.css');
        // gromit.addCSSLink('css/gromitsample.css');
    }

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

    getTotals(callback) {
        if (gromit.ClientId == null) {
            throw new Error('You must call who am I before making other calls.');
        }
        let http = this.$http;

        let url = this.apiserver + '/api/data/totals/';

        gromit.get(url, http, function(data) {
            callback(new Totals(data));
        });
    }
}
