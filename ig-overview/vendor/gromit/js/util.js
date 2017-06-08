/*******************************************************************************
 * 
 * MIT License
 * Copyright (c) 2015-2016 NetIQ Corporation, a Micro Focus company
 *
 ******************************************************************************/
 'use strict';

gromit.uidCounter = 0;

/**
 * Create an ID which is unique in the page.
 */
gromit.createUniqueId = function() {
    gromit.uidCounter++;
    return 'gromitid-' + gromit.uidCounter;
};

/**
 * Parse the specified string into a JSON object in a safe way that won't run
 * unsafe scripts.
 */
gromit.parseJSON =  function(/*String*/ json) {
    return JSON.parse(json);
};

/**
 * This is a very specialized helper function that can build an anchor with
 * sanitized text using jQuery to make sure the text doesn't run any HTML tags.
 *
 */
gromit.buildAnchorWithTextAndClass = function(/*String*/ cls, /*String*/ text) {
    var a = $('<a href="#"></a>');
    a.addClass(cls);
    a.text(text);

    var span = $('<span></span>');
    span.append(a);
    
    return span.html();
};

/**
 * This is a helper function for unifying a date and time into a 
 * single date.  It takes the hours and minutes from the time and
 * sets them into the date and convert the whole thing back to a 
 * number.
 */
gromit.unifyDateAndTime = function(/*int*/ date, /*int*/ time) {
    var d = new Date(date);
    var t = new Date(time);

    d.setHours(t.getHours());
    d.setMinutes(t.getMinutes());

    return d.getTime();
};

/**
 * Get the specified color property of the element with the specified ID
 * from CSS
 */
gromit.getCSSColor = function(/*String*/ id) {
    /*
     * We want to set the color of the circles from CSS, but elements in
     * paper don't have classes or selectors since they aren't DOM elements.
     * The solution is to create a new div tag with a well-known ID and
     * use JavaScript to look at the CSS property color of that tag.
     */
    var div = $('<div id="' + id + '"></div>');
    $('body').append(div);
    var color = div.css('color');
    div.remove();

    return color;
};

/**
 * Get the specified property of the element with the specified ID
 * from CSS
 */
gromit.getCSSProperty = function(/*String*/ id, /*String*/ propname) {
    /*
     * We want to set the color of the circles from CSS, but elements in
     * paper don't have classes or selectors since they aren't DOM elements.
     * The solution is to create a new div tag with a well-known ID and
     * use JavaScript to look at the CSS property color of that tag.
     */
    var div = $('<div id="' + id + '"></div>');
    $('body').append(div);
    var color = div.css(propname);
    div.remove();

    return color;
};

/**
 * Get the specified property of the element with the specified class
 * from CSS
 */
gromit.getCSSPropertyByClass = function(/*String*/ cls, /*String*/ propname) {
    /*
     * We want to set the color of the circles from CSS, but elements in
     * paper don't have classes or selectors since they aren't DOM elements.
     * The solution is to create a new div tag with a well-known ID and
     * use JavaScript to look at the CSS property color of that tag.
     */
    var div = $('<div class="' + cls + '"></div>');
    $('body').append(div);
    var color = div.css(propname);
    div.remove();

    return color;
};


/**
 * Print the specified message to the browser debug console if it is available.
 */
gromit.println = function(/*String*/ msg) {
    if (window.console) {
        console.info(msg);
    }
};

/**
 * Print the specified message to the browser debug console if it is available.
 */
gromit.info = function(/*String*/ msg) {
    if (window.console) {
        console.info(msg);
    }
};

/**
 * Print the javascript object to the browser debug console if it is available.
 */
gromit.printObj = function(/*Object*/ object) {
    if (window.console) {
        console.info(JSON.stringify(object));
    }
};

/**
 * A little helper utility to validate location arguments
 */
gromit.isInvalidL10NArgument = function(arg) {
     if (arg === '') {
        return false;
    } else {
        return gromit.isEmpty(arg);
    }
};

/**
 * A small improvement on the Underscore isEmpty function which returns true if
 * the argument is undefined.
 */
gromit.isEmpty = function(arg) {
    return _.isEmpty(arg) && !_.isNumber(arg) && !_.isBoolean(arg);
};

/**
 * Scroll to the top left corner of the page.
 */
gromit.scrollToTop = function() {
    window.scrollTo(0, 0);
};

gromit.scrollToElement = function(/*String*/ elementId) {
    $('html, body').animate({
        scrollTop: $('#' + elementId).offset().top
    }, 1000);
};

/**
 * Log an error to the debug console if the console is available
 */
gromit.logerror = function(/*int*/ code, /*int*/ subcode, /*String*/ text) {
    if (window.console) {
        console.error(code + ':' + subcode + ':' + text);
    }
};

/**
 * Log a warning to the debug console if the console is available
 */
gromit.logWarning = function(/*String*/ text) {
    if (window.console) {
        console.warn(text);
    }
};

/**
 * Get a string representing the full format of the date and time represented by the specified number.
 */
gromit.fullDateTimeFormat = function(/*int*/ epoch) {
    if (_.isNumber(epoch)) {
        return moment(epoch).format('LLLL');
    }
};

/**
 * Get a string representing the full format of the date represented by the specified number.
 */
gromit.fullDateFormat = function(/*int*/ epoch) {
    if (_.isNumber(epoch)) {
        return moment(epoch).format('LL');
    }
};

/**
 * Get a string representing the amount of time between the specififed date and now
 */
gromit.fromNowFormat = function(/*int*/ epoch) {
    if (_.isNumber(epoch)) {
        return moment(epoch).fromNow();
    }
};

/**
 * Get a string representing the duration between the two specified dates
 */
gromit.dateDiff = function(/*int*/ a, /*int*/ b) {
    return moment.duration(moment(b).diff(moment(a))).humanize();
};

/**
 * Get a string representing the short format of the date represented by the specified number.
 */
gromit.shortDateFormat = function(/*int*/ epoch, /*boolean*/ stripTime) {
    if (_.isNumber(epoch)) {
        if (stripTime) {
            return moment(epoch).format('L');
        }
        return moment(epoch).format('L LT');
    }
};

/**
 * Set the locale to use for date and time formatting.
 */
gromit.setLocale = function(/*String*/ locale) {
    moment.locale(locale);
};

/**
 * Strip time off of a date
 */
gromit.stripTime = function(/*int*/ date) {
    if (_.isNumber(date)) {
        return moment(date).startOf('day').toDate();
    }
};

/**
 * Strip time off of a date
 */
gromit.startOfDay = function(/*date*/ date) {
   return moment(date).startOf('day').toDate();
};

/**
 * start of tomorrow
 */
gromit.beginNextDay = function(/*date*/ date) {
   return moment(date).startOf('day').add(1, 'day').toDate();
};

/**
 * Escape the specified HTML so it is safe to render into the page without causing an XSS issue
 */
gromit.escapeHtml = function(/*string*/ html) {
    var div = $('<div></div>');
    div.text(html);
    return div.html();
};

/**
 * Show a humanized info message
 *
 * @param msg the message to show
 */
gromit.showMessage = function(/*String*/ msg) {
    require(['gromit/js/lib/humanmsg.js'], function() {
        humanMsg.setup();
        jQuery('#humanMsg').removeClass('humanMsgErr').removeClass('humanMsgWarn').addClass('humanMsgInfo');
        humanMsg.displayMsg(gromit.escapeHtml(msg), false);
    });
};

/**
 * Show a humanized warning message
 *
 * @param msg the message to show
 * @param shouldLog true if we should log this message and false otherwise
 */
gromit.showWarningMessage = function(/*String*/ msg, /*boolean*/ shouldLog) {
    require(['gromit/js/lib/humanmsg.js'], function() {
        humanMsg.setup();
        jQuery('#humanMsg').removeClass('humanMsgErr').removeClass('humanMsgInfo').addClass('humanMsgWarn');
        humanMsg.displayMsg(gromit.escapeHtml(msg), false);

        if (shouldLog) {
            gromit.logerror(0, 0, msg);
        }
    });
};

/**
 * Show a humanized error message
 *
 * @param msg the message to show
 */
