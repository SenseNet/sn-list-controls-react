"use strict";
// tslint:disable:no-unused-variable
global.addEventListener = function () { return undefined; };
global.removeEventListener = function () { return undefined; };
global.querySelector = function () { return ({ scrollTop: function () { return undefined; }, addEventListener: function () { return undefined; }, removeEventListener: function () { return undefined; } }); };
global.document = global;
global.innerWidth = 1024;
global.navigator = { userAgent: '' };
global.window = global;
global.document.parentWindow = global;
global.getElementById = function () { return ({
    getBoundingClientRect: function () { return ({}); }
}); };
global.getComputedStyle = function () { return ({
    getBoundingClientRect: function () { return ({}); }
}); };
// export * from './components'
