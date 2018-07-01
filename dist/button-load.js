/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__button_load_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__button_load_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__button_load_component__);


angular.module('btnLoad', []).component('btnLoad', __WEBPACK_IMPORTED_MODULE_0__button_load_component___default.a);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {
    bindings: {
        loadingTxt: '@',
        onClick: '&ngClick',
        bindTxt: '=ngBind'
    },
    controller: BtnLoadComponentController
};

BtnLoadComponentController.$inject = ['$element', '$rootScope', '$q'];

function BtnLoadComponentController($element, $rootScope, $q) {
    var currentText,
        binding = false;

    this.$onInit = () => {
        // if bindTxt does have a value it means there is a binding
        if (this.bindTxt) binding = true;

        currentText = angular.copy(this.bindTxt) || $element.text();
    };

    $element.on('click', e => {
        e.preventDefault();
        // to prevent ng click from working
        e.stopImmediatePropagation();
        // if empty do nothing
        if (!this.onClick) return;
        // disable the button
        disable();

        let defer = this.onClick(e);

        // check for promises
        // if promise is not used it means it is a synchronous function
        if (defer == undefined || defer.then == undefined) {
            // enable now the button
            enable();
            return true;
        }

        // asynchronous
        defer.then(result => {
            enable();
            return result;
        }, err => {
            enable();
            $q.reject(err);
        });
    });

    var disable = () => {
        $element.attr('disabled', 'disabled');
        $element.attr('readonly', 'readonly');
        // if there is a specified loading text it will be use as alternate text when button is disabled
        // else the current text will be converted to progressive form.
        let alternateText = this.loadingTxt || progressiveForm(currentText);
        replaceText(alternateText);
    };

    var enable = () => {
        $element.removeAttr('disabled');
        $element.removeAttr('readonly');
        // when enabling return the current text
        replaceText(currentText);
    };

    var replaceText = text => {
        // change the binding value if there is a binding
        if (binding) {

            $rootScope.$evalAsync(() => {
                this.bindTxt = text;
            });
            return;
        }

        // if there is no binding change normally
        $element.html(text);
    };

    var progressiveForm = text => {
        // let vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
        let vowels = ['e', 'E'];
        let progressiveText = 'ing ...';
        // split the value to array
        let unFormatText = text.trim().split("");

        // check the last text if it is a vowel
        if (vowels.indexOf(unFormatText[unFormatText.length - 1]) != -1) {
            // if it is a vowel convert it to progressive form
            unFormatText[unFormatText.length - 1] = progressiveText;
        }

        // additional condition soon.
        return unFormatText.join("");
    };
}

/***/ })
/******/ ]);