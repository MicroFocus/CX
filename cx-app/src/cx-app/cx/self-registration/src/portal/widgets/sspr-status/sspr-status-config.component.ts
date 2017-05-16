import { Component, Inject, Input, OnInit } from 'ng-metadata/core';
import {SsprService} from "../../../app/services/sspr.service";

@Component({
    selector: 'sspr-status-config',
//    styles: [require('./sspr-status-config.component.scss')],
    template: require('./sspr-status-config.component.html')
})
export class SsprStatusConfigComponent implements OnInit {
    @Input('=') widgetScope: ng.IScope;

    private helloMessage: string;

    constructor(
        @Inject('SsprService') private ssprService: SsprService
    ) {
    }

    ngOnInit() {

        this.widgetScope.$on('widgetConfigChanged', () => {
            this.widgetConfigChanged();
        });
    }

    widgetConfigChanged() {

    }
}
