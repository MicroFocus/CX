import { IDeferred, IHttpService, IPromise, IQService } from 'angular';

export default class UserService {

    static $inject = ['$http', '$q'];

    private userCreateUrl: string;
    constructor(private $http: IHttpService, private $q: IQService) {
        this.userCreateUrl = '/api/users/create';
    }

    public createUser(user: any): IPromise<string[]> {
        let deferred: IDeferred<string[]> = this.$q.defer<string[]>();

        let result: string[] = [];

        this.$http.post(this.userCreateUrl, user)
            .then((response: any) => {
                console.warn('response.data.result: ' + response.data.result);
                result.push(response.data.result);
            }).catch((error) => {
            result.push(error);
        });

        deferred.resolve(result);
        return deferred.promise;
    }
}
