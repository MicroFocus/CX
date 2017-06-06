import {getInjectableName, bundle} from 'ng-metadata/core';
import {kebabCase} from 'lodash';

interface Type extends Function {
    new (...args: any[]): any;
}

/**
 * helper for getting tested components
 * - this is just temporary and will be removed when it's part if ngMetadata
 */
export function queryByDirective<T extends Function>(host: ng.IAugmentedJQuery, type: T) {
    const ctrlName = getInjectableName(type);
    const selector = kebabCase(ctrlName);
    const debugElement = host.find(selector);
    const componentInstance = debugElement.controller(ctrlName) as T;

    return {debugElement, componentInstance};
}

export function createAngular1Module(ngMetadataModule: Type) {
    if (typeof ngMetadataModule !== 'function') {
        throw new Error(`
            [Angular module creation Error]
            You have to provide ngMetadata Module class with @NgModule decorator. You provided ${ngMetadataModule}
        `);
    }
    return bundle(ngMetadataModule).name;
}
