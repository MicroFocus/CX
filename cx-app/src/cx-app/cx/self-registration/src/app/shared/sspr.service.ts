import { Inject, Injectable } from 'ng-metadata/core';
import { IPromise, IQService, IDeferred, IHttpService, ILocationService } from 'angular';
import * as url from 'url';

@Injectable()
export class SsprService {
    private randomPasswordUrl: string;

    constructor(
        @Inject("$q") private $q: IQService, 
        @Inject("$http") private $http: IHttpService,
        @Inject("$location") private $location: ILocationService
    ) {
        let tmpUrl: url.Url = url.parse(url.resolve($location.absUrl(), "/api/sspr/public/rest/randompassword"));
        tmpUrl.port = '80';
        tmpUrl.host = undefined;
        this.randomPasswordUrl = url.format(tmpUrl);

        console.log('Random passsword URL: ' + this.randomPasswordUrl);
    }

    public getGeneratedPasswords(): IPromise<string[]> {
        let deferred: IDeferred<string[]> = this.$q.defer<string[]>();

        let generatedPasswords: string[] = [];

        for (let i=0; i<20; i++) {
            this.$http.get(this.randomPasswordUrl)
            .then((response) => {
                generatedPasswords.push(response.data.toString());
            }).catch((error) => {
                generatedPasswords.push("error");
            });
        }

        deferred.resolve(generatedPasswords);
        return deferred.promise;
    }
}
