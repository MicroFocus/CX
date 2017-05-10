import { Component, Inject, Input, OnInit } from 'ng-metadata/core';
import { SsprService, UserConfig } from "../../../app/shared/sspr.service";

@Component({
    selector: 'sspr-status-view',
    styles: [require('./sspr-status-view.component.scss')],
    template: require('./sspr-status-view.component.html')
})
export class SsprStatusViewComponent implements OnInit {
    @Input('=') private widgetScope: ng.IScope;

    private userConfig: UserConfig;

    constructor(private ssprService: SsprService) {
    }

    ngOnInit() {
        console.log('ngOnInit');
        this.readUserConfig();
    }

    readUserConfig() {
        this.ssprService.readUserConfig('jalbright', 'novell')
            .then((userConfig: UserConfig) => {
                this.userConfig = userConfig;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    refreshData() {
        this.readUserConfig();
    }
}
