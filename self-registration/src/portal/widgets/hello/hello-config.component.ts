import { Component, Inject, Input, OnInit } from 'ng-metadata/core';

import { HelloService } from './hello.service';

@Component({
    selector: 'hello-config',
//    styles: [require('./hello-config.component.scss')],
    template: require('./hello-config.component.html')
})
export class HelloConfigComponent implements OnInit {
    @Input('=') widgetScope: ng.IScope;

    private helloMessage: string;

    constructor(private helloService: HelloService) {
    }

    ngOnInit() {
        this.helloMessage = this.helloService.getHelloMessage(this.widgetScope.model.wid);
        if (!this.helloMessage) {
            this.helloMessage = this.widgetScope.model.config.initialMessage;
        }

        this.widgetScope.$on('widgetConfigChanged', () => {
            this.widgetConfigChanged();
        });
    }

    widgetConfigChanged() {
        this.helloService.setHelloMessage(this.widgetScope.model.wid, this.helloMessage);
    }
}
