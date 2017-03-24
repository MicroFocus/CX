import {Component} from 'ng-metadata/core';

@Component({
    selector: 'app-page1',
    styles: [require('./page1.component.scss')],
    template: require('./page1.component.html')
})
export class PageOneComponent {
    public m_showCode = false;
    
    public showReg(): void {
        this.m_showCode = true;
    }

    public showInfo(): void {
        //no-op
    }
}
