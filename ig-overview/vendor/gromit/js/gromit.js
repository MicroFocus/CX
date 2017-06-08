/*******************************************************************************
 * 
 * MIT License
 * Copyright (c) 2015-2016 NetIQ Corporation, a Micro Focus company
 *
 ******************************************************************************/
 'use strict';
 


/*
 * This is a utility object which we can use to hold window level
 * variables and utility functions
 */
/*global gromit:true */
var gromit = {

    /**
     * This will be the localization object set up by the localization service.
     * It can be used to access localized strings from JavaScript.
     */
    i18n: null,

    noFeedback: 'none',
    errorFeedback: 'error',
    validFeedback: 'valid',
    warningFeedback: 'warning',

    /**
     * @private
     */
    addWideStyle: function() {
        if ($(window).width() >= 1400 &&
            !gromit.wideCSS) {
            gromit.wideCSS = gromit.addCSSLink('gromit/css/uncompressed_css/client.wide.css');
            return;
        }

        if (gromit.wideCSS &&
            $(window).width() <= 1400) {
            gromit.wideCSS.remove();
            delete gromit.wideCSS;
        }
    },

    /**
     * @private
     */
    updateStyles: function() {
        gromit.addWideStyle();
    },

    /**
     * @private
     */
    init: function() {
        if (gromit.bestLocale) {
            if (gromit.bestLocale.indexOf('_#') !== -1) {
                /*
                 * This means that the browser determined one of the new compound
                 * locales.  However, the moment library doesn't support those yet.
                 * That means we need to strip off the last part.
                 */
                gromit.bestLocale = gromit.bestLocale.substring(0, gromit.bestLocale.indexOf('_#'));
            }

            moment.locale(gromit.bestLocale);

            /* 
             * We want to specify the formats for the short dates in English
             * so they don't have the starting zero.
             */
            if (gromit.bestLocale.indexOf('en') === 0) {
                moment.locale('en', {
                    longDateFormat: {
                        L: 'M/D/YYYY',
                        LT: 'h:mm A',
                        LL : 'MMMM Do YYYY',
                        LLLL: 'ddd MMMM D YYYY LT'
                    }
                });
            }
        }

        var localeData = moment.localeData();

        gromit.token = $.cookie('gromitTokenCookie');
        gromit.tokenType = $.cookie('gromitTokenTypeCookie');

        if (gromit.debugMode) {
            gromit.addCSSLink('gromit/css/humanMsg.css');
            gromit.addCSSLink('gromit/css/reset.css');
            gromit.addCSSLink('gromit/css/coreui.css');
        } else {
            gromit.addCSSLink('gromit/css/gromit-all-min.css');
        }

        gromit.isiPad = navigator.userAgent.match(/iPad/i) !== null;

        /*
         * Almost all of our CSS is in coreui.css, but there are always a few
         * tweaks you need to add for IE. This special style sheet is added only
         * if the browser is IE and contains just those tweaks.
         */
        /*
         * I'm commenting this out for now so we don't make extra HTTP calls since we don't
         * have any CSS for specific browsers yet.
         *
        var browserType = navigator.userAgent.toLowerCase();
        if (browserType.indexOf('msie') > -1 || browserType.match(/trident.+rv:11./)) {
            gromit.addCSSLink('gromit/css/uncompressed_css/msie.css');
        } else if (browserType.indexOf('chrome') > -1) {
            gromit.addCSSLink('gromit/css/uncompressed_css/webkit.css');
        } else if (browserType.indexOf('safari') > -1) {
            gromit.addCSSLink('gromit/css/uncompressed_css/safari.css');
        } else if (browserType.indexOf('firefox') > -1) {
            gromit.addCSSLink('gromit/css/uncompressed_css/firefox.css');
        }
        */ 

        if (gromit.isiPad) {
            gromit.addCSSLink('gromit/css/uncompressed_css/ipad.css');
        }
        
        /*
         * If the current browser supports canvas then we'll import paper.
         */
        if (gromit.isCanvasSupported()) {
            gromit.hasCanvas = true;
        } else {
            gromit.hasCanvas = false;
        }

        /*
         * If the current browser is an iPad then we'll load the script to
         * enable touch events for JQuery sortable.
         */

        if (gromit.isiPad) {
            require(['js/lib/jquery.ui.touch-punch.js'], function() {});
        }

        gromit.updateStyles();

        $(window).resize(function() {
            gromit.updateStyles();
        });
    }
};

angular.module('gromitsoft', []);