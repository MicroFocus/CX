// Polyfills to support IE11.
// - The polyfills are only executed when required (i.e. the implementation does not exist, is buggy, or does not
//   support all features).
// - Modified from react-app-polyfill IE11 support (react-app-polyfill/ie11.js) to include support for
//   Promise.prototype.catch and Promise.prototype.finally. These are available in core-js/fn/promise.
// - We are using the same version of core-js as react-app-polyfill. When this is upgraded to use core-js v.3,
//   the correct import syntax will be core-js/stable instead of core-js/fn or core-js/es6 for most imports. If the
//   imports require additional features then the correct import syntax will be core-js/es6.
import 'core-js/fn/promise';
if (typeof window !== 'undefined') {    // Avoid importing fetch() in a Node test environment
    require('whatwg-fetch');
}
Object.assign = require('object-assign');   // Object.assign() polyfill
require('core-js/es6/symbol');  // Includes for...of polyfill
require('core-js/fn/array/from');   // Includes iterable spread polyfill (...Set, ...Map)