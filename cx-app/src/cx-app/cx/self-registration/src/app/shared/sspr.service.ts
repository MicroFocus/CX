import { Inject, Injectable } from 'ng-metadata/core';
import { IPromise, IQService, IDeferred, IHttpService, ILocationService } from 'angular';
import * as url from 'url';

export interface UserConfig {
    userDN: string;
    ldapProfile: string;
    userID: string;
    userEmailAddress: string;
    passwordLastModifiedTime: string;
}

@Injectable()
export class SsprService {
    private randomPasswordUrl: string;
    private userConfigUrl: string;

    constructor(
        @Inject("$q") private $q: IQService,
        @Inject("$http") private $http: IHttpService,
        @Inject('$base64') private $base64,
        @Inject("$location") private $location: ILocationService
    ) {
        this.randomPasswordUrl = "/api/registration/randompassword_n?num=20";
        this.userConfigUrl = "/api/registration/status";
    }

    public getGeneratedPasswords(): IPromise<string[]> {
        let deferred: IDeferred<string[]> = this.$q.defer<string[]>();

        let generatedPasswords: string[] = [];

        this.$http.get(this.randomPasswordUrl)
        .then((response: any) => {
            for (let password of response.data.passwords) {
                generatedPasswords.push(password);
            }
        }).catch((error) => {
            generatedPasswords.push("error");
        });

        deferred.resolve(generatedPasswords);
        return deferred.promise;
    }

    public readUserConfig(username: string, password: string): IPromise<UserConfig> {
        let deferred: IDeferred<UserConfig> = this.$q.defer<UserConfig>();
        console.log('Reading user config from: %O', this.userConfigUrl);

        this.$http.get(this.userConfigUrl, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Basic ' + this.$base64.encode(username + ':' + password)
            }
        })
        .then((response) => {
            let userConfig: UserConfig = response.data['data'];
            deferred.resolve(userConfig);
        }).catch((error) => {
            console.error(error);
        });

        return deferred.promise;
    }
}
