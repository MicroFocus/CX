import { Injectable } from 'ng-metadata/core';

@Injectable()
export class HelloService {
    private helloMessages = {};

    getHelloMessage(widgetId: string): string {
        return this.helloMessages[widgetId];
    }

    setHelloMessage(widgetId: string, helloMessage: string) {
        this.helloMessages[widgetId] = helloMessage;
    }
}
