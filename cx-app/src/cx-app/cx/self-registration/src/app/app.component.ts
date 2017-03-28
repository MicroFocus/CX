import {Component, OnInit, Inject} from 'ng-metadata/core';

@Component({
    selector: 'app-root',
    styles: [require('./app.component.scss')],
    template: require('./app.component.html')
})
export class AppComponent implements OnInit {

    constructor(@Inject('$log') private _$log: ng.ILogService) {
    }

    public ngOnInit() {
    }
}
