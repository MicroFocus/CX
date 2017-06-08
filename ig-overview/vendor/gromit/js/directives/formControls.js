/*******************************************************************************
 * 
 * MIT License
 * Copyright (c) 2015-2016 NetIQ Corporation, a Micro Focus company
 *
 ******************************************************************************/
 'use strict';
 
/**
 * This directive restricts the inputs on a text field to be just a positive integer value
 *
 * Like this:
 *
 * <input type="text" int-only-input ng-model="someValue"  />
 *
 * This also supports a max attribute if you don't want to let the number get too big.
 */
angular.module('gromitsoft').directive('grIntOnlyInput', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            model: '=ngModel',
            ngModel: '=',
            max: '=',
            min: '='
                
        },
        replace: false,
        link: function(scope, elem) {
            elem.addClass('intTextBox');
            scope.$watch('model', function(newValue, oldValue) {
                var minVal = 1;
                if (!isNaN(scope.min)) {
                    minVal = parseInt(scope.min, 10);
                }
                if (!newValue || newValue.length === 0) {
                    /*
                     * Empty is OK
                     */
                    return;
                } else if (isNaN(newValue) && newValue !== '-') {
                    /*
                     * This means it's a string like abc
                     */
                    scope.ngModel = oldValue;
                } else if (newValue.toString().indexOf('.') > -1) {
                    /*
                     * This means it's a decimal like 3.14
                     */
                    scope.ngModel = oldValue;
                } else if ((newValue < minVal || (minVal > -1 && newValue.toString().indexOf('-') > -1))) {
                    /*
                     * This means it's a negative number like -4 or zero
                     */
                    scope.ngModel = oldValue;
                } else if (scope.max && newValue > parseInt(scope.max, 10)) {
                    scope.ngModel = oldValue;
                }
            });
        }
    };
});

/**
 * This directive restricts the inputs on a text field to be number value.
 * This is different from intOnlyInput because it accepts decimals
 *
 * Like this:
 *
 * <input type="text" number-only-input ng-model="someValue"  />
 */
angular.module('gromitsoft').directive('grNumberOnlyInput', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            model: '=ngModel',
            ngModel: '=',
            max: '=',
            min: '='
        },
        replace: false,
        link: function(scope, elem) {
            elem.addClass('intTextBox');
            scope.$watch('model', function(newValue, oldValue) {
                var minVal;
                if (!isNaN(scope.min)) {
                    minVal = parseInt(scope.min, 10);
                }
                
                if (!newValue || newValue.length === 0) {
                    /*
                     * Empty is OK
                     */
                    return;
                } else if (minVal && (newValue < minVal || (minVal > -1 && newValue.toString().indexOf('-') > -1))) {
                    /*
                     * This means it's a negative number like -4 or zero
                     */
                    scope.ngModel = oldValue;
                } else if (scope.max && newValue > parseInt(scope.max, 10)) {
                    scope.ngModel = oldValue;
                } else if (isNaN(newValue)) {
                    /*
                     * This means it's a string like abc
                     */
                    scope.ngModel = oldValue;
                }
            });
        }
    };
});