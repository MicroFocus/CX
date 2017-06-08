/*******************************************************************************
 * 
 * MIT License
 * Copyright (c) 2015-2016 NetIQ Corporation, a Micro Focus company
 *
 ******************************************************************************/
 'use strict';

angular.module('gromitsoft').directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if (!attrs.href && !attrs.ngHref && !attrs.name) {
                /*
                 * We want to always have an href so Anchors can be keyboard accessible.
                 */
                elem.attr('href', '#');
            }

            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function(e) {
                    e.preventDefault();
                    if (!e.hasClass || !e.hasClass('disabled')) {
                        e.stopPropagation();
                    }
                });
            }
        }
    };
});