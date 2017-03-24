import {Component} from 'ng-metadata/core';

@Component({
    selector: 'app-page1',
    styles: [require('./page1.component.scss')],
    template: require('./page1.component.html')
})
export class PageOneComponent {
    public Reg(): void
        {
            console.log('hey there');
        }
}
