import { Inject, Injectable } from 'ng-metadata/core';

@Injectable()
export class HelloService {
    private helloMessages = {};

    constructor(
        @Inject('localStorageService') private localStorageService: ng.local.storage.ILocalStorageService,
    ) {
        this.helloMessages = localStorageService.get('HelloService::helloMessages');
        if (!this.helloMessages) {
            this.helloMessages = {};
        }
    }

    getHelloMessage(widgetId: string): string {
        return this.helloMessages[widgetId];
    }

    setHelloMessage(widgetId: string, helloMessage: string) {
        this.helloMessages[widgetId] = helloMessage;
        this.localStorageService.set('HelloService::helloMessages', this.helloMessages);
    }
}
