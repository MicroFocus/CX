import { Component, Inject, Input, OnInit } from 'ng-metadata/core';
import { HelloService } from './hello.service';

@Component({
    selector: 'hello-view',
//    styles: [require('./hello-view.component.scss')],
    template: require('./hello-view.component.html')
})
export class HelloViewComponent implements OnInit {
    @Input('=') private widgetScope: ng.IScope;

    private helloMessage: string;

    constructor(private helloService: HelloService) {
    }

    ngOnInit() {
        this.helloMessage = this.helloService.getHelloMessage(this.widgetScope.model.wid);
        if (!this.helloMessage) {
            this.helloMessage = this.widgetScope.model.config.initialMessage;
        }
    }
}
