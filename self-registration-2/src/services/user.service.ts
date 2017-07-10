import { IDeferred, IHttpService, IPromise, IQService } from 'angular';

/**
 * This object represents a user who can be created with the user service.
 */
export class User {

    fName: string;
    sName: string;
    password: string;
    email: string;
    postalCode: string;
    policyNumber: string;
    birthDate: Date;
    description = 'This is a user created from our Angular app';

    constructor() {
    }
}

/**
 * The user server allows you to call off to the server and create users.
 */
export default class UserService {

    static $inject = ['$http', '$q'];

    private userCreateUrl: string;
    constructor(private $http: IHttpService, private $q: IQService) {
        this.userCreateUrl = '/api/users/create';
    }

    /**
     * Call the server and create a user.
     *
     * @param user The user object to create
     */
    public createUser(user: User): IPromise<string[]> {
        let deferred: IDeferred<string[]> = this.$q.defer<string[]>();

        this.$http.get('/api/clife/' + user.policyNumber)
            .then((response: any) => {
                if (response.data === true) {
                    /*
                     * This means the policy number is valid and we can move forward.
                     */
                    this.$http.post(this.userCreateUrl, user)
                        .then((response: any) => {
                            console.warn('response.data.result: ' + response.data.result);
                            deferred.resolve(response.data.result);
                        }).catch((error) => {
                            console.warn('response error: ' + error);
                            deferred.reject(error);
                        });
                } else {
                    deferred.reject('InvalidPolicyNum');
                }
            }).catch((error) => {
                console.warn('response error: ' + error);
                deferred.reject(error);
            });

        return deferred.promise;
    }
}
