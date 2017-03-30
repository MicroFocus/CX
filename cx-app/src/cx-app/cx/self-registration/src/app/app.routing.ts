import {Transition, StateProvider, Ng1StateDeclaration} from 'angular-ui-router';
import {Inject, getInjectableName} from 'ng-metadata/core';

// Note: template is used in these declarations instead of component, because component is magically
// created in ui-router internals
export const STATES: Ng1StateDeclaration[] = [
    {
        name: 'page1',
        url: '/page1',
        template: '<app-page1/>'
    },
    {
        name: 'page2',
        url: '/page2',
        template: '<app-page2/>'
    },
    {
        name: 'page3',
        url: '/page3',
        template: '<app-page3/>'
    },
    {
        name: 'page4',
        url: '/page4',
        template: '<app-page4/>'
    },
    {
        name: 'portal',
        url: '/portal',
        template: '<app-user-portal/>'
    }
];
