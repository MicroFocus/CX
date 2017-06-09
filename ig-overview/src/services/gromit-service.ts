declare const gromit: any;

export default class GromitService {
    static $inject = ['$http', '$rootScope', '$window'];
    constructor(private $http) {
    }

    init() {
        gromit.init();

        // gromit.addCSSLink('css/lib/bootstrap.min.css');
        // gromit.addCSSLink('css/lib/rainbow.css');
        // gromit.addCSSLink('css/gromitsample.css');
    }

    fetchUsers(clientid, authserver, apiserver) {
        gromit.ClientId = clientid;

        gromit.AuthUrl = authserver + '/osp/a/idm/auth/oauth2/grant';
        gromit.AuthLogoutUrl = authserver + '/osp/a/idm/auth/app/logout';
        gromit.get(apiserver + '/api/whoami', this.$http, function(data) {
            const url = apiserver + '/api/data/users/search/?sortBy=displayName&sortOrder=ASC&indexFrom=0&size=50&showCt=true&listAttr=displayName&listAttr=jobTitle&qMatch=ANY';

            gromit.post(url, this.$http, '{}', function(data) {
                console.log('Fetched gromit data');
                console.log('data: %O', data);
            });
        });
    }
}