gromit.showErrorMessage = function(/*String*/ msg) {
    require(['gromit/js/lib/humanmsg.js'], function() {
        humanMsg.setup();
        jQuery('#humanMsg').removeClass('humanMsgWarn').removeClass('humanMsgInfo').addClass('humanMsgErr');
        humanMsg.displayMsg(gromit.escapeHtml(msg), false);
        gromit.logerror(0, 0, msg);
    });
};

gromit.showGeneralError = function(/*String*/ code, /*String*/ subcode, /*String*/ reason) {
    gromit.println('showGeneralError(' + code + ', ' + subcode + ', ' + reason + ')');
    if (!reason) {
        reason = ' ';
    }
    
    // show the fatal error, not showing the code or the subcode
    gromit.showFatalError(reason);
};

/**
 * Show a fatal error message in the page.
 */
gromit.showFatalError = function(/*String*/ msg) {
    var errorPanel = $('#errorpanel');

    if (errorPanel.length === 0) {
        errorPanel = $('<div id="errorpanel"><span></span></div>');
        var a = $('<a href="#" id="errorpanel_hide">X</a>');

        errorPanel.append(a);

        a.click(function(e) {
            e.preventDefault();
            errorPanel.hide();
        });

        $('#mainContent').prepend(errorPanel);
    }

    errorPanel.children('span').text(msg);
    errorPanel.show(msg);

    window.scrollTo(0, 0);
};

/**
 * This is a helper function to add a CSS link to the HEAD of the current
 * document.
 */
gromit.addCSSLink = function(/* string */ file) {
    jQuery('head').append('<link>');
    var css = $('head').children(':last');
    css.attr({
        rel: 'stylesheet',
        type: 'text/css',
        href: file
    });

    return css;
};

/**
 * Determines if the canvas tag is supported in the current browser.
 */
gromit.isCanvasSupported = function() {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
};

/**
 * Parse the dateString into a moment using the short date format
 * @param dateString
 * @returns moment
 */
gromit.parseShortDateToMoment = function(dateString) {
    return moment(dateString, moment.localeData()._longDateFormat.L);
};

/**
 * Validate the date
 * @param dateString
 * @returns true/false
 */
gromit.isValidByMoment = function(dateString) {
    return moment(dateString, moment.localeData()._longDateFormat.L).isValid();
};

/**
 * Gets the short date format in the current locale.
 */
gromit.getShortDateFormat = function() {
    /*
     * The date formats are a little different between Moment and Angular so we need
     * to tweak them a little bit.
     */
    return moment.localeData()._longDateFormat.L.replace(/D/g, 'd').replace(/Y/g, 'y');
};

/**
 * Get data about the current locale
 */
gromit.getLocaleData = function() {
    return moment.localeData();
};

/**
 * Gets the first day of the week in the current locale.  The value is a number like
 * 0 for Sunday and 1 for Monday
 *
 */
gromit.getFirstDayOfWeek = function() {
    return moment.localeData()._week.dow;
};

/** convert "color" css property from jQuery to RGB array
 * jQuery returns "rgb(100,100, 100)"  or "#aabbcc" depended on the browser
 */
gromit.jQueryCssToRGB = function(/*String*/ str) {
    var rgb = str.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (rgb) {
        return [parseInt(rgb[1], 10), parseInt(rgb[2], 10), parseInt(rgb[3], 10)];
    } else {
        return gromit.hexToRGB(str);
    }
};

/**
 * convert hex color to rgb
 */
gromit.hexToRGB = function(h) {
    var str = (h.charAt(0) === '#') ? h.substring(1, 7) : h;
    return [parseInt(str.substring(0, 2), 16), parseInt(str.substring(2, 4), 16), parseInt(str.substring(4, 6), 16)];
};

/**
 * convert rgb color to hex
 */
gromit.rgbToHex = function(r, g, b) {
    /* can't use the below code due to compile error during gwt compiling*/
    //    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    //    console.log('rgb value r=' + r + ' g=' + g + ' b=' + b + "Hex value= " + "#" + gromit.componentToHex(r) + gromit.componentToHex(g) + gromit.componentToHex(b));
    return '#' + gromit.componentToHex(r) + gromit.componentToHex(g) + gromit.componentToHex(b);
};

/**
 * Change int to hex value
 */
gromit.componentToHex = function(/*int*/ c) {
    var hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
};

gromit.isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
