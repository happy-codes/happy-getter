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

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var REG_KEY = /\[(['"a-zA-Z0-9]*)\]/i;

/**
 * getter
 * @param {object} data the object data
 * @param {string} path the key path you want to get
 * @param {object} options another options
 */
function getter(data, path) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var pathArr = path.split('.');
  var result = pathArr.reduce(function (result, currentPath, currentIndex) {
    if (!result.errorPath) {
      // get value
      var key = currentPath;
      if (REG_KEY.test(currentPath)) {
        var nextKey = currentPath.match(REG_KEY)[1];
        var currentKey = key.replace(nextKey, '').replace('[]', '');
        result.value = result.value[currentKey];
        key = nextKey;
      }
      result.value = result.value[key];

      // check value
      if (currentIndex !== pathArr.length - 1) {
        // can not get the next value
        var currentValueType = Object.prototype.toString.call(result.value);
        if (/String|Number|Boolean|Null|Undefined/.test(currentValueType)) {
          result.errorPath = currentPath;
        }
      }
    }

    return result;
  }, { value: data, errorPath: null });

  // throw error
  if (options.errorCallback && Object.prototype.toString.call(options.errorCallback) === '[object Function]') {
    options.errorCallback(result.errorPath, pathArr);
  }
  return result.value;
}

/**
 * put the happy getter to all object
 * @param {string} name custom getter function name
 */
function attachToObject() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'getter';

  if (!Object.prototype.hasOwnProperty(name)) {
    Object.defineProperty(Object.prototype, name, {
      value: function value(path, options) {
        return getter(this, path, options);
      }
    });
  }
}

exports.default = getter;
exports.attachToObject = attachToObject;

/***/ })
/******/ ]);