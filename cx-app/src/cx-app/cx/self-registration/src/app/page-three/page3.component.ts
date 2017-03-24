import { Component } from 'ng-metadata/core';

@Component( {
    selector: 'app-page3',
    styles: [require( './page3.component.scss' )],
    template: require( './page3.component.html' )
} )
export class PageThreeComponent {
    public Reg(): void {
        console.log( 'hello from page 3' );
    }
}
