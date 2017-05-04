import { IDocumentService } from 'angular';
import { Component, OnInit, Inject } from 'ng-metadata/core';

@Component({
    selector: 'app-root',
    styles: [require('./app.component.scss')],
    template: require('./app.component.html')
})
export class AppComponent implements OnInit {
    themeLink: HTMLLinkElement;

    constructor(
        @Inject('$log') private _$log: ng.ILogService,
        @Inject('$document') private $document: IDocumentService)
    {
    }

    ngOnInit() {
        this.themeLink = <HTMLLinkElement>this.$document[0].querySelector('#theme-link');
    }

    setTheme(name: string) {
        let theme = 'ng-ias';

        if (name === 'dark') {
            theme += '_dark';
        }

        this.themeLink.href = this.themeLink.href.replace(/(\/)([^\/]+)(\.css$)/, '$1' + theme + '$3');
    }
}
