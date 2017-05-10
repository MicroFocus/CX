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
        let tmpUrl: url.Url = url.parse(url.resolve($location.absUrl(), "/api/registration/randompassword_n?num=3"));
        tmpUrl.port = '80';
        tmpUrl.host = undefined;
        this.randomPasswordUrl = url.format(tmpUrl);
    }

    public getGeneratedPasswords(): IPromise<string[]> {
        let deferred: IDeferred<string[]> = this.$q.defer<string[]>();

        let generatedPasswords: string[] = [];

        
        this.$http.get(this.randomPasswordUrl)
        .then((response) => {
            generatedPasswords.push(response.data.toString());
        }).catch((error) => {
            generatedPasswords.push("error");
        });
        

        deferred.resolve(generatedPasswords);
        return deferred.promise;
    }
}
