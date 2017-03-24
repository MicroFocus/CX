import {Component} from 'ng-metadata/core';

@Component({
    selector: 'app-page4',
    styles: [require('./page4.component.scss')],
    template: require('./page4.component.html')
})
export class PageFourComponent {
    public Reg(): void
        {
            console.log('Hello from page 4');
        }
}
