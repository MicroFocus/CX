import * as angular from 'angular';
import 'angular-mocks';
import {IRender, renderFactory} from 'ng-metadata/testing';
import {NgModule, Component} from 'ng-metadata/core';

import {queryByDirective, createAngular1Module} from './shared/test-helpers';
import {AppComponent} from '../../src/app/app.component';

import {expect} from 'chai';

describe(`AppComponent`, () => {

    @Component({
        selector: 'np-test-component',
        template: `<np-app></np-app>`
    })
    class TestComponent {
    }

    @NgModule({
        declarations: [AppComponent, TestComponent]
    })
    class TestModule {
    }

    const TestModuleName = createAngular1Module(TestModule);

    let render: IRender<TestComponent>;

    beforeEach(angular.mock.module(TestModuleName));

    beforeEach(angular.mock.inject(($injector: ng.auto.IInjectorService) => {
        const $compile = $injector.get<ng.ICompileService>('$compile');
        const $rootScope = $injector.get<ng.IRootScopeService>('$rootScope');
        const $scope = $rootScope.$new();

        render = renderFactory($compile, $scope);
    }));

    it(`should render Hello Jupiter!!!`, () => {
        const {compiledElement} = render(TestComponent);

        // now we need to get our tested component
        const {debugElement, componentInstance} = queryByDirective(compiledElement, AppComponent);

        expect(componentInstance instanceof AppComponent).to.equal(true);
        expect(debugElement.text().trim()).to.contain('Hello from Jupiter!');
    });

});
