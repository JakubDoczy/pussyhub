/******/ (function(modules) { // webpackBootstrap
    /******/ 	// install a JSONP callback for chunk loading
    /******/ 	function webpackJsonpCallback(data) {
        /******/ 		var chunkIds = data[0];
        /******/ 		var moreModules = data[1];
        /******/
        /******/
        /******/ 		// add "moreModules" to the modules object,
        /******/ 		// then flag all "chunkIds" as loaded and fire callback
        /******/ 		var moduleId, chunkId, i = 0, resolves = [];
        /******/ 		for(;i < chunkIds.length; i++) {
            /******/ 			chunkId = chunkIds[i];
            /******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
                /******/ 				resolves.push(installedChunks[chunkId][0]);
                /******/ 			}
            /******/ 			installedChunks[chunkId] = 0;
            /******/ 		}
        /******/ 		for(moduleId in moreModules) {
            /******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
                /******/ 				modules[moduleId] = moreModules[moduleId];
                /******/ 			}
            /******/ 		}
        /******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
        /******/
        /******/ 		while(resolves.length) {
            /******/ 			resolves.shift()();
            /******/ 		}
        /******/
        /******/ 	};
    /******/
    /******/
    /******/ 	// The module cache
    /******/ 	var installedModules = {};
    /******/
    /******/ 	// object to store loaded and loading chunks
    /******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
    /******/ 	// Promise = chunk loading, 0 = chunk loaded
    /******/ 	var installedChunks = {
        /******/ 		1: 0
        /******/ 	};
    /******/
    /******/
    /******/
    /******/ 	// script path function
    /******/ 	function jsonpScriptSrc(chunkId) {
        /******/ 		return __webpack_require__.p + "" + ({"0":"dashjs","2":"vendors~dashjs","3":"vendors~hlsjs","4":"vendors~panolens","5":"vendors~vttjs","6":"vttjs","7":"webvtt"}[chunkId]||chunkId) + "." + {"0":"e97ba61c50f930d6e8b4","2":"0f5f49dc93083be85c5b","3":"31e910b50a4963178dc6","4":"4462a70d99cff46b8c51","5":"8d76e91969d3d0ade997","6":"03c88be267208f2c46c6","7":"205b881597c7c86ce668"}[chunkId] + ".min.js"
        /******/ 	}
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
    /******/ 	// This file contains only the entry chunk.
    /******/ 	// The chunk loading function for additional chunks
    /******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
        /******/ 		var promises = [];
        /******/
        /******/
        /******/ 		// JSONP chunk loading for javascript
        /******/
        /******/ 		var installedChunkData = installedChunks[chunkId];
        /******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
            /******/
            /******/ 			// a Promise means "currently loading".
            /******/ 			if(installedChunkData) {
                /******/ 				promises.push(installedChunkData[2]);
                /******/ 			} else {
                /******/ 				// setup Promise in chunk cache
                /******/ 				var promise = new Promise(function(resolve, reject) {
                    /******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
                    /******/ 				});
                /******/ 				promises.push(installedChunkData[2] = promise);
                /******/
                /******/ 				// start chunk loading
                /******/ 				var script = document.createElement('script');
                /******/ 				var onScriptComplete;
                /******/
                /******/ 				script.charset = 'utf-8';
                /******/ 				script.timeout = 120;
                /******/ 				if (__webpack_require__.nc) {
                    /******/ 					script.setAttribute("nonce", __webpack_require__.nc);
                    /******/ 				}
                /******/ 				script.src = jsonpScriptSrc(chunkId);
                /******/
                /******/ 				// create error before stack unwound to get useful stacktrace later
                /******/ 				var error = new Error();
                /******/ 				onScriptComplete = function (event) {
                    /******/ 					// avoid mem leaks in IE.
                    /******/ 					script.onerror = script.onload = null;
                    /******/ 					clearTimeout(timeout);
                    /******/ 					var chunk = installedChunks[chunkId];
                    /******/ 					if(chunk !== 0) {
                        /******/ 						if(chunk) {
                            /******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
                            /******/ 							var realSrc = event && event.target && event.target.src;
                            /******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
                            /******/ 							error.name = 'ChunkLoadError';
                            /******/ 							error.type = errorType;
                            /******/ 							error.request = realSrc;
                            /******/ 							chunk[1](error);
                            /******/ 						}
                        /******/ 						installedChunks[chunkId] = undefined;
                        /******/ 					}
                    /******/ 				};
                /******/ 				var timeout = setTimeout(function(){
                    /******/ 					onScriptComplete({ type: 'timeout', target: script });
                    /******/ 				}, 120000);
                /******/ 				script.onerror = script.onload = onScriptComplete;
                /******/ 				document.head.appendChild(script);
                /******/ 			}
            /******/ 		}
        /******/ 		return Promise.all(promises);
        /******/ 	};
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
            /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
            /******/ 		}
        /******/ 	};
    /******/
    /******/ 	// define __esModule on exports
    /******/ 	__webpack_require__.r = function(exports) {
        /******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            /******/ 		}
        /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
        /******/ 	};
    /******/
    /******/ 	// create a fake namespace object
    /******/ 	// mode & 1: value is a module id, require it
    /******/ 	// mode & 2: merge all properties of value into the ns
    /******/ 	// mode & 4: return value when already ns object
    /******/ 	// mode & 8|1: behave like require
    /******/ 	__webpack_require__.t = function(value, mode) {
        /******/ 		if(mode & 1) value = __webpack_require__(value);
        /******/ 		if(mode & 8) return value;
        /******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
        /******/ 		var ns = Object.create(null);
        /******/ 		__webpack_require__.r(ns);
        /******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
        /******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
        /******/ 		return ns;
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
    /******/ 	__webpack_require__.p = "/";
    /******/
    /******/ 	// on error function for async loading
    /******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
    /******/
    /******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
    /******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
    /******/ 	jsonpArray.push = webpackJsonpCallback;
    /******/ 	jsonpArray = jsonpArray.slice();
    /******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
    /******/ 	var parentJsonpFunction = oldJsonpFunction;
    /******/
    /******/
    /******/ 	// Load entry module and return exports
    /******/ 	return __webpack_require__(__webpack_require__.s = 13);
    /******/ })
    /************************************************************************/
    /******/ ([
        /* 0 */
        /***/ (function(module, exports, __webpack_require__) {

            /* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */

                (function (global, factory) {
                    true ? module.exports = factory() :
                        undefined;
                }(this, (function () { 'use strict';

                    function objectOrFunction(x) {
                        var type = typeof x;
                        return x !== null && (type === 'object' || type === 'function');
                    }

                    function isFunction(x) {
                        return typeof x === 'function';
                    }



                    var _isArray = void 0;
                    if (Array.isArray) {
                        _isArray = Array.isArray;
                    } else {
                        _isArray = function (x) {
                            return Object.prototype.toString.call(x) === '[object Array]';
                        };
                    }

                    var isArray = _isArray;

                    var len = 0;
                    var vertxNext = void 0;
                    var customSchedulerFn = void 0;

                    var asap = function asap(callback, arg) {
                        queue[len] = callback;
                        queue[len + 1] = arg;
                        len += 2;
                        if (len === 2) {
                            // If len is 2, that means that we need to schedule an async flush.
                            // If additional callbacks are queued before the queue is flushed, they
                            // will be processed by this flush that we are scheduling.
                            if (customSchedulerFn) {
                                customSchedulerFn(flush);
                            } else {
                                scheduleFlush();
                            }
                        }
                    };

                    function setScheduler(scheduleFn) {
                        customSchedulerFn = scheduleFn;
                    }

                    function setAsap(asapFn) {
                        asap = asapFn;
                    }

                    var browserWindow = typeof window !== 'undefined' ? window : undefined;
                    var browserGlobal = browserWindow || {};
                    var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
                    var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
                    var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
                    function useNextTick() {
                        // node version 0.10.x displays a deprecation warning when nextTick is used recursively
                        // see https://github.com/cujojs/when/issues/410 for details
                        return function () {
                            return process.nextTick(flush);
                        };
                    }

// vertx
                    function useVertxTimer() {
                        if (typeof vertxNext !== 'undefined') {
                            return function () {
                                vertxNext(flush);
                            };
                        }

                        return useSetTimeout();
                    }

                    function useMutationObserver() {
                        var iterations = 0;
                        var observer = new BrowserMutationObserver(flush);
                        var node = document.createTextNode('');
                        observer.observe(node, { characterData: true });

                        return function () {
                            node.data = iterations = ++iterations % 2;
                        };
                    }

// web worker
                    function useMessageChannel() {
                        var channel = new MessageChannel();
                        channel.port1.onmessage = flush;
                        return function () {
                            return channel.port2.postMessage(0);
                        };
                    }

                    function useSetTimeout() {
                        // Store setTimeout reference so es6-promise will be unaffected by
                        // other code modifying setTimeout (like sinon.useFakeTimers())
                        var globalSetTimeout = setTimeout;
                        return function () {
                            return globalSetTimeout(flush, 1);
                        };
                    }

                    var queue = new Array(1000);
                    function flush() {
                        for (var i = 0; i < len; i += 2) {
                            var callback = queue[i];
                            var arg = queue[i + 1];

                            callback(arg);

                            queue[i] = undefined;
                            queue[i + 1] = undefined;
                        }

                        len = 0;
                    }

                    function attemptVertx() {
                        try {
                            var vertx = Function('return this')().require('vertx');
                            vertxNext = vertx.runOnLoop || vertx.runOnContext;
                            return useVertxTimer();
                        } catch (e) {
                            return useSetTimeout();
                        }
                    }

                    var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
                    if (isNode) {
                        scheduleFlush = useNextTick();
                    } else if (BrowserMutationObserver) {
                        scheduleFlush = useMutationObserver();
                    } else if (isWorker) {
                        scheduleFlush = useMessageChannel();
                    } else if (browserWindow === undefined && "function" === 'function') {
                        scheduleFlush = attemptVertx();
                    } else {
                        scheduleFlush = useSetTimeout();
                    }

                    function then(onFulfillment, onRejection) {
                        var parent = this;

                        var child = new this.constructor(noop);

                        if (child[PROMISE_ID] === undefined) {
                            makePromise(child);
                        }

                        var _state = parent._state;


                        if (_state) {
                            var callback = arguments[_state - 1];
                            asap(function () {
                                return invokeCallback(_state, child, callback, parent._result);
                            });
                        } else {
                            subscribe(parent, child, onFulfillment, onRejection);
                        }

                        return child;
                    }

                    /**
                     `Promise.resolve` returns a promise that will become resolved with the
                     passed `value`. It is shorthand for the following:

                     ```javascript
                     let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

                     promise.then(function(value){
    // value === 1
  });
                     ```

                     Instead of writing the above, your code now simply becomes the following:

                     ```javascript
                     let promise = Promise.resolve(1);

                     promise.then(function(value){
    // value === 1
  });
                     ```

                     @method resolve
                     @static
                     @param {Any} value value that the returned promise will be resolved with
                     Useful for tooling.
                     @return {Promise} a promise that will become fulfilled with the given
                     `value`
                     */
                    function resolve$1(object) {
                        /*jshint validthis:true */
                        var Constructor = this;

                        if (object && typeof object === 'object' && object.constructor === Constructor) {
                            return object;
                        }

                        var promise = new Constructor(noop);
                        resolve(promise, object);
                        return promise;
                    }

                    var PROMISE_ID = Math.random().toString(36).substring(2);

                    function noop() {}

                    var PENDING = void 0;
                    var FULFILLED = 1;
                    var REJECTED = 2;

                    function selfFulfillment() {
                        return new TypeError("You cannot resolve a promise with itself");
                    }

                    function cannotReturnOwn() {
                        return new TypeError('A promises callback cannot return that same promise.');
                    }

                    function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
                        try {
                            then$$1.call(value, fulfillmentHandler, rejectionHandler);
                        } catch (e) {
                            return e;
                        }
                    }

                    function handleForeignThenable(promise, thenable, then$$1) {
                        asap(function (promise) {
                            var sealed = false;
                            var error = tryThen(then$$1, thenable, function (value) {
                                if (sealed) {
                                    return;
                                }
                                sealed = true;
                                if (thenable !== value) {
                                    resolve(promise, value);
                                } else {
                                    fulfill(promise, value);
                                }
                            }, function (reason) {
                                if (sealed) {
                                    return;
                                }
                                sealed = true;

                                reject(promise, reason);
                            }, 'Settle: ' + (promise._label || ' unknown promise'));

                            if (!sealed && error) {
                                sealed = true;
                                reject(promise, error);
                            }
                        }, promise);
                    }

                    function handleOwnThenable(promise, thenable) {
                        if (thenable._state === FULFILLED) {
                            fulfill(promise, thenable._result);
                        } else if (thenable._state === REJECTED) {
                            reject(promise, thenable._result);
                        } else {
                            subscribe(thenable, undefined, function (value) {
                                return resolve(promise, value);
                            }, function (reason) {
                                return reject(promise, reason);
                            });
                        }
                    }

                    function handleMaybeThenable(promise, maybeThenable, then$$1) {
                        if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
                            handleOwnThenable(promise, maybeThenable);
                        } else {
                            if (then$$1 === undefined) {
                                fulfill(promise, maybeThenable);
                            } else if (isFunction(then$$1)) {
                                handleForeignThenable(promise, maybeThenable, then$$1);
                            } else {
                                fulfill(promise, maybeThenable);
                            }
                        }
                    }

                    function resolve(promise, value) {
                        if (promise === value) {
                            reject(promise, selfFulfillment());
                        } else if (objectOrFunction(value)) {
                            var then$$1 = void 0;
                            try {
                                then$$1 = value.then;
                            } catch (error) {
                                reject(promise, error);
                                return;
                            }
                            handleMaybeThenable(promise, value, then$$1);
                        } else {
                            fulfill(promise, value);
                        }
                    }

                    function publishRejection(promise) {
                        if (promise._onerror) {
                            promise._onerror(promise._result);
                        }

                        publish(promise);
                    }

                    function fulfill(promise, value) {
                        if (promise._state !== PENDING) {
                            return;
                        }

                        promise._result = value;
                        promise._state = FULFILLED;

                        if (promise._subscribers.length !== 0) {
                            asap(publish, promise);
                        }
                    }

                    function reject(promise, reason) {
                        if (promise._state !== PENDING) {
                            return;
                        }
                        promise._state = REJECTED;
                        promise._result = reason;

                        asap(publishRejection, promise);
                    }

                    function subscribe(parent, child, onFulfillment, onRejection) {
                        var _subscribers = parent._subscribers;
                        var length = _subscribers.length;


                        parent._onerror = null;

                        _subscribers[length] = child;
                        _subscribers[length + FULFILLED] = onFulfillment;
                        _subscribers[length + REJECTED] = onRejection;

                        if (length === 0 && parent._state) {
                            asap(publish, parent);
                        }
                    }

                    function publish(promise) {
                        var subscribers = promise._subscribers;
                        var settled = promise._state;

                        if (subscribers.length === 0) {
                            return;
                        }

                        var child = void 0,
                            callback = void 0,
                            detail = promise._result;

                        for (var i = 0; i < subscribers.length; i += 3) {
                            child = subscribers[i];
                            callback = subscribers[i + settled];

                            if (child) {
                                invokeCallback(settled, child, callback, detail);
                            } else {
                                callback(detail);
                            }
                        }

                        promise._subscribers.length = 0;
                    }

                    function invokeCallback(settled, promise, callback, detail) {
                        var hasCallback = isFunction(callback),
                            value = void 0,
                            error = void 0,
                            succeeded = true;

                        if (hasCallback) {
                            try {
                                value = callback(detail);
                            } catch (e) {
                                succeeded = false;
                                error = e;
                            }

                            if (promise === value) {
                                reject(promise, cannotReturnOwn());
                                return;
                            }
                        } else {
                            value = detail;
                        }

                        if (promise._state !== PENDING) {
                            // noop
                        } else if (hasCallback && succeeded) {
                            resolve(promise, value);
                        } else if (succeeded === false) {
                            reject(promise, error);
                        } else if (settled === FULFILLED) {
                            fulfill(promise, value);
                        } else if (settled === REJECTED) {
                            reject(promise, value);
                        }
                    }

                    function initializePromise(promise, resolver) {
                        try {
                            resolver(function resolvePromise(value) {
                                resolve(promise, value);
                            }, function rejectPromise(reason) {
                                reject(promise, reason);
                            });
                        } catch (e) {
                            reject(promise, e);
                        }
                    }

                    var id = 0;
                    function nextId() {
                        return id++;
                    }

                    function makePromise(promise) {
                        promise[PROMISE_ID] = id++;
                        promise._state = undefined;
                        promise._result = undefined;
                        promise._subscribers = [];
                    }

                    function validationError() {
                        return new Error('Array Methods must be provided an Array');
                    }

                    var Enumerator = function () {
                        function Enumerator(Constructor, input) {
                            this._instanceConstructor = Constructor;
                            this.promise = new Constructor(noop);

                            if (!this.promise[PROMISE_ID]) {
                                makePromise(this.promise);
                            }

                            if (isArray(input)) {
                                this.length = input.length;
                                this._remaining = input.length;

                                this._result = new Array(this.length);

                                if (this.length === 0) {
                                    fulfill(this.promise, this._result);
                                } else {
                                    this.length = this.length || 0;
                                    this._enumerate(input);
                                    if (this._remaining === 0) {
                                        fulfill(this.promise, this._result);
                                    }
                                }
                            } else {
                                reject(this.promise, validationError());
                            }
                        }

                        Enumerator.prototype._enumerate = function _enumerate(input) {
                            for (var i = 0; this._state === PENDING && i < input.length; i++) {
                                this._eachEntry(input[i], i);
                            }
                        };

                        Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
                            var c = this._instanceConstructor;
                            var resolve$$1 = c.resolve;


                            if (resolve$$1 === resolve$1) {
                                var _then = void 0;
                                var error = void 0;
                                var didError = false;
                                try {
                                    _then = entry.then;
                                } catch (e) {
                                    didError = true;
                                    error = e;
                                }

                                if (_then === then && entry._state !== PENDING) {
                                    this._settledAt(entry._state, i, entry._result);
                                } else if (typeof _then !== 'function') {
                                    this._remaining--;
                                    this._result[i] = entry;
                                } else if (c === Promise$1) {
                                    var promise = new c(noop);
                                    if (didError) {
                                        reject(promise, error);
                                    } else {
                                        handleMaybeThenable(promise, entry, _then);
                                    }
                                    this._willSettleAt(promise, i);
                                } else {
                                    this._willSettleAt(new c(function (resolve$$1) {
                                        return resolve$$1(entry);
                                    }), i);
                                }
                            } else {
                                this._willSettleAt(resolve$$1(entry), i);
                            }
                        };

                        Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
                            var promise = this.promise;


                            if (promise._state === PENDING) {
                                this._remaining--;

                                if (state === REJECTED) {
                                    reject(promise, value);
                                } else {
                                    this._result[i] = value;
                                }
                            }

                            if (this._remaining === 0) {
                                fulfill(promise, this._result);
                            }
                        };

                        Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
                            var enumerator = this;

                            subscribe(promise, undefined, function (value) {
                                return enumerator._settledAt(FULFILLED, i, value);
                            }, function (reason) {
                                return enumerator._settledAt(REJECTED, i, reason);
                            });
                        };

                        return Enumerator;
                    }();

                    /**
                     `Promise.all` accepts an array of promises, and returns a new promise which
                     is fulfilled with an array of fulfillment values for the passed promises, or
                     rejected with the reason of the first passed promise to be rejected. It casts all
                     elements of the passed iterable to promises as it runs this algorithm.

                     Example:

                     ```javascript
                     let promise1 = resolve(1);
                     let promise2 = resolve(2);
                     let promise3 = resolve(3);
                     let promises = [ promise1, promise2, promise3 ];

                     Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
                     ```

                     If any of the `promises` given to `all` are rejected, the first promise
                     that is rejected will be given as an argument to the returned promises's
                     rejection handler. For example:

                     Example:

                     ```javascript
                     let promise1 = resolve(1);
                     let promise2 = reject(new Error("2"));
                     let promise3 = reject(new Error("3"));
                     let promises = [ promise1, promise2, promise3 ];

                     Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
                     ```

                     @method all
                     @static
                     @param {Array} entries array of promises
                     @param {String} label optional string for labeling the promise.
                     Useful for tooling.
                     @return {Promise} promise that is fulfilled when all `promises` have been
                     fulfilled, or rejected if any of them become rejected.
                     @static
                     */
                    function all(entries) {
                        return new Enumerator(this, entries).promise;
                    }

                    /**
                     `Promise.race` returns a new promise which is settled in the same way as the
                     first passed promise to settle.

                     Example:

                     ```javascript
                     let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

                     let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

                     Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
                     ```

                     `Promise.race` is deterministic in that only the state of the first
                     settled promise matters. For example, even if other promises given to the
                     `promises` array argument are resolved, but the first settled promise has
                     become rejected before the other promises became fulfilled, the returned
                     promise will become rejected:

                     ```javascript
                     let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

                     let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

                     Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
                     ```

                     An example real-world use case is implementing timeouts:

                     ```javascript
                     Promise.race([ajax('foo.json'), timeout(5000)])
                     ```

                     @method race
                     @static
                     @param {Array} promises array of promises to observe
                     Useful for tooling.
                     @return {Promise} a promise which settles in the same way as the first passed
                     promise to settle.
                     */
                    function race(entries) {
                        /*jshint validthis:true */
                        var Constructor = this;

                        if (!isArray(entries)) {
                            return new Constructor(function (_, reject) {
                                return reject(new TypeError('You must pass an array to race.'));
                            });
                        } else {
                            return new Constructor(function (resolve, reject) {
                                var length = entries.length;
                                for (var i = 0; i < length; i++) {
                                    Constructor.resolve(entries[i]).then(resolve, reject);
                                }
                            });
                        }
                    }

                    /**
                     `Promise.reject` returns a promise rejected with the passed `reason`.
                     It is shorthand for the following:

                     ```javascript
                     let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

                     promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
                     ```

                     Instead of writing the above, your code now simply becomes the following:

                     ```javascript
                     let promise = Promise.reject(new Error('WHOOPS'));

                     promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
                     ```

                     @method reject
                     @static
                     @param {Any} reason value that the returned promise will be rejected with.
                     Useful for tooling.
                     @return {Promise} a promise rejected with the given `reason`.
                     */
                    function reject$1(reason) {
                        /*jshint validthis:true */
                        var Constructor = this;
                        var promise = new Constructor(noop);
                        reject(promise, reason);
                        return promise;
                    }

                    function needsResolver() {
                        throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
                    }

                    function needsNew() {
                        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
                    }

                    /**
                     Promise objects represent the eventual result of an asynchronous operation. The
                     primary way of interacting with a promise is through its `then` method, which
                     registers callbacks to receive either a promise's eventual value or the reason
                     why the promise cannot be fulfilled.

                     Terminology
                     -----------

                     - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
                     - `thenable` is an object or function that defines a `then` method.
                     - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
                     - `exception` is a value that is thrown using the throw statement.
                     - `reason` is a value that indicates why a promise was rejected.
                     - `settled` the final resting state of a promise, fulfilled or rejected.

                     A promise can be in one of three states: pending, fulfilled, or rejected.

                     Promises that are fulfilled have a fulfillment value and are in the fulfilled
                     state.  Promises that are rejected have a rejection reason and are in the
                     rejected state.  A fulfillment value is never a thenable.

                     Promises can also be said to *resolve* a value.  If this value is also a
                     promise, then the original promise's settled state will match the value's
                     settled state.  So a promise that *resolves* a promise that rejects will
                     itself reject, and a promise that *resolves* a promise that fulfills will
                     itself fulfill.


                     Basic Usage:
                     ------------

                     ```js
                     let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

                     promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
                     ```

                     Advanced Usage:
                     ---------------

                     Promises shine when abstracting away asynchronous interactions such as
                     `XMLHttpRequest`s.

                     ```js
                     function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

                     getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
                     ```

                     Unlike callbacks, promises are great composable primitives.

                     ```js
                     Promise.all([
                     getJSON('/posts'),
                     getJSON('/comments')
                     ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
                     ```

                     @class Promise
                     @param {Function} resolver
                     Useful for tooling.
                     @constructor
                     */

                    var Promise$1 = function () {
                        function Promise(resolver) {
                            this[PROMISE_ID] = nextId();
                            this._result = this._state = undefined;
                            this._subscribers = [];

                            if (noop !== resolver) {
                                typeof resolver !== 'function' && needsResolver();
                                this instanceof Promise ? initializePromise(this, resolver) : needsNew();
                            }
                        }

                        /**
                         The primary way of interacting with a promise is through its `then` method,
                         which registers callbacks to receive either a promise's eventual value or the
                         reason why the promise cannot be fulfilled.
                         ```js
                         findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
                         ```
                         Chaining
                         --------
                         The return value of `then` is itself a promise.  This second, 'downstream'
                         promise is resolved with the return value of the first promise's fulfillment
                         or rejection handler, or rejected if the handler throws an exception.
                         ```js
                         findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
                         findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
                         ```
                         If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
                         ```js
                         findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
                         ```
                         Assimilation
                         ------------
                         Sometimes the value you want to propagate to a downstream promise can only be
                         retrieved asynchronously. This can be achieved by returning a promise in the
                         fulfillment or rejection handler. The downstream promise will then be pending
                         until the returned promise is settled. This is called *assimilation*.
                         ```js
                         findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
                         ```
                         If the assimliated promise rejects, then the downstream promise will also reject.
                         ```js
                         findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
                         ```
                         Simple Example
                         --------------
                         Synchronous Example
                         ```javascript
                         let result;
                         try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
                         ```
                         Errback Example
                         ```js
                         findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
                         ```
                         Promise Example;
                         ```javascript
                         findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
                         ```
                         Advanced Example
                         --------------
                         Synchronous Example
                         ```javascript
                         let author, books;
                         try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
                         ```
                         Errback Example
                         ```js
                         function foundBooks(books) {
   }
                         function failure(reason) {
   }
                         findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
                         ```
                         Promise Example;
                         ```javascript
                         findAuthor().
                         then(findBooksByAuthor).
                         then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
                         ```
                         @method then
                         @param {Function} onFulfilled
                         @param {Function} onRejected
                         Useful for tooling.
                         @return {Promise}
                         */

                        /**
                         `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
                         as the catch block of a try/catch statement.
                         ```js
                         function findAuthor(){
  throw new Error('couldn't find that author');
  }
                         // synchronous
                         try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
                         // async with promises
                         findAuthor().catch(function(reason){
  // something went wrong
  });
                         ```
                         @method catch
                         @param {Function} onRejection
                         Useful for tooling.
                         @return {Promise}
                         */


                        Promise.prototype.catch = function _catch(onRejection) {
                            return this.then(null, onRejection);
                        };

                        /**
                         `finally` will be invoked regardless of the promise's fate just as native
                         try/catch/finally behaves

                         Synchronous example:

                         ```js
                         findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }

                         try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
                         ```

                         Asynchronous example:

                         ```js
                         findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
                         ```

                         @method finally
                         @param {Function} callback
                         @return {Promise}
                         */


                        Promise.prototype.finally = function _finally(callback) {
                            var promise = this;
                            var constructor = promise.constructor;

                            if (isFunction(callback)) {
                                return promise.then(function (value) {
                                    return constructor.resolve(callback()).then(function () {
                                        return value;
                                    });
                                }, function (reason) {
                                    return constructor.resolve(callback()).then(function () {
                                        throw reason;
                                    });
                                });
                            }

                            return promise.then(callback, callback);
                        };

                        return Promise;
                    }();

                    Promise$1.prototype.then = then;
                    Promise$1.all = all;
                    Promise$1.race = race;
                    Promise$1.resolve = resolve$1;
                    Promise$1.reject = reject$1;
                    Promise$1._setScheduler = setScheduler;
                    Promise$1._setAsap = setAsap;
                    Promise$1._asap = asap;

                    /*global self*/
                    function polyfill() {
                        var local = void 0;

                        if (typeof global !== 'undefined') {
                            local = global;
                        } else if (typeof self !== 'undefined') {
                            local = self;
                        } else {
                            try {
                                local = Function('return this')();
                            } catch (e) {
                                throw new Error('polyfill failed because global object is unavailable in this environment');
                            }
                        }

                        var P = local.Promise;

                        if (P) {
                            var promiseToString = null;
                            try {
                                promiseToString = Object.prototype.toString.call(P.resolve());
                            } catch (e) {
                                // silently ignored
                            }

                            if (promiseToString === '[object Promise]' && !P.cast) {
                                return;
                            }
                        }

                        local.Promise = Promise$1;
                    }

// Strange compat..
                    Promise$1.polyfill = polyfill;
                    Promise$1.Promise = Promise$1;

                    return Promise$1;

                })));



//# sourceMappingURL=es6-promise.map

                /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2), __webpack_require__(1)))

            /***/ }),
        /* 1 */
        /***/ (function(module, exports) {

            var g;

// This works in non-strict mode
            g = (function() {
                return this;
            })();

            try {
                // This works if eval is allowed (see CSP)
                g = g || new Function("return this")();
            } catch (e) {
                // This works if the window reference is available
                if (typeof window === "object") g = window;
            }

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

            module.exports = g;


            /***/ }),
        /* 2 */
        /***/ (function(module, exports) {

// shim for using process in browser
            var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

            var cachedSetTimeout;
            var cachedClearTimeout;

            function defaultSetTimout() {
                throw new Error('setTimeout has not been defined');
            }
            function defaultClearTimeout () {
                throw new Error('clearTimeout has not been defined');
            }
            (function () {
                try {
                    if (typeof setTimeout === 'function') {
                        cachedSetTimeout = setTimeout;
                    } else {
                        cachedSetTimeout = defaultSetTimout;
                    }
                } catch (e) {
                    cachedSetTimeout = defaultSetTimout;
                }
                try {
                    if (typeof clearTimeout === 'function') {
                        cachedClearTimeout = clearTimeout;
                    } else {
                        cachedClearTimeout = defaultClearTimeout;
                    }
                } catch (e) {
                    cachedClearTimeout = defaultClearTimeout;
                }
            } ())
            function runTimeout(fun) {
                if (cachedSetTimeout === setTimeout) {
                    //normal enviroments in sane situations
                    return setTimeout(fun, 0);
                }
                // if setTimeout wasn't available but was latter defined
                if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                    cachedSetTimeout = setTimeout;
                    return setTimeout(fun, 0);
                }
                try {
                    // when when somebody has screwed with setTimeout but no I.E. maddness
                    return cachedSetTimeout(fun, 0);
                } catch(e){
                    try {
                        // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                        return cachedSetTimeout.call(null, fun, 0);
                    } catch(e){
                        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                        return cachedSetTimeout.call(this, fun, 0);
                    }
                }


            }
            function runClearTimeout(marker) {
                if (cachedClearTimeout === clearTimeout) {
                    //normal enviroments in sane situations
                    return clearTimeout(marker);
                }
                // if clearTimeout wasn't available but was latter defined
                if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                    cachedClearTimeout = clearTimeout;
                    return clearTimeout(marker);
                }
                try {
                    // when when somebody has screwed with setTimeout but no I.E. maddness
                    return cachedClearTimeout(marker);
                } catch (e){
                    try {
                        // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                        return cachedClearTimeout.call(null, marker);
                    } catch (e){
                        // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                        // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                        return cachedClearTimeout.call(this, marker);
                    }
                }



            }
            var queue = [];
            var draining = false;
            var currentQueue;
            var queueIndex = -1;

            function cleanUpNextTick() {
                if (!draining || !currentQueue) {
                    return;
                }
                draining = false;
                if (currentQueue.length) {
                    queue = currentQueue.concat(queue);
                } else {
                    queueIndex = -1;
                }
                if (queue.length) {
                    drainQueue();
                }
            }

            function drainQueue() {
                if (draining) {
                    return;
                }
                var timeout = runTimeout(cleanUpNextTick);
                draining = true;

                var len = queue.length;
                while(len) {
                    currentQueue = queue;
                    queue = [];
                    while (++queueIndex < len) {
                        if (currentQueue) {
                            currentQueue[queueIndex].run();
                        }
                    }
                    queueIndex = -1;
                    len = queue.length;
                }
                currentQueue = null;
                draining = false;
                runClearTimeout(timeout);
            }

            process.nextTick = function (fun) {
                var args = new Array(arguments.length - 1);
                if (arguments.length > 1) {
                    for (var i = 1; i < arguments.length; i++) {
                        args[i - 1] = arguments[i];
                    }
                }
                queue.push(new Item(fun, args));
                if (queue.length === 1 && !draining) {
                    runTimeout(drainQueue);
                }
            };

// v8 likes predictible objects
            function Item(fun, array) {
                this.fun = fun;
                this.array = array;
            }
            Item.prototype.run = function () {
                this.fun.apply(null, this.array);
            };
            process.title = 'browser';
            process.browser = true;
            process.env = {};
            process.argv = [];
            process.version = ''; // empty string to avoid regexp issues
            process.versions = {};

            function noop() {}

            process.on = noop;
            process.addListener = noop;
            process.once = noop;
            process.off = noop;
            process.removeListener = noop;
            process.removeAllListeners = noop;
            process.emit = noop;
            process.prependListener = noop;
            process.prependOnceListener = noop;

            process.listeners = function (name) { return [] }

            process.binding = function (name) {
                throw new Error('process.binding is not supported');
            };

            process.cwd = function () { return '/' };
            process.chdir = function (dir) {
                throw new Error('process.chdir is not supported');
            };
            process.umask = function() { return 0; };


            /***/ }),
        /* 3 */
        /***/ (function(module, exports, __webpack_require__) {

            var api = __webpack_require__(4);
            var content = __webpack_require__(5);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
                content = [[module.i, content, '']];
            }

            var options = {};

            options.insert = "head";
            options.singleton = false;

            var update = api(content, options);



            module.exports = content.locals || {};

            /***/ }),
        /* 4 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";


            var isOldIE = function isOldIE() {
                var memo;
                return function memorize() {
                    if (typeof memo === 'undefined') {
                        // Test for IE <= 9 as proposed by Browserhacks
                        // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
                        // Tests for existence of standard globals is to allow style-loader
                        // to operate correctly into non-standard environments
                        // @see https://github.com/webpack-contrib/style-loader/issues/177
                        memo = Boolean(window && document && document.all && !window.atob);
                    }

                    return memo;
                };
            }();

            var getTarget = function getTarget() {
                var memo = {};
                return function memorize(target) {
                    if (typeof memo[target] === 'undefined') {
                        var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

                        if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
                            try {
                                // This will throw an exception if access to iframe is blocked
                                // due to cross-origin restrictions
                                styleTarget = styleTarget.contentDocument.head;
                            } catch (e) {
                                // istanbul ignore next
                                styleTarget = null;
                            }
                        }

                        memo[target] = styleTarget;
                    }

                    return memo[target];
                };
            }();

            var stylesInDom = [];

            function getIndexByIdentifier(identifier) {
                var result = -1;

                for (var i = 0; i < stylesInDom.length; i++) {
                    if (stylesInDom[i].identifier === identifier) {
                        result = i;
                        break;
                    }
                }

                return result;
            }

            function modulesToDom(list, options) {
                var idCountMap = {};
                var identifiers = [];

                for (var i = 0; i < list.length; i++) {
                    var item = list[i];
                    var id = options.base ? item[0] + options.base : item[0];
                    var count = idCountMap[id] || 0;
                    var identifier = "".concat(id, " ").concat(count);
                    idCountMap[id] = count + 1;
                    var index = getIndexByIdentifier(identifier);
                    var obj = {
                        css: item[1],
                        media: item[2],
                        sourceMap: item[3]
                    };

                    if (index !== -1) {
                        stylesInDom[index].references++;
                        stylesInDom[index].updater(obj);
                    } else {
                        stylesInDom.push({
                            identifier: identifier,
                            updater: addStyle(obj, options),
                            references: 1
                        });
                    }

                    identifiers.push(identifier);
                }

                return identifiers;
            }

            function insertStyleElement(options) {
                var style = document.createElement('style');
                var attributes = options.attributes || {};

                if (typeof attributes.nonce === 'undefined') {
                    var nonce =  true ? __webpack_require__.nc : undefined;

                    if (nonce) {
                        attributes.nonce = nonce;
                    }
                }

                Object.keys(attributes).forEach(function (key) {
                    style.setAttribute(key, attributes[key]);
                });

                if (typeof options.insert === 'function') {
                    options.insert(style);
                } else {
                    var target = getTarget(options.insert || 'head');

                    if (!target) {
                        throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                    }

                    target.appendChild(style);
                }

                return style;
            }

            function removeStyleElement(style) {
                // istanbul ignore if
                if (style.parentNode === null) {
                    return false;
                }

                style.parentNode.removeChild(style);
            }
            /* istanbul ignore next  */


            var replaceText = function replaceText() {
                var textStore = [];
                return function replace(index, replacement) {
                    textStore[index] = replacement;
                    return textStore.filter(Boolean).join('\n');
                };
            }();

            function applyToSingletonTag(style, index, remove, obj) {
                var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

                /* istanbul ignore if  */

                if (style.styleSheet) {
                    style.styleSheet.cssText = replaceText(index, css);
                } else {
                    var cssNode = document.createTextNode(css);
                    var childNodes = style.childNodes;

                    if (childNodes[index]) {
                        style.removeChild(childNodes[index]);
                    }

                    if (childNodes.length) {
                        style.insertBefore(cssNode, childNodes[index]);
                    } else {
                        style.appendChild(cssNode);
                    }
                }
            }

            function applyToTag(style, options, obj) {
                var css = obj.css;
                var media = obj.media;
                var sourceMap = obj.sourceMap;

                if (media) {
                    style.setAttribute('media', media);
                } else {
                    style.removeAttribute('media');
                }

                if (sourceMap && btoa) {
                    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
                } // For old IE

                /* istanbul ignore if  */


                if (style.styleSheet) {
                    style.styleSheet.cssText = css;
                } else {
                    while (style.firstChild) {
                        style.removeChild(style.firstChild);
                    }

                    style.appendChild(document.createTextNode(css));
                }
            }

            var singleton = null;
            var singletonCounter = 0;

            function addStyle(obj, options) {
                var style;
                var update;
                var remove;

                if (options.singleton) {
                    var styleIndex = singletonCounter++;
                    style = singleton || (singleton = insertStyleElement(options));
                    update = applyToSingletonTag.bind(null, style, styleIndex, false);
                    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
                } else {
                    style = insertStyleElement(options);
                    update = applyToTag.bind(null, style, options);

                    remove = function remove() {
                        removeStyleElement(style);
                    };
                }

                update(obj);
                return function updateStyle(newObj) {
                    if (newObj) {
                        if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
                            return;
                        }

                        update(obj = newObj);
                    } else {
                        remove();
                    }
                };
            }

            module.exports = function (list, options) {
                options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
                // tags it will allow on a page

                if (!options.singleton && typeof options.singleton !== 'boolean') {
                    options.singleton = isOldIE();
                }

                list = list || [];
                var lastIdentifiers = modulesToDom(list, options);
                return function update(newList) {
                    newList = newList || [];

                    if (Object.prototype.toString.call(newList) !== '[object Array]') {
                        return;
                    }

                    for (var i = 0; i < lastIdentifiers.length; i++) {
                        var identifier = lastIdentifiers[i];
                        var index = getIndexByIdentifier(identifier);
                        stylesInDom[index].references--;
                    }

                    var newLastIdentifiers = modulesToDom(newList, options);

                    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
                        var _identifier = lastIdentifiers[_i];

                        var _index = getIndexByIdentifier(_identifier);

                        if (stylesInDom[_index].references === 0) {
                            stylesInDom[_index].updater();

                            stylesInDom.splice(_index, 1);
                        }
                    }

                    lastIdentifiers = newLastIdentifiers;
                };
            };

            /***/ }),
        /* 5 */
        /***/ (function(module, exports, __webpack_require__) {

// Imports
            var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(6);
            var ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(7);
            var ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(8);
            var ___CSS_LOADER_URL_IMPORT_1___ = __webpack_require__(9);
            var ___CSS_LOADER_URL_IMPORT_2___ = __webpack_require__(10);
            var ___CSS_LOADER_URL_IMPORT_3___ = __webpack_require__(11);
            var ___CSS_LOADER_URL_IMPORT_4___ = __webpack_require__(12);
            exports = ___CSS_LOADER_API_IMPORT___(false);
            var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
            var ___CSS_LOADER_URL_REPLACEMENT_1___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_1___);
            var ___CSS_LOADER_URL_REPLACEMENT_2___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_2___);
            var ___CSS_LOADER_URL_REPLACEMENT_3___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_3___);
            var ___CSS_LOADER_URL_REPLACEMENT_4___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_4___);
// Module
            exports.push([module.i, ".fluid_video_wrapper {\n    animation: none;\n    animation-delay: 0;\n    animation-direction: normal;\n    animation-duration: 0;\n    animation-fill-mode: none;\n    animation-iteration-count: 1;\n    animation-name: none;\n    animation-play-state: running;\n    animation-timing-function: ease;\n    backface-visibility: visible;\n    background: 0;\n    background-attachment: scroll;\n    background-clip: border-box;\n    background-color: transparent;\n    background-image: none;\n    background-origin: padding-box;\n    background-position: 0 0;\n    background-position-x: 0;\n    background-position-y: 0;\n    background-repeat: repeat;\n    background-size: auto auto;\n    border: 0;\n    border-style: none;\n    border-width: medium;\n    border-color: inherit;\n    border-bottom: 0;\n    border-bottom-color: inherit;\n    border-bottom-left-radius: 0;\n    border-bottom-right-radius: 0;\n    border-bottom-style: none;\n    border-bottom-width: medium;\n    border-collapse: separate;\n    border-image: none;\n    border-left: 0;\n    border-left-color: inherit;\n    border-left-style: none;\n    border-left-width: medium;\n    border-radius: 0;\n    border-right: 0;\n    border-right-color: inherit;\n    border-right-style: none;\n    border-right-width: medium;\n    border-spacing: 0;\n    border-top: 0;\n    border-top-color: inherit;\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n    border-top-style: none;\n    border-top-width: medium;\n    bottom: auto;\n    box-shadow: none;\n    -webkit-box-sizing: content-box;\n    -moz-box-sizing: content-box;\n    box-sizing: content-box;\n    caption-side: top;\n    clear: none;\n    clip: auto;\n    color: inherit;\n    columns: auto;\n    column-count: auto;\n    column-fill: balance;\n    column-gap: normal;\n    column-rule: medium none currentColor;\n    column-rule-color: currentColor;\n    column-rule-style: none;\n    column-rule-width: none;\n    column-span: 1;\n    column-width: auto;\n    content: normal;\n    counter-increment: none;\n    counter-reset: none;\n    cursor: auto;\n    direction: ltr;\n    display: inline;\n    empty-cells: show;\n    float: none;\n    font: normal;\n    font-family: -apple-system, BlinkMacSystemFont, 'segoe ui', roboto, oxygen-sans, ubuntu, cantarell, 'helvetica neue', 'arial', sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';\n    font-size: medium;\n    font-style: normal;\n    font-variant: normal;\n    font-weight: normal;\n    height: auto;\n    hyphens: none;\n    left: auto;\n    letter-spacing: normal;\n    line-height: normal;\n    list-style: none;\n    list-style-image: none;\n    list-style-position: outside;\n    list-style-type: disc;\n    margin: 0;\n    margin-bottom: 0;\n    margin-left: 0;\n    margin-right: 0;\n    margin-top: 0;\n    max-height: none;\n    max-width: none;\n    min-height: 0;\n    min-width: 0;\n    opacity: 1;\n    orphans: 0;\n    outline: 0;\n    outline-color: invert;\n    outline-style: none;\n    outline-width: medium;\n    overflow: visible;\n    overflow-x: visible;\n    overflow-y: visible;\n    padding: 0;\n    padding-bottom: 0;\n    padding-left: 0;\n    padding-right: 0;\n    padding-top: 0;\n    page-break-after: auto;\n    page-break-before: auto;\n    page-break-inside: auto;\n    perspective: none;\n    perspective-origin: 50% 50%;\n    position: static;\n    /* May need to alter quotes for different locales (e.g fr) */\n    quotes: '\\201C' '\\201D' '\\2018' '\\2019';\n    right: auto;\n    tab-size: 8;\n    table-layout: auto;\n    text-align: inherit;\n    text-align-last: auto;\n    text-decoration: none;\n    text-decoration-color: inherit;\n    text-decoration-line: none;\n    text-decoration-style: solid;\n    text-indent: 0;\n    text-shadow: none;\n    text-transform: none;\n    top: auto;\n    transform: none;\n    transform-style: flat;\n    transition: none;\n    transition-delay: 0s;\n    transition-duration: 0s;\n    transition-property: none;\n    transition-timing-function: ease;\n    unicode-bidi: normal;\n    vertical-align: baseline;\n    visibility: visible;\n    white-space: normal;\n    widows: 0;\n    width: auto;\n    word-spacing: normal;\n    z-index: auto;\n    -webkit-tap-highlight-color: transparent;\n}\n\n.fluid_video_wrapper canvas {\n    pointer-events: none;\n}\n\n.fluid_video_wrapper,\n.fluid_video_wrapper * {\n    -webkit-box-sizing: content-box;\n    -moz-box-sizing: content-box;\n    box-sizing: content-box;\n}\n\n.fluid_video_wrapper:after, .fluid_video_wrapper:before {\n    content: none;\n}\n\n.fluid_video_wrapper {\n    position: relative;\n    display: inline-block;\n}\n\n.fluid_video_wrapper video {\n    position: relative;\n    background-color: #000000;\n    display: block;\n}\n\n.fluid_video_wrapper .vast_video_loading {\n    display: table;\n    text-align: center;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    pointer-events: auto;\n    z-index: 1;\n}\n\n.fluid_video_wrapper .vast_video_loading:before {\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n    background-position: center, center;\n    background-repeat: no-repeat, repeat;\n    background-color: rgba(0, 0, 0, 0.2);\n    content: '';\n    position: absolute;\n    height: 100%;\n    width: 100%;\n    top: 0;\n    left: 0;\n}\n\n.skip_button {\n    position: absolute;\n    bottom: 50px;\n    right: 0;\n    background-color: rgba(0, 0, 0, 0.7);\n    padding: 13px 21px 13px 21px;\n}\n\n.skip_button, .skip_button a {\n    color: #ffffff;\n    text-decoration: none;\n    cursor: pointer;\n    z-index: 10;\n    font-size: 13px;\n    font-family: -apple-system, BlinkMacSystemFont, 'segoe ui', roboto, oxygen-sans, ubuntu, cantarell, 'helvetica neue', 'arial', sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';\n    font-weight: normal;\n    white-space: nowrap;\n    text-align: start;\n}\n\n.skip_button a span.skip_button_icon {\n    display: inline-block;\n    text-align: left;\n    width: 21px;\n    position: relative;\n    bottom: 20px;\n}\n\n.skip_button a span.skip_button_icon:before {\n    background: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") no-repeat;\n    position: absolute;\n    height: 18px;\n    width: 18px;\n    top: 6px;\n    content: \"\";\n    opacity: 0.8;\n    -webkit-transition: opacity 0.3s ease-in-out;\n    -moz-transition: opacity 0.3s ease-in-out;\n    -ms-transition: opacity 0.3s ease-in-out;\n    -o-transition: opacity 0.3s ease-in-out;\n    transition: opacity 0.3s ease-in-out;\n    background-position: -122px -57px;\n}\n\n.skip_button a span.skip_button_icon:before:hover {\n    opacity: 1;\n}\n\n.skip_button_disabled {\n    cursor: default !important;\n    padding: 13px 21px 13px 21px;\n}\n\n.close_button {\n    position: absolute;\n    background: #000000 url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") no-repeat scroll center center;\n    height: 16px;\n    width: 16px;\n    top: 0;\n    right: 0;\n    background-size: 18px 18px;\n    cursor: pointer;\n    padding: 1px;\n    z-index: 31;\n}\n\n.close_button:hover {\n    background-color: #000000;\n    border: 1px solid #ffffff;\n}\n\n.vast_clickthrough_layer {\n    /*IE Fix*/\n    background-color: white;\n    opacity: 0;\n}\n\n.fluid_ad_playing {\n    position: absolute;\n    background-color: black;\n    opacity: 0.8;\n    border-radius: 1px;\n    color: #ffffff;\n    font-size: 13px;\n    font-family: -apple-system, BlinkMacSystemFont, 'segoe ui', roboto, oxygen-sans, ubuntu, cantarell, 'helvetica neue', 'arial', sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';\n    font-weight: normal;\n    white-space: nowrap;\n    text-align: start;\n    line-height: 18px;\n    z-index: 10;\n    padding: 13px 21px 13px 21px;\n}\n\n.fluid_ad_cta {\n    position: absolute;\n    background-color: rgba(0, 0, 0, 0.7);\n    color: #ffffff;\n    font-size: 13px;\n    font-family: -apple-system, BlinkMacSystemFont, 'segoe ui', roboto, oxygen-sans, ubuntu, cantarell, 'helvetica neue', 'arial', sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';\n    font-weight: normal;\n    text-align: right;\n    cursor: pointer;\n    z-index: 10;\n    padding: 13px 21px 13px 13px;\n}\n\n.fluid_ad_cta a {\n    text-decoration: none;\n    color: #ffffff;\n    line-height: 18px;\n}\n\n.fluid_ad_cta:hover,\n.skip_button:not(.skip_button_disabled):hover {\n    background-color: rgba(0, 0, 0, 1);\n}\n\n.fluid_html_on_pause,\n.fluid_pseudo_poster {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    margin: auto;\n    z-index: 0;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    pointer-events: none;\n}\n\n.fluid_html_on_pause * {\n    pointer-events: auto;\n}\n\n/*Mobile Layout*/\n.fluid_video_wrapper.mobile .skip_button {\n    bottom: 75px;\n}\n\n/*\n.fluid_video_wrapper.mobile .fluid_ad_cta {\n        bottom: 125px;\n}\n*/\n.fluid_initial_play {\n    width: 60px;\n    height: 60px;\n    border-radius: 50px;\n    cursor: pointer;\n}\n\n.fluid_initial_play_button {\n    margin-top: 15px;\n    margin-left: 23px;\n    border-style: solid;\n    border-width: 15px 0 15px 21px;\n    border-color: transparent transparent transparent #ffffff;\n}\n\n.fluid_initial_pause_button {\n    margin-top: 15px;\n    margin-left: 17px;\n    width: 8px;\n    height: 31px;\n    border: 9px solid white;\n    border-top: 0;\n    border-bottom: 0;\n}\n\n.fluid_timeline_preview {\n    bottom: 11px;\n    color: #ffffff;\n    font-size: 13px;\n    line-height: 18px;\n    font-family: -apple-system, BlinkMacSystemFont, 'segoe ui', roboto, oxygen-sans, ubuntu, cantarell, 'helvetica neue', 'arial', sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';\n    font-weight: normal;\n    text-align: start;\n    padding: 13px 21px 13px 21px;\n    background-color: rgba(0, 0, 0, 0.85);\n    border-radius: 1px;\n}\n\n/* Duration */\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_fluid_control_duration {\n    display: inline-block;\n    position: absolute;\n    left: 32px;\n    height: 24px;\n    font-family: -apple-system, BlinkMacSystemFont, 'segoe ui', roboto, oxygen-sans, ubuntu, cantarell, 'helvetica neue', 'arial', sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';\n    font-size: 13px;\n    font-weight: normal;\n    font-style: normal;\n    text-align: left;\n    text-decoration: none;\n    line-height: 21px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_fluid_control_duration.cardboard_time {\n    left: 13px;\n    top: -15px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_fluid_control_duration.cardboard_time .ad_timer_prefix {\n    color: #F2C94C;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .ad_countdown .ad_timer_prefix {\n    color: #F2C94C;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .ad_countdown {\n    /*display: none;*/\n    position: absolute;\n    right: 0;\n    width: 75px;\n    bottom: 5px;\n    height: 24px;\n    color: red;\n    font-family: -apple-system, BlinkMacSystemFont, 'segoe ui', roboto, oxygen-sans, ubuntu, cantarell, 'helvetica neue', 'arial', sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';\n    font-size: 13px;\n    font-weight: normal;\n    font-style: normal;\n    text-align: left;\n    text-decoration: none;\n    line-height: 21px;\n}\n\n.initial_controls_show {\n    visibility: visible !important;\n    opacity: 1 !important;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_vr_container {\n    color: white;\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background: -moz-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%); /* FF3.6-15 */\n    background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%); /* Chrome10-25,Safari5.1-6 */\n    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#ad000000', GradientType=0); /* IE6-9 */\n    height: 100%;\n    width: 100%;\n    z-index: 0;\n    pointer-events: none;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_vr_container .fluid_vr_joystick_panel {\n    height: 96px;\n    width: 72px;\n    left: 10px;\n    top: 10px;\n    position: absolute;\n    background: rgba(0, 0, 0, 0.7);\n    text-align: center;\n    border-radius: 6px;\n    overflow: hidden;\n    pointer-events: auto;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_vr_container .fluid_vr_joystick_panel .fluid_vr_button {\n    cursor: pointer;\n    display: inline-block;\n    text-align: left;\n    height: 24px;\n    width: 24px;\n    position: relative;\n    background: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") no-repeat;\n    opacity: 0.8;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_vr_container .fluid_vr_joystick_panel .fluid_vr_button:hover {\n    opacity: 1;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_vr_container .fluid_vr_joystick_panel .fluid_vr_joystick_up {\n    background-position: -336px -55px;\n    -webkit-transform: rotate(270deg); /* Chrome, Opera 15+, Safari 3.1+ */\n    -ms-transform: rotate(270deg); /* IE 9 */\n    transform: rotate(270deg); /* Firefox 16+, IE 10+, Opera  */\n    display: block;\n    left: calc(50% - 12px);\n    top: 0;\n    position: absolute;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_vr_container .fluid_vr_joystick_panel .fluid_vr_joystick_left {\n    background-position: -336px -55px;\n    -webkit-transform: rotate(180deg); /* Chrome, Opera 15+, Safari 3.1+ */\n    -ms-transform: rotate(1890deg); /* IE 9 */\n    transform: rotate(180deg); /* Firefox 16+, IE 10+, Opera  */\n    display: block;\n    left: 0;\n    top: 24px;\n    position: absolute;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_vr_container .fluid_vr_joystick_panel .fluid_vr_joystick_right {\n    background-position: -336px -55px;\n    -webkit-transform: rotate(0deg); /* Chrome, Opera 15+, Safari 3.1+ */\n    -ms-transform: rotate(0deg); /* IE 9 */\n    transform: rotate(0deg); /* Firefox 16+, IE 10+, Opera  */\n    display: block;\n    right: 0;\n    top: 24px;\n    position: absolute;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_vr_container .fluid_vr_joystick_panel .fluid_vr_joystick_down {\n    background-position: -336px -55px;\n    -webkit-transform: rotate(90deg); /* Chrome, Opera 15+, Safari 3.1+ */\n    -ms-transform: rotate(90deg); /* IE 9 */\n    transform: rotate(90deg); /* Firefox 16+, IE 10+, Opera  */\n    display: block;\n    left: calc(50% - 12px);\n    top: 48px;\n    position: absolute;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_vr_container .fluid_vr_joystick_panel .fluid_vr_joystick_zoomdefault {\n    background-position: -336px -17px;\n    top: 72px;\n    -webkit-transform: rotate(0deg); /* Chrome, Opera 15+, Safari 3.1+ */\n    -ms-transform: rotate(0deg); /* IE 9 */\n    transform: rotate(0deg); /* Firefox 16+, IE 10+, Opera  */\n    position: absolute;\n    left: calc(50% - 12px);\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_vr_container .fluid_vr_joystick_panel .fluid_vr_joystick_zoomin {\n    background-position: -305px -55px;\n    top: 72px;\n    -webkit-transform: rotate(0deg); /* Chrome, Opera 15+, Safari 3.1+ */\n    -ms-transform: rotate(0deg); /* IE 9 */\n    transform: rotate(0deg); /* Firefox 16+, IE 10+, Opera  */\n    position: absolute;\n    right: 0;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_vr_container .fluid_vr_joystick_panel .fluid_vr_joystick_zoomout {\n    background-position: -305px -17px;\n    top: 72px;\n    -webkit-transform: rotate(0deg); /* Chrome, Opera 15+, Safari 3.1+ */\n    -ms-transform: rotate(0deg); /* IE 9 */\n    transform: rotate(0deg); /* Firefox 16+, IE 10+, Opera  */\n    position: absolute;\n    left: 0;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container.fluid_vr_controls_container {\n    width: 50% !important;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container.fluid_vr2_controls_container {\n    width: 50% !important;\n    left: 50%;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container {\n    color: white;\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background: -moz-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%); /* FF3.6-15 */\n    background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%); /* Chrome10-25,Safari5.1-6 */\n    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#ad000000', GradientType=0); /* IE6-9 */\n    height: 53px;\n    z-index: 1;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_vpaid_iframe {\n    position: absolute;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    left: 0;\n    z-index: -10;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_vpaid_nonlinear_slot_iframe {\n    z-index: 30;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_vpaid_slot {\n    position: absolute !important;\n    top: 0 !important;\n    width: 100% !important;\n    height: 100% !important;\n    left: 0 !important;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_subtitles_container {\n    color: white;\n    position: absolute;\n    bottom: 46px;\n    left: 0;\n    right: 0;\n    height: auto;\n    z-index: 1;\n    text-align: center;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_subtitles_container div {\n    display: inline;\n    background: black;\n    color: white;\n    font-size: 1em;\n    font-family: -apple-system, BlinkMacSystemFont, 'segoe ui', roboto, oxygen-sans, ubuntu, cantarell, 'helvetica neue', 'arial', sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';\n    padding: 0.25em;\n    border-radius: 4px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fade_out {\n    visibility: hidden;\n    opacity: 0;\n    -webkit-transition: visibility 0.5s, opacity 0.5s; /* Safari */\n    transition: visibility 0.5s, opacity 0.5s;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fade_in {\n    visibility: visible;\n    opacity: 1;\n    -webkit-transition: visibility 0.5s, opacity 0.5s; /* Safari */\n    transition: visibility 0.5s, opacity 0.5s;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default.pseudo_fullscreen {\n    width: 100% !important;\n    height: 100% !important;\n    top: 0;\n    left: 0;\n    position: fixed;\n    z-index: 99999;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default:-webkit-full-screen {\n    width: 100% !important;\n    height: 100% !important;\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default:-ms-fullscreen {\n    width: 100% !important;\n    height: 100% !important;\n    position: absolute;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_context_menu {\n    background-color: #000000;\n    color: #ffffff;\n    font-size: 13px;\n    font-family: -apple-system, BlinkMacSystemFont, 'segoe ui', roboto, oxygen-sans, ubuntu, cantarell, 'helvetica neue', 'arial', sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';\n    font-weight: normal;\n    white-space: nowrap;\n    text-align: start;\n    z-index: 11;\n    opacity: 0.8;\n    border-radius: 1px;\n}\n\n/* IE 10+ */\n_:-ms-lang(x),\n.fluid_video_wrapper.fluid_player_layout_default .fluid_context_menu {\n    text-align: left;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_context_menu ul {\n    list-style: none;\n    padding: 0;\n    margin: 0;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_context_menu ul li {\n    padding: 13px 71px 13px 21px;\n    cursor: pointer;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_context_menu ul li + li {\n    border-top: 1px solid #000000;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_context_menu ul li:hover {\n    background-color: #1e1e1e;\n    color: #fbfaff;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_left {\n    width: 24px;\n    left: 20px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container.skip_controls .fluid_controls_left {\n    width: 80px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button {\n    width: 24px;\n    height: 24px;\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right {\n    left: 60px;\n    right: 20px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container.skip_controls .fluid_controls_right {\n    left: 110px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_left,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right {\n    position: absolute;\n    height: 24px;\n    top: 23px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_progress_container {\n    height: 14px;\n    position: absolute;\n    left: 13px;\n    right: 13px;\n    z-index: 1;\n    top: 8px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_progress_container .fluid_controls_progress {\n    position: absolute;\n    top: 5px;\n    width: 100%;\n    height: 4px;\n    background-color: rgba(255, 255, 255, 0.25);\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_progress_container .fluid_controls_buffered {\n    position: absolute;\n    top: 5px;\n    width: 0;\n    height: 3px;\n    background-color: rgba(255, 255, 255, 0.5);\n    z-index: -1;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_progress_container .fluid_controls_progress,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_progress_container .fluid_controls_progress .fluid_controls_currentprogress {\n    position: absolute;\n    height: 3px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_progress_container:hover .fluid_controls_progress,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_progress_container:hover .fluid_controls_buffered,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_progress_container:hover .fluid_controls_ad_markers_holder {\n    margin-top: -1px;\n    height: 5px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_progress_container:hover .fluid_controls_progress .fluid_controls_currentprogress {\n    height: 5px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_progress_container .fluid_timeline_preview_container {\n    border: 1px solid #262626;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_progress_container .fluid_timeline_preview_container, .fluid_timeline_preview_container_shadow {\n    bottom: 14px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_progress_container.fluid_slider .fluid_controls_progress .fluid_controls_currentprogress .fluid_controls_currentpos {\n    background-color: white;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_progress_container.fluid_slider .fluid_controls_progress .fluid_controls_currentprogress .fluid_controls_currentpos,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_progress_container.fluid_ad_slider .fluid_controls_progress .fluid_controls_currentprogress .fluid_controls_currentpos {\n    opacity: 0;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_progress_container.fluid_slider:hover .fluid_controls_progress .fluid_controls_currentprogress .fluid_controls_currentpos {\n    opacity: 1;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_progress_container.fluid_slider .fluid_controls_progress .fluid_controls_currentprogress .fluid_controls_currentpos {\n    -webkit-transition: opacity 0.3s; /* Safari */\n    transition: opacity 0.3s;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_ad_markers_holder {\n    position: absolute;\n    top: 5px;\n    width: 100%;\n    height: 3px;\n    z-index: 2;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_ad_marker {\n    position: absolute;\n    background-color: #FFCC00;\n    height: 100%;\n    width: 6px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_control_volume_container {\n    height: 24px;\n    width: 56px;\n    left: 25px;\n    top: -1px;\n    z-index: 2;\n    opacity: 0.8;\n    -webkit-transition: opacity 0.3s ease-in-out;\n    -moz-transition: opacity 0.3s ease-in-out;\n    -ms-transition: opacity 0.3s ease-in-out;\n    -o-transition: opacity 0.3s ease-in-out;\n    transition: opacity 0.3s ease-in-out;\n    display: none;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_control_volume_container:hover {\n    opacity: 1;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_control_volume_container .fluid_control_volume {\n    position: relative;\n    height: 3px;\n    width: 100%;\n    margin-top: 10px;\n    background-color: rgba(171, 172, 172, 0.68);\n    z-index: 3;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_control_volume_container .fluid_control_volume .fluid_control_currentvolume {\n    float: left;\n    background-color: white;\n    height: 3px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_control_volume_container .fluid_control_volume .fluid_control_currentvolume .fluid_control_volume_currentpos {\n    background-color: white;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_progress_container .fluid_controls_progress .fluid_controls_currentpos {\n    right: -4px;\n    z-index: 3;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_control_volume_container .fluid_control_volume .fluid_control_currentvolume .fluid_control_volume_currentpos,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_progress_container .fluid_controls_progress .fluid_controls_currentpos {\n    width: 11px;\n    height: 11px;\n    position: absolute;\n    top: -4px;\n    border-radius: 6px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_progress_container .fluid_controls_progress .fluid_controls_currentpos {\n    width: 13px;\n    height: 13px;\n    position: absolute;\n    top: -4px;\n    border-radius: 6px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container.no_volume_bar .fluid_controls_right .fluid_control_volume_container {\n    display: none;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_slider {\n    cursor: pointer;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container div div {\n    display: block;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_button.fluid_button_fullscreen,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_button.fluid_button_fullscreen_exit {\n    float: right;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_button_video_source,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_button_subtitles,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_button_cardboard {\n    font-size: 13px;\n    height: 24px;\n    line-height: 24px;\n    float: right;\n    cursor: pointer;\n    position: relative;\n    text-align: right;\n    -webkit-touch-callout: none; /* iOS Safari */\n    -webkit-user-select: none; /* Safari */\n    -khtml-user-select: none; /* Konqueror HTML */\n    -moz-user-select: none; /* Firefox */\n    -ms-user-select: none; /* Internet Explorer/Edge */\n    user-select: none;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_button_video_source .fluid_video_sources_title,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_button_subtitles .fluid_subtitles_title {\n    width: 80px;\n    overflow: hidden;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_button_subtitles .fluid_subtitles_list,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_button_video_source .fluid_video_sources_list,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_video_playback_rates {\n    position: absolute;\n    bottom: 25px;\n    right: 3px;\n    z-index: 888888;\n    opacity: 99%;\n    background-color: rgba(0, 0, 0, 1);\n    border-radius: 2px;\n    color: #ffffff;\n    font-size: 13px;\n    font-family: -apple-system, BlinkMacSystemFont, 'segoe ui', roboto, oxygen-sans, ubuntu, cantarell, 'helvetica neue', 'arial', sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';\n    font-weight: normal;\n    white-space: nowrap;\n    text-align: start;\n    width: max-content;\n    padding: 0.5em;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_button_subtitles .fluid_subtitles_list .fluid_subtitle_list_item,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_button_video_source .fluid_video_sources_list .fluid_video_source_list_item {\n    padding: 12px 34px 12px 24px;\n    line-height: 15px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_button_video_source .fluid_video_sources_list .fluid_video_source_list_item:hover,\n.fluid_video_playback_rates_item:hover,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_button_subtitles .fluid_subtitles_list .fluid_subtitle_list_item:hover {\n    background-color: #3a3a3a;\n}\n\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_control_volume_container,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_button.fluid_button_volume,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_button.fluid_button_mute {\n    position: absolute;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_button.fluid_button_volume,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_button.fluid_button_mute {\n    left: -10px;\n}\n\n/* Button Icons */\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_play,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_pause,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_skip_back,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_skip_forward,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_volume,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_mute,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_video_source,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_fullscreen,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_fullscreen_exit,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_playback_rate,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_download,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_theatre,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_subtitles,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_cardboard {\n    display: inline-block;\n    text-align: left;\n    height: 24px;\n    width: 24px;\n    position: relative;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_play:before,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_pause:before,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_skip_back:before,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_skip_forward:before,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_volume:before,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_mute:before,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_video_source:before,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_fullscreen:before,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_fullscreen_exit:before,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_playback_rate:before,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_download:before,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_theatre:before,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_subtitles:before,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_cardboard:before {\n    background: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") no-repeat;\n    position: absolute;\n    height: 24px;\n    width: 24px;\n    top: 1px;\n    left: 5px;\n    content: \"\";\n    opacity: 0.8;\n    -webkit-transition: opacity 0.3s ease-in-out;\n    -moz-transition: opacity 0.3s ease-in-out;\n    -ms-transition: opacity 0.3s ease-in-out;\n    -o-transition: opacity 0.3s ease-in-out;\n    transition: opacity 0.3s ease-in-out;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_play:before {\n    background-position: -15px -19px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_pause:before {\n    background-position: -15px -57px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_volume:before {\n    background-position: -52px -19px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_mute:before {\n    background-position: -52px -57px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_fullscreen:before {\n    background-position: -88px -19px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_fullscreen_exit:before {\n    background-position: -88px -57px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_video_source:before {\n    background-position: -122px -19px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_playback_rate:before {\n    background-position: -232px -19px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_download:before {\n    background-position: -194px -18px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_theatre:before {\n    background-position: -195px -56px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_subtitles:before {\n    background-position: -269px -19px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_cardboard:before {\n    background-position: -269px -56px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_skip_back:before {\n    background: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") no-repeat;\n    background-position: -2px -2px;\n}\n\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_skip_forward:before {\n    background: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ") no-repeat;\n    background-position: -2px -2px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_skip_back {\n    margin-left: 5px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_video_source:hover:before,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_fullscreen_exit:hover:before,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_fullscreen:hover:before,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_mute:hover:before,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_volume:hover:before,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_pause:hover:before,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_play:hover:before,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_skip_back:hover:before,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_skip_forward:hover:before,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_playback_rate:hover:before,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_download:hover:before,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_theatre:hover:before,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_subtitles:hover:before,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_cardboard:hover:before {\n    opacity: 1;\n}\n\n.fp_title {\n    position: absolute;\n    top: 10px;\n    left: 10px;\n    color: #ffffff;\n    font-size: 15px;\n    font-family: -apple-system, BlinkMacSystemFont, 'segoe ui', roboto, oxygen-sans, ubuntu, cantarell, 'helvetica neue', 'arial', sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';\n    font-weight: normal;\n    white-space: nowrap;\n}\n\n/* Pulse class and keyframe animation */\n.transform-active {\n    animation: flash 1s infinite;\n    display: inline-block !important;\n    opacity: 0;\n}\n\n@-webkit-keyframes flash {\n    0% {\n        opacity: 0.6;\n        -webkit-box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.5);\n    }\n    70% {\n        -webkit-box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);\n    }\n    100% {\n        opacity: 0;\n        display: none;\n        -webkit-box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);\n    }\n}\n\n@keyframes flash {\n    0% {\n        opacity: 0.6;\n        -moz-box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.5);\n        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.6);\n    }\n    70% {\n        -moz-box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);\n        box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);\n    }\n    100% {\n        opacity: 0;\n        display: none;\n        -moz-box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);\n        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);\n    }\n}\n\n.fluid_nonLinear_top, .fluid_nonLinear_middle, .fluid_nonLinear_bottom {\n    flex-direction: column;\n    align-items: center;\n    cursor: pointer;\n    display: flex;\n    vertical-align: middle;\n    align-content: center;\n    border: 1px solid #777777;\n    position: absolute;\n    left: 50%;\n    margin-right: -50%;\n    background-color: rgba(0, 0, 0, 0.7);\n}\n\n.fluid_nonLinear_top {\n    top: 20px;\n    transform: translate(-50%);\n}\n\n.fluid_nonLinear_middle {\n    top: 50%;\n    transform: translate(-50%, -50%);\n}\n\n.fluid_nonLinear_bottom {\n    bottom: 50px;\n    transform: translate(-50%);\n}\n\n.fluid_vpaidNonLinear_top, .fluid_vpaidNonLinear_middle, .fluid_vpaidNonLinear_bottom {\n    flex-direction: column;\n    align-items: center;\n    cursor: pointer;\n    vertical-align: middle;\n    align-content: center;\n    position: absolute;\n    display: flex;\n}\n\n.fluid_vpaidNonLinear_frame {\n    margin: auto;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n}\n\n.fluid_vpaidNonLinear_top {\n    top: 20px;\n}\n\n.fluid_vpaidNonLinear_middle {\n    top: 50%;\n}\n\n.fluid_vpaidNonLinear_bottom {\n    bottom: 50px;\n}\n\n.add_icon_clickthrough {\n    color: #F2C94C;\n    line-height: 18px;\n}\n\n.add_icon_clickthrough:before {\n    background: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") no-repeat;\n    height: 18px;\n    width: 18px;\n    top: 30px;\n    padding: 1px 22px 0 0;\n    content: \"\";\n    background-position: -162px -57px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_theatre,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_playback_rate,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_video_source,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_download,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_subtitles,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_cardboard {\n    float: right;\n    padding-right: 5px;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_theatre,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_playback_rate,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_video_source,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_download,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_subtitles,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_button.fluid_button_cardboard {\n    display: none;\n}\n\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_button_subtitles .fluid_subtitles_list,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_button_video_source .fluid_video_sources_list,\n.fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_video_playback_rates {\n    z-index: 888888 !important;\n    opacity: 0.9 !important;\n}\n\n.fluid_video_playback_rates_item {\n    padding: 9px 25px 9px 25px;\n    line-height: 15px;\n    text-align: center;\n}\n\n.fluid_theatre_mode {\n    position: fixed;\n    float: left;\n    top: 0;\n    z-index: 10;\n    box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.8);\n}\n\n.source_button_icon {\n    background: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") no-repeat;\n    float: left;\n    cursor: pointer;\n    height: 18px;\n    width: 18px;\n    background-position: -164px -21px;\n    opacity: 0;\n}\n\n.subtitle_button_icon {\n    background: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") no-repeat;\n    float: left;\n    cursor: pointer;\n    height: 18px;\n    width: 18px;\n    background-position: -164px -21px;\n    opacity: 0;\n}\n\n.source_selected {\n    opacity: 1 !important;\n}\n\n.subtitle_selected {\n    opacity: 1 !important;\n}\n\n@media only screen and (min-device-width: 375px) {\n    .fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_fluid_control_duration {\n        left: 105px;\n    }\n\n    .fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container.no_volume_bar .fluid_fluid_control_duration {\n        left: 32px;\n    }\n\n    .fluid_video_wrapper.fluid_player_layout_default .fluid_controls_container .fluid_controls_right .fluid_control_volume_container {\n        display: block;\n    }\n}\n\n.fp_logo {\n    visibility: hidden;\n    opacity: 0;\n    -webkit-transition: visibility 0.3s ease-in-out, opacity 0.3s ease-in-out;\n    -moz-transition: visibility 0.3s ease-in-out, opacity 0.3s ease-in-out;\n    -ms-transition: visibility 0.3s ease-in-out, opacity 0.3s ease-in-out;\n    -o-transition: visibility 0.3s ease-in-out, opacity 0.3s ease-in-out;\n    transition: visibility 0.3s ease-in-out, opacity 0.3s ease-in-out;\n}\n\n.fp_hd_source::before {\n    font-weight: bolder;\n    font-size: 6pt;\n    content: 'HD';\n    padding-left: 3px;\n}\n", ""]);
// Exports
            module.exports = exports;


            /***/ }),
        /* 6 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";


            /*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
            module.exports = function (useSourceMap) {
                var list = []; // return the list of modules as css string

                list.toString = function toString() {
                    return this.map(function (item) {
                        var content = cssWithMappingToString(item, useSourceMap);

                        if (item[2]) {
                            return "@media ".concat(item[2], " {").concat(content, "}");
                        }

                        return content;
                    }).join('');
                }; // import a list of modules into the list
                // eslint-disable-next-line func-names


                list.i = function (modules, mediaQuery, dedupe) {
                    if (typeof modules === 'string') {
                        // eslint-disable-next-line no-param-reassign
                        modules = [[null, modules, '']];
                    }

                    var alreadyImportedModules = {};

                    if (dedupe) {
                        for (var i = 0; i < this.length; i++) {
                            // eslint-disable-next-line prefer-destructuring
                            var id = this[i][0];

                            if (id != null) {
                                alreadyImportedModules[id] = true;
                            }
                        }
                    }

                    for (var _i = 0; _i < modules.length; _i++) {
                        var item = [].concat(modules[_i]);

                        if (dedupe && alreadyImportedModules[item[0]]) {
                            // eslint-disable-next-line no-continue
                            continue;
                        }

                        if (mediaQuery) {
                            if (!item[2]) {
                                item[2] = mediaQuery;
                            } else {
                                item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
                            }
                        }

                        list.push(item);
                    }
                };

                return list;
            };

            function cssWithMappingToString(item, useSourceMap) {
                var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

                var cssMapping = item[3];

                if (!cssMapping) {
                    return content;
                }

                if (useSourceMap && typeof btoa === 'function') {
                    var sourceMapping = toComment(cssMapping);
                    var sourceURLs = cssMapping.sources.map(function (source) {
                        return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
                    });
                    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
                }

                return [content].join('\n');
            } // Adapted from convert-source-map (MIT)


            function toComment(sourceMap) {
                // eslint-disable-next-line no-undef
                var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
                var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
                return "/*# ".concat(data, " */");
            }

            /***/ }),
        /* 7 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";


            module.exports = function (url, options) {
                if (!options) {
                    // eslint-disable-next-line no-param-reassign
                    options = {};
                } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


                url = url && url.__esModule ? url.default : url;

                if (typeof url !== 'string') {
                    return url;
                } // If url is already wrapped in quotes, remove them


                if (/^['"].*['"]$/.test(url)) {
                    // eslint-disable-next-line no-param-reassign
                    url = url.slice(1, -1);
                }

                if (options.hash) {
                    // eslint-disable-next-line no-param-reassign
                    url += options.hash;
                } // Should url be wrapped?
                // See https://drafts.csswg.org/css-values-3/#urls


                if (/["'() \t\n]/.test(url) || options.needQuotes) {
                    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, '\\n'), "\"");
                }

                return url;
            };

            /***/ }),
        /* 8 */
        /***/ (function(module, exports) {

            module.exports = "data:image/svg+xml,%3Csvg class='lds-eclipse' width='200' height='200' style='background:0 0' preserveAspectRatio='xMidYMid' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M68.095 59.578A20 20 0 0031.14 44.27a22 20-67.5 0136.955 15.308' fill='%23fff'%3E %3CanimateTransform attributeName='transform' begin='0s' calcMode='linear' dur='0.8s' keyTimes='0;1' repeatCount='indefinite' type='rotate' values='0 50 51;360 50 51'/%3E %3C/path%3E %3C/svg%3E"

            /***/ }),
        /* 9 */
        /***/ (function(module, exports) {

            module.exports = "data:image/svg+xml,%3Csvg xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg' width='388.75' height='96' version='1.1' viewBox='0 0 388.75 96' id='svg63'%3E %3Cpath id='path4087' d='m 347.64062,35.959 a 6.9826789,6.9826789 0 0 0 6.98438,-6.984375 6.9826789,6.9826789 0 0 0 -6.98438,-6.982422 6.9826789,6.9826789 0 0 0 -6.98242,6.982422 6.9826789,6.9826789 0 0 0 6.98242,6.984375 z m 0,-2.476562 a 4.5078053,4.5078053 0 0 1 -4.50781,-4.507813 4.5078053,4.5078053 0 0 1 4.50781,-4.507812 4.5078053,4.5078053 0 0 1 4.50781,4.507812 4.5078053,4.5078053 0 0 1 -4.50781,4.507813 z' style='fill:%23ffffff;fill-opacity:1;stroke-width:1.70873225' /%3E %3Cpath style='fill:%23ffffff;fill-opacity:1;stroke-width:1.00886583' d='M 273.55469,22 C 272.69375,22 272,22.693749 272,23.554688 V 34.445312 C 272,35.306251 272.69375,36 273.55469,36 h 10.89062 C 285.30625,36 286,35.306251 286,34.445312 V 23.554688 C 286,22.693749 285.30625,22 284.44531,22 Z m 3.61133,4.541016 c 0.22916,0 0.45442,0.02083 0.67578,0.0625 0.22396,0.03906 0.44661,0.09896 0.66797,0.179687 v 1.140625 c -0.19011,-0.130208 -0.38151,-0.226562 -0.57422,-0.289062 -0.19011,-0.0625 -0.38802,-0.09375 -0.59375,-0.09375 -0.39063,0 -0.69532,0.114583 -0.91407,0.34375 -0.21614,0.226562 -0.32421,0.54427 -0.32421,0.953125 0,0.408854 0.10807,0.727864 0.32421,0.957031 0.21875,0.226562 0.52344,0.339844 0.91407,0.339844 0.21875,0 0.42578,-0.03255 0.62109,-0.09766 0.19792,-0.0651 0.38021,-0.161458 0.54688,-0.289062 v 1.144531 c -0.21875,0.08073 -0.44141,0.140625 -0.66797,0.179688 -0.22396,0.04167 -0.44922,0.0625 -0.67578,0.0625 -0.78907,0 -1.40625,-0.201823 -1.85157,-0.605469 -0.44531,-0.40625 -0.66797,-0.970052 -0.66797,-1.691406 0,-0.721355 0.22266,-1.283855 0.66797,-1.6875 0.44532,-0.40625 1.0625,-0.609375 1.85157,-0.609375 z m 4.75,0 c 0.22916,0 0.45442,0.02083 0.67578,0.0625 0.22396,0.03906 0.44661,0.09896 0.66797,0.179687 v 1.140625 c -0.19011,-0.130208 -0.38151,-0.226562 -0.57422,-0.289062 -0.19011,-0.0625 -0.38802,-0.09375 -0.59375,-0.09375 -0.39063,0 -0.69532,0.114583 -0.91407,0.34375 -0.21614,0.226562 -0.32421,0.54427 -0.32421,0.953125 0,0.408854 0.10807,0.727864 0.32421,0.957031 0.21875,0.226562 0.52344,0.339844 0.91407,0.339844 0.21875,0 0.42578,-0.03255 0.62109,-0.09766 0.19792,-0.0651 0.38021,-0.161458 0.54688,-0.289062 v 1.144531 c -0.21875,0.08073 -0.44141,0.140625 -0.66797,0.179688 -0.22396,0.04167 -0.44922,0.0625 -0.67578,0.0625 -0.78907,0 -1.40625,-0.201823 -1.85157,-0.605469 -0.44531,-0.40625 -0.66797,-0.970052 -0.66797,-1.691406 0,-0.721355 0.22266,-1.283855 0.66797,-1.6875 0.44532,-0.40625 1.0625,-0.609375 1.85157,-0.609375 z' id='rect7816' /%3E %3Cg transform='translate(-3702,106)' id='g44'%3E %3CclipPath id='q' style='clip-rule:evenodd'%3E %3Cpath d='m 3702,-106 h 272 v 96 h -272 z' id='path6' style='fill:%23ffffff'/%3E %3C/clipPath%3E %3Cg clip-path='url(%23q)' id='g42'%3E %3Cuse transform='translate(3757,-86)' xlink:href='%23o' id='use9' style='fill:%23ffffff' x='0' y='0' width='100%25' height='100%25'/%3E %3Cuse transform='translate(3757,-48)' xlink:href='%23i' id='use11' style='fill:%23ffffff' x='0' y='0' width='100%25' height='100%25'/%3E %3Cuse transform='translate(3830,-84)' xlink:href='%23h' id='use13' style='fill:%23ffffff' x='0' y='0' width='100%25' height='100%25'/%3E %3Cuse transform='translate(3723,-86)' xlink:href='%23g' id='use15' style='fill:%23ffffff' x='0' y='0' width='100%25' height='100%25'/%3E %3Cuse transform='translate(3723,-48)' xlink:href='%23f' id='use17' style='fill:%23ffffff' x='0' y='0' width='100%25' height='100%25'/%3E %3Cuse transform='translate(3795,-46)' xlink:href='%23e' id='use19' style='fill:%23ffffff' x='0' y='0' width='100%25' height='100%25'/%3E %3Cuse transform='translate(3831,-46)' xlink:href='%23d' id='use21' style='fill:%23ffffff' x='0' y='0' width='100%25' height='100%25'/%3E %3Cuse transform='translate(3865,-44)' xlink:href='%23c' id='use23' style='fill:%23f2c94c' x='0' y='0' width='100%25' height='100%25'/%3E %3Cuse transform='translate(3795,-84)' xlink:href='%23b' id='use25' style='fill:%23ffffff' x='0' y='0' width='100%25' height='100%25'/%3E %3Cuse transform='translate(3866,-83)' xlink:href='%23a' id='use27' style='fill:%23ffffff' x='0' y='0' width='100%25' height='100%25'/%3E %3Cuse transform='translate(3939,-47)' xlink:href='%23n' id='use29' style='fill:%23ffffff' x='0' y='0' width='100%25' height='100%25'/%3E %3Cmask id='p'%3E %3Cuse transform='translate(3902,-46)' xlink:href='%23m' id='use31' style='fill:%23ffffff' x='0' y='0' width='100%25' height='100%25'/%3E %3C/mask%3E %3Cg mask='url(%23p)' id='g36'%3E %3Cuse transform='translate(3902,-46)' xlink:href='%23l' id='use34' style='fill:%23ffffff' x='0' y='0' width='100%25' height='100%25'/%3E %3C/g%3E %3Cuse transform='translate(3904,-85)' xlink:href='%23k' id='use38' style='fill:%23ffffff' x='0' y='0' width='100%25' height='100%25'/%3E %3Cuse transform='translate(3939,-85)' xlink:href='%23j' id='use40' style='fill:%23ffffff' x='0' y='0' width='100%25' height='100%25'/%3E %3C/g%3E %3C/g%3E %3Cdefs id='defs61'%3E %3Cpath id='o' d='m 0,5.5924 v 5.8152 H 3.7778 L 8.5,16.2537 V 0.7467 L 3.7778,5.5928 H 0 Z M 12.75,8.5 c 0,-1.7155 -0.9633,-3.1887 -2.3611,-3.9059 v 7.8021 C 11.7867,11.6887 12.75,10.2155 12.75,8.5 Z M 10.3889,0 v 1.9966 c 2.7294,0.83352 4.7222,3.431 4.7222,6.5034 0,3.0724 -1.9928,5.6699 -4.7222,6.5034 V 17 C 14.1761,16.118 17,12.6482 17,8.5 17,4.3518 14.1761,0.882 10.3889,0 Z' /%3E %3Cpath id='i' d='m 12.75,8.5 c 0,-1.6717 -0.9633,-3.1072 -2.3611,-3.8061 V 6.7811 L 12.7028,9.095 C 12.7311,8.90611 12.75,8.70778 12.75,8.5 Z m 2.3611,0 c 0,0.88778 -0.1889,1.7189 -0.51,2.4933 l 1.4261,1.4261 C 16.6506,11.2483 17,9.9167 17,8.5 17,4.4578 14.1761,1.0767 10.3889,0.2172 V 2.1628 C 13.1183,2.97502 15.1111,5.5061 15.1111,8.5 Z M 1.1991,0 -3e-4,1.1994 4.4669,5.6666 H -3e-4 v 5.6666 h 3.7778 l 4.7222,4.7223 V 9.6993 l 4.0139,4.0139 c -0.6328,0.4911 -1.3411,0.8784 -2.125,1.1145 v 1.9455 c 1.3033,-0.2927 2.4839,-0.8972 3.485,-1.7094 l 1.9267,1.9361 1.1994,-1.1994 -8.5,-8.5 L 1.1991,-1e-4 Z m 7.3006,0.94444 -1.9739,1.9739 1.9739,1.9739 z' /%3E %3Cpath id='h' d='M 12.444,0 H 1.555 C 0.69166,0 -6e-4,0.7 -6e-4,1.5556 v 10.889 c 0,0.8556 0.69222,1.5556 1.5556,1.5556 h 10.889 c 0.8556,0 1.5556,-0.7 1.5556,-1.5556 V 1.5556 C 13.9996,0.70004 13.2996,0 12.444,0 Z M 6.2218,9.3333 H 5.0551 V 7.7777 H 3.4995 V 9.3333 H 2.3328 V 4.6666 H 3.4995 V 6.611 H 5.0551 V 4.6666 H 6.2218 Z M 7.7774,4.6666 h 3.1111 c 0.4278,0 0.7778,0.35 0.7778,0.77777 v 3.1111 c 0,0.42777 -0.35,0.77777 -0.7778,0.77777 H 7.7774 v -4.6667 z m 1.1667,3.5 h 1.5556 V 5.8333 H 8.9441 Z' /%3E %3Cpath id='g' d='M 0,0 V 17 L 13,8.5 Z' /%3E %3Cpath id='f' d='M 0,17 H 4.3333 V 0 H 0 Z M 8.6667,0 V 17 H 13 V 0 Z' /%3E %3Cpath id='e' d='m 0,11 h 3 v 3 H 5 V 9 H 0 Z M 3,3 H 0 V 5 H 5 V 0 H 3 Z m 6,11 h 2 v -3 h 3 V 9 H 9 Z M 11,3 V 0 H 9 v 5 h 5 V 3 Z' /%3E %3Cpath id='d' d='M 0,12 8.5,6 0,0 Z M 10,0 v 12 h 2 V 0 Z' /%3E %3Cpath id='c' d='M 1.52,4.5 C 1.52,2.961 2.632,1.71 4,1.71 H 7.2 V 0 H 4 C 1.792,0 0,2.016 0,4.5 0,6.984 1.792,9 4,9 H 7.2 V 7.29 H 4 C 2.632,7.29 1.52,6.039 1.52,4.5 Z M 4.8,5.4 h 6.4 V 3.6 H 4.8 Z M 12,0 H 8.8 V 1.71 H 12 c 1.368,0 2.48,1.251 2.48,2.79 0,1.539 -1.112,2.79 -2.48,2.79 H 8.8 V 9 H 12 C 14.208,9 16,6.984 16,4.5 16,2.016 14.208,0 12,0 Z' /%3E %3Cpath id='b' d='M 2,9 H 0 v 5 H 5 V 12 H 2 Z M 0,5 H 2 V 2 H 5 V 0 H 0 Z m 12,7 H 9 v 2 h 5 V 9 H 12 Z M 9,0 v 2 h 3 v 3 h 2 V 0 Z' /%3E %3Cpath id='a' d='M 4.4546,8.7015 1.1137,5.2537 1e-4,6.403 4.4546,11 14,1.1492 12.8864,-1e-4 4.4546,8.7014 Z' /%3E %3Cpath id='n' d='M 12.348,7.686 C 12.3768,7.462 12.3984,7.238 12.3984,7 12.3984,6.762 12.3768,6.538 12.348,6.314 L 13.8664,5.159 C 14.0032,5.054 14.0391,4.865 13.9528,4.711 L 12.5135,2.289 C 12.4272,2.135 12.2329,2.079 12.0745,2.135 l -1.7919,0.7 C 9.90842,2.555 9.50543,2.324 9.0664,2.149 L 8.79294,0.294 C 8.77135,0.126 8.62022,0 8.44031,0 H 5.56171 C 5.38181,0 5.23068,0.126 5.20909,0.294 L 4.93563,2.149 C 4.49665,2.324 4.09365,2.562 3.71943,2.835 l -1.7919,-0.7 C 1.76201,2.072 1.5749,2.135 1.48855,2.289 l -1.4393,2.422 c -0.093553,0.154 -0.050374,0.343 0.086356,0.448 l 1.5184,1.155 C 1.625226,6.538 1.603636,6.769 1.603636,7 c 0,0.231 0.02159,0.462 0.05037,0.686 l -1.5184,1.155 c -0.13673,0.105 -0.17271,0.294 -0.086356,0.448 l 1.4393,2.422 c 0.08635,0.154 0.28066,0.21 0.43898,0.154 l 1.7919,-0.7 c 0.37421,0.28 0.77721,0.511 1.2162,0.686 l 0.27346,1.855 C 5.23068,13.874 5.38181,14 5.56171,14 h 2.8786 c 0.17991,0 0.33104,-0.126 0.35263,-0.294 L 9.0664,11.851 c 0.43898,-0.175 0.84197,-0.413 1.2162,-0.686 l 1.7919,0.7 c 0.1655,0.063 0.3527,0 0.439,-0.154 L 13.9528,9.289 C 14.0391,9.135 14.0032,8.946 13.8664,8.841 Z M 7.0011,9.45 C 5.6122,9.45 4.4824,8.351 4.4824,7 4.4824,5.649 5.6122,4.55 7.0011,4.55 8.39,4.55 9.5198,5.649 9.5198,7 9.5198,8.351 8.39,9.45 7.0011,9.45 Z' /%3E %3Cpath id='m' d='M 0,0 H 16 V 12 H 0 Z' /%3E %3Cpath id='l' d='m 0,0 v -2 h -2 v 2 z m 16,0 h 2 v -2 h -2 z m 0,12 v 2 h 2 V 12 Z M 0,12 h -2 v 2 H 0 Z M 0,2 H 16 V -2 H 0 Z M 14,0 v 12 h 4 V 0 Z m 2,10 H 0 v 4 H 16 Z M 2,12 V 0 h -4 v 12 z' /%3E %3Cpath id='k' d='M 12,5.2941 H 8.5714 V 0 H 3.4285 V 5.2941 H -1e-4 l 6,6.1765 6,-6.1765 z M 0,13.2353 V 15 h 12 v -1.7647 z' /%3E %3Cpath id='j' d='M 9.3333,0 H 4.6666 V 1.5238 H 9.3333 Z M 6.2222,9.9048 H 7.7778 V 5.3334 H 6.2222 Z M 12.4678,4.8686 13.5722,3.7867 C 13.2378,3.39813 12.8722,3.03241 12.4756,2.7124 L 11.3711,3.7943 C 10.1656,2.84953 8.6489,2.2857 7,2.2857 3.1344,2.2857 0,5.3562 0,9.1429 0,12.9295 3.1267,16 7,16 10.8733,16 14,12.9295 14,9.1429 14,7.5277 13.4244,6.0419 12.4678,4.8686 Z M 7,14.4762 C 3.99,14.4762 1.5556,12.0914 1.5556,9.1429 1.5556,6.1943 3.99,3.8096 7,3.8096 c 3.01,0 5.4444,2.3848 5.4444,5.3333 0,2.9485 -2.4344,5.3333 -5.4444,5.3333 z' /%3E %3C/defs%3E %3Cg id='g3989' transform='matrix(0.03107656,0,0,0.03432918,271.52581,57.128037)' style='fill:%23ffffff'%3E %3Cg id='g3979' style='fill:%23ffffff'%3E %3Cpath style='fill:%23ffffff;stroke-width:0.03266241' d='m 273.49023,60.4375 c -1.07158,0 -1.96484,0.958273 -1.96484,2.169922 v 6.61914 c 0,1.216352 0.89727,2.167935 1.96484,2.167969 h 2.87305 c 0.52417,0 1.01765,-0.2246 1.39063,-0.634765 l 1,-1.103516 c 0.19059,-0.211639 0.45448,-0.333984 0.72656,-0.333984 0.27207,0 0.53829,0.122547 0.73047,0.335937 l 0.99804,1.101563 c 0.37212,0.409203 0.86646,0.634765 1.39063,0.634765 h 2.87305 c 1.07158,0 1.96484,-0.95632 1.96484,-2.167969 v -6.61914 c 0,-1.216352 -0.89727,-2.169922 -1.96484,-2.169922 z m 2.4961,3.308594 c 1.08295,0 1.96484,0.973618 1.96484,2.169922 0,1.196303 -0.88185,2.169921 -1.96484,2.169922 -1.08299,0 -1.96485,-0.973619 -1.96485,-2.169922 0,-1.196304 0.88189,-2.169922 1.96485,-2.169922 z m 6.99023,0 c 1.08296,0 1.96485,0.973618 1.96485,2.169922 0,1.196303 -0.88189,2.169922 -1.96485,2.169922 -1.08298,0 -1.96484,-0.973619 -1.96484,-2.169922 0,-1.196304 0.88189,-2.169922 1.96484,-2.169922 z' transform='matrix(32.178594,0,0,29.129737,-8737.3187,-1664.1247)' id='path3977' /%3E %3C/g%3E %3Cg id='g3983' style='fill:%23ffffff'/%3E %3Cg id='g3987' style='fill:%23ffffff'/%3E %3C/g%3E %3Cpath style='fill:%23ffffff;fill-opacity:1' d='M 317.03125 21.992188 A 6.9826789 6.9826789 0 0 0 310.04883 28.976562 A 6.9826789 6.9826789 0 0 0 317.03125 35.958984 A 6.9826789 6.9826789 0 0 0 324.01367 28.976562 A 6.9826789 6.9826789 0 0 0 317.03125 21.992188 z M 312.20703 27.580078 L 321.94336 27.642578 C 322.32865 27.645013 322.63647 27.956519 322.63281 28.341797 L 322.62109 29.603516 C 322.61743 29.988794 322.30326 30.297356 321.91797 30.294922 L 312.18164 30.232422 C 311.79635 30.229987 311.48853 29.918481 311.49219 29.533203 L 311.50391 28.271484 C 311.50757 27.886206 311.82174 27.577644 312.20703 27.580078 z ' id='path3997'/%3E %3Cpath style='fill:%23ffffff;fill-opacity:1' d='M 317.03125 59.992188 A 6.9826789 6.9826789 0 0 0 310.04883 66.976562 A 6.9826789 6.9826789 0 0 0 317.03125 73.958984 A 6.9826789 6.9826789 0 0 0 324.01367 66.976562 A 6.9826789 6.9826789 0 0 0 317.03125 59.992188 z M 316.49805 61.365234 L 317.76172 61.382812 C 318.14697 61.388692 318.45192 61.704576 318.44727 62.089844 L 318.4043 65.619141 L 321.94336 65.642578 C 322.32865 65.645013 322.63647 65.956519 322.63281 66.341797 L 322.62109 67.603516 C 322.61743 67.988794 322.30326 68.297356 321.91797 68.294922 L 318.37305 68.271484 L 318.33008 71.826172 C 318.32543 72.21144 318.0122 72.515645 317.62695 72.509766 L 316.36328 72.492188 C 315.97803 72.486309 315.67308 72.170424 315.67773 71.785156 L 315.7207 68.255859 L 312.18164 68.232422 C 311.79635 68.229987 311.48853 67.918481 311.49219 67.533203 L 311.50391 66.271484 C 311.50757 65.886206 311.82174 65.577644 312.20703 65.580078 L 315.75195 65.603516 L 315.79492 62.048828 C 315.79957 61.66356 316.1128 61.359355 316.49805 61.365234 z ' id='path3997-6'/%3E %3Cellipse style='fill:%23800000;fill-opacity:1;stroke-width:1.10310566' id='circle4073' cx='353.64172' cy='-28.97954' transform='scale(1,-1)' /%3E %3Cg id='g7787' transform='matrix(-0.02885349,0,0,-0.02885337,352.04486,75.172258)' style='fill:%23ffffff;fill-opacity:1'%3E %3Cg id='g7731' transform='translate(-90.566882,42.049084)' style='fill:%23ffffff;fill-opacity:1'%3E %3Cpath id='path7729' d='M 242.607,0 C 108.629,0 0.001,108.628 0.001,242.606 c 0,133.976 108.628,242.606 242.606,242.606 133.978,0 242.604,-108.631 242.604,-242.606 C 485.212,108.628 376.585,0 242.607,0 Z M 401.815,288.094 H 219.862 v 90.979 L 83.397,242.606 219.862,106.141 v 90.978 h 181.953 z' style='fill:%23ffffff;fill-opacity:1'/%3E %3C/g%3E %3Cg id='g7733' style='fill:%23ffffff;fill-opacity:1'%3E %3C/g%3E %3Cg id='g7735' style='fill:%23ffffff;fill-opacity:1'%3E %3C/g%3E %3Cg id='g7737' style='fill:%23ffffff;fill-opacity:1'%3E %3C/g%3E %3Cg id='g7739' style='fill:%23ffffff;fill-opacity:1'%3E %3C/g%3E %3Cg id='g7741' style='fill:%23ffffff;fill-opacity:1'%3E %3C/g%3E %3Cg id='g7743' style='fill:%23ffffff;fill-opacity:1'%3E %3C/g%3E %3Cg id='g7745' style='fill:%23ffffff;fill-opacity:1'%3E %3C/g%3E %3Cg id='g7747' style='fill:%23ffffff;fill-opacity:1'%3E %3C/g%3E %3Cg id='g7749' style='fill:%23ffffff;fill-opacity:1'%3E %3C/g%3E %3Cg id='g7751' style='fill:%23ffffff;fill-opacity:1'%3E %3C/g%3E %3Cg id='g7753' style='fill:%23ffffff;fill-opacity:1'%3E %3C/g%3E %3Cg id='g7755' style='fill:%23ffffff;fill-opacity:1'%3E %3C/g%3E %3Cg id='g7757' style='fill:%23ffffff;fill-opacity:1'%3E %3C/g%3E %3Cg id='g7759' style='fill:%23ffffff;fill-opacity:1'%3E %3C/g%3E %3Cg id='g7761' style='fill:%23ffffff;fill-opacity:1'%3E %3C/g%3E %3C/g%3E %3C/svg%3E"

            /***/ }),
        /* 10 */
        /***/ (function(module, exports) {

            module.exports = "data:image/svg+xml,%3Csvg fill='%23FFF' height='24' width='24' xmlns='http://www.w3.org/2000/svg'%3E %3Cpath d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/%3E %3Cpath d='M0 0h24v24H0z' fill='none'/%3E %3C/svg%3E"

            /***/ }),
        /* 11 */
        /***/ (function(module, exports) {

            module.exports = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' width='24px' height='24px'%3E %3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E %3Cpath d='M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8zm-1.1 11h-.85v-3.26l-1.01.31v-.69l1.77-.63h.09V16zm4.28-1.76c0 .32-.03.6-.1.82s-.17.42-.29.57-.28.26-.45.33-.37.1-.59.1-.41-.03-.59-.1-.33-.18-.46-.33-.23-.34-.3-.57-.11-.5-.11-.82v-.74c0-.32.03-.6.1-.82s.17-.42.29-.57.28-.26.45-.33.37-.1.59-.1.41.03.59.1.33.18.46.33.23.34.3.57.11.5.11.82v.74zm-.85-.86c0-.19-.01-.35-.04-.48s-.07-.23-.12-.31-.11-.14-.19-.17-.16-.05-.25-.05-.18.02-.25.05-.14.09-.19.17-.09.18-.12.31-.04.29-.04.48v.97c0 .19.01.35.04.48s.07.24.12.32.11.14.19.17.16.05.25.05.18-.02.25-.05.14-.09.19-.17.09-.19.11-.32.04-.29.04-.48v-.97z'/%3E %3C/svg%3E"

            /***/ }),
        /* 12 */
        /***/ (function(module, exports) {

            module.exports = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' viewBox='0 0 24 24' fill='white' width='24px' height='24px'%3E %3Cg%3E %3Crect fill='none' height='24' width='24'/%3E %3Crect fill='none' height='24' width='24'/%3E %3Crect fill='none' height='24' width='24'/%3E %3C/g%3E %3Cg%3E %3Cg/%3E %3Cg%3E %3Cpath d='M18,13c0,3.31-2.69,6-6,6s-6-2.69-6-6s2.69-6,6-6v4l5-5l-5-5v4c-4.42,0-8,3.58-8,8c0,4.42,3.58,8,8,8s8-3.58,8-8H18z'/%3E %3Cpolygon points='10.9,16 10.9,11.73 10.81,11.73 9.04,12.36 9.04,13.05 10.05,12.74 10.05,16'/%3E %3Cpath d='M14.32,11.78c-0.18-0.07-0.37-0.1-0.59-0.1s-0.41,0.03-0.59,0.1s-0.33,0.18-0.45,0.33s-0.23,0.34-0.29,0.57 s-0.1,0.5-0.1,0.82v0.74c0,0.32,0.04,0.6,0.11,0.82s0.17,0.42,0.3,0.57s0.28,0.26,0.46,0.33s0.37,0.1,0.59,0.1s0.41-0.03,0.59-0.1 s0.33-0.18,0.45-0.33s0.22-0.34,0.29-0.57s0.1-0.5,0.1-0.82V13.5c0-0.32-0.04-0.6-0.11-0.82s-0.17-0.42-0.3-0.57 S14.49,11.85,14.32,11.78z M14.33,14.35c0,0.19-0.01,0.35-0.04,0.48s-0.06,0.24-0.11,0.32s-0.11,0.14-0.19,0.17 s-0.16,0.05-0.25,0.05s-0.18-0.02-0.25-0.05s-0.14-0.09-0.19-0.17s-0.09-0.19-0.12-0.32s-0.04-0.29-0.04-0.48v-0.97 c0-0.19,0.01-0.35,0.04-0.48s0.06-0.23,0.12-0.31s0.11-0.14,0.19-0.17s0.16-0.05,0.25-0.05s0.18,0.02,0.25,0.05 s0.14,0.09,0.19,0.17s0.09,0.18,0.12,0.31s0.04,0.29,0.04,0.48V14.35z'/%3E %3C/g%3E %3C/g%3E %3C/svg%3E"

            /***/ }),
        /* 13 */
        /***/ (function(module, __webpack_exports__, __webpack_require__) {

            "use strict";
// ESM COMPAT FLAG
            __webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/es6-promise/dist/es6-promise.js
            var es6_promise = __webpack_require__(0);
            var es6_promise_default = /*#__PURE__*/__webpack_require__.n(es6_promise);

// CONCATENATED MODULE: ./src/polyfills.js


            // Object.assign polyfill

            if (typeof Object.assign != 'function') {
                // Must be writable: true, enumerable: false, configurable: true
                Object.defineProperty(Object, 'assign', {
                    value: function assign(target, varArgs) {
                        // .length of function is 2
                        'use strict';

                        if (target == null) {
                            // TypeError if undefined or null
                            throw new TypeError('Cannot convert undefined or null to object');
                        }

                        var to = Object(target);

                        for (var index = 1; index < arguments.length; index++) {
                            var nextSource = arguments[index];

                            if (nextSource != null) {
                                // Skip over if undefined or null
                                for (var nextKey in nextSource) {
                                    // Avoid bugs when hasOwnProperty is shadowed
                                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                        to[nextKey] = nextSource[nextKey];
                                    }
                                }
                            }
                        }

                        return to;
                    },
                    writable: true,
                    configurable: true
                });
            } // CustomEvent polyfill


            (function () {
                if (typeof window.CustomEvent === 'function') return false;

                function CustomEvent(event, params) {
                    params = params || {
                        bubbles: false,
                        cancelable: false,
                        detail: undefined
                    };
                    var evt = document.createEvent('CustomEvent');
                    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                    return evt;
                }

                CustomEvent.prototype = window.Event.prototype;
                window.CustomEvent = CustomEvent;
            })(); // .remove() polyfill


            (function (arr) {
                arr.forEach(function (item) {
                    if (item.hasOwnProperty('remove')) {
                        return;
                    }

                    Object.defineProperty(item, 'remove', {
                        configurable: true,
                        enumerable: true,
                        writable: true,
                        value: function remove() {
                            if (this.parentNode === null) {
                                return;
                            }

                            this.parentNode.removeChild(this);
                        }
                    });
                });
            })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

            es6_promise_default.a.polyfill();
// CONCATENATED MODULE: ./src/modules/vpaid.js
// VPAID support module


            /* harmony default export */ var vpaid = (function (playerInstance, options) {
                var callbacks = {
                    AdStarted: function AdStarted() {
                        return playerInstance.onStartVpaidAd;
                    },
                    AdStopped: function AdStopped() {
                        return playerInstance.onStopVpaidAd;
                    },
                    AdSkipped: function AdSkipped() {
                        return playerInstance.onSkipVpaidAd;
                    },
                    AdLoaded: function AdLoaded() {
                        return playerInstance.onVpaidAdLoaded;
                    },
                    AdLinearChange: function AdLinearChange() {
                        return playerInstance.onVpaidAdLinearChange;
                    },
                    AdSizeChange: function AdSizeChange() {
                        return playerInstance.onVpaidAdSizeChange;
                    },
                    AdExpandedChange: function AdExpandedChange() {
                        return playerInstance.onVpaidAdExpandedChange;
                    },
                    AdSkippableStateChange: function AdSkippableStateChange() {
                        return playerInstance.onVpaidAdSkippableStateChange;
                    },
                    AdDurationChange: function AdDurationChange() {
                        return playerInstance.onVpaidAdDurationChange;
                    },
                    AdRemainingTimeChange: function AdRemainingTimeChange() {
                        return playerInstance.onVpaidAdRemainingTimeChange;
                    },
                    AdVolumeChange: function AdVolumeChange() {
                        return playerInstance.onVpaidAdVolumeChange;
                    },
                    AdImpression: function AdImpression() {
                        return playerInstance.onVpaidAdImpression;
                    },
                    AdClickThru: function AdClickThru() {
                        return playerInstance.onVpaidAdClickThru;
                    },
                    AdInteraction: function AdInteraction() {
                        return playerInstance.onVpaidAdInteraction;
                    },
                    AdVideoStart: function AdVideoStart() {
                        return playerInstance.onVpaidAdVideoStart;
                    },
                    AdVideoFirstQuartile: function AdVideoFirstQuartile() {
                        return playerInstance.onVpaidAdVideoFirstQuartile;
                    },
                    AdVideoMidpoint: function AdVideoMidpoint() {
                        return playerInstance.onVpaidAdVideoMidpoint;
                    },
                    AdVideoThirdQuartile: function AdVideoThirdQuartile() {
                        return playerInstance.onVpaidAdVideoThirdQuartile;
                    },
                    AdVideoComplete: function AdVideoComplete() {
                        return playerInstance.onVpaidAdVideoComplete;
                    },
                    AdUserAcceptInvitation: function AdUserAcceptInvitation() {
                        return playerInstance.onVpaidAdUserAcceptInvitation;
                    },
                    AdUserMinimize: function AdUserMinimize() {
                        return playerInstance.onVpaidAdUserMinimize;
                    },
                    AdUserClose: function AdUserClose() {
                        return playerInstance.onVpaidAdUserClose;
                    },
                    AdPaused: function AdPaused() {
                        return playerInstance.onVpaidAdPaused;
                    },
                    AdPlaying: function AdPlaying() {
                        return playerInstance.onVpaidAdPlaying;
                    },
                    AdError: function AdError() {
                        return playerInstance.onVpaidAdError;
                    },
                    AdLog: function AdLog() {
                        return playerInstance.onVpaidAdLog;
                    }
                };

                playerInstance.checkVPAIDInterface = function (vpaidAdUnit) {
                    var VPAIDCreative = vpaidAdUnit; // checks if all the mandatory params present

                    return !!(VPAIDCreative.handshakeVersion && typeof VPAIDCreative.handshakeVersion == "function" && VPAIDCreative.initAd && typeof VPAIDCreative.initAd == "function" && VPAIDCreative.startAd && typeof VPAIDCreative.startAd == "function" && VPAIDCreative.stopAd && typeof VPAIDCreative.stopAd == "function" && VPAIDCreative.skipAd && typeof VPAIDCreative.skipAd == "function" && VPAIDCreative.resizeAd && typeof VPAIDCreative.resizeAd == "function" && VPAIDCreative.pauseAd && typeof VPAIDCreative.pauseAd == "function" && VPAIDCreative.resumeAd && typeof VPAIDCreative.resumeAd == "function" && VPAIDCreative.expandAd && typeof VPAIDCreative.expandAd == "function" && VPAIDCreative.collapseAd && typeof VPAIDCreative.collapseAd == "function" && VPAIDCreative.subscribe && typeof VPAIDCreative.subscribe == "function" && VPAIDCreative.unsubscribe && typeof VPAIDCreative.unsubscribe == "function");
                }; // Callback for AdPaused


                playerInstance.onVpaidAdPaused = function () {
                    playerInstance.vpaidTimeoutTimerClear();
                    playerInstance.debugMessage("onAdPaused");
                }; // Callback for AdPlaying


                playerInstance.onVpaidAdPlaying = function () {
                    playerInstance.vpaidTimeoutTimerClear();
                    playerInstance.debugMessage("onAdPlaying");
                }; // Callback for AdError


                playerInstance.onVpaidAdError = function (message) {
                    playerInstance.debugMessage("onAdError: " + message);
                    playerInstance.vpaidTimeoutTimerClear();
                    playerInstance.onVpaidEnded();
                }; // Callback for AdLog


                playerInstance.onVpaidAdLog = function (message) {
                    playerInstance.debugMessage("onAdLog: " + message);
                }; // Callback for AdUserAcceptInvitation


                playerInstance.onVpaidAdUserAcceptInvitation = function () {
                    playerInstance.debugMessage("onAdUserAcceptInvitation");
                }; // Callback for AdUserMinimize


                playerInstance.onVpaidAdUserMinimize = function () {
                    playerInstance.debugMessage("onAdUserMinimize");
                }; // Callback for AdUserClose


                playerInstance.onVpaidAdUserClose = function () {
                    playerInstance.debugMessage("onAdUserClose");
                }; // Callback for AdUserClose


                playerInstance.onVpaidAdSkippableStateChange = function () {
                    if (!playerInstance.vpaidAdUnit) {
                        return;
                    }

                    playerInstance.debugMessage("Ad Skippable State Changed to: " + playerInstance.vpaidAdUnit.getAdSkippableState());
                }; // Callback for AdUserClose


                playerInstance.onVpaidAdExpandedChange = function () {
                    if (!playerInstance.vpaidAdUnit) {
                        return;
                    }

                    playerInstance.debugMessage("Ad Expanded Changed to: " + playerInstance.vpaidAdUnit.getAdExpanded());
                }; // Pass through for getAdExpanded


                playerInstance.getVpaidAdExpanded = function () {
                    playerInstance.debugMessage("getAdExpanded");

                    if (!playerInstance.vpaidAdUnit) {
                        return;
                    }

                    return playerInstance.vpaidAdUnit.getAdExpanded();
                }; // Pass through for getAdSkippableState


                playerInstance.getVpaidAdSkippableState = function () {
                    playerInstance.debugMessage("getAdSkippableState");

                    if (!playerInstance.vpaidAdUnit) {
                        return;
                    }

                    return playerInstance.vpaidAdUnit.getAdSkippableState();
                }; // Callback for AdSizeChange


                playerInstance.onVpaidAdSizeChange = function () {
                    if (!playerInstance.vpaidAdUnit) {
                        return;
                    }

                    playerInstance.debugMessage("Ad size changed to: w=" + playerInstance.vpaidAdUnit.getAdWidth() + " h=" + playerInstance.vpaidAdUnit.getAdHeight());
                }; // Callback for AdDurationChange


                playerInstance.onVpaidAdDurationChange = function () {
                    if (!playerInstance.vpaidAdUnit) {
                        return;
                    }

                    playerInstance.debugMessage("Ad Duration Changed to: " + playerInstance.vpaidAdUnit.getAdDuration());
                }; // Callback for AdRemainingTimeChange


                playerInstance.onVpaidAdRemainingTimeChange = function () {
                    if (!playerInstance.vpaidAdUnit) {
                        return;
                    }

                    playerInstance.debugMessage("Ad Remaining Time Changed to: " + playerInstance.vpaidAdUnit.getAdRemainingTime());
                }; // Pass through for getAdRemainingTime


                playerInstance.getVpaidAdRemainingTime = function () {
                    playerInstance.debugMessage("getAdRemainingTime");

                    if (!playerInstance.vpaidAdUnit) {
                        return;
                    }

                    return playerInstance.vpaidAdUnit.getAdRemainingTime();
                }; // Callback for AdImpression


                playerInstance.onVpaidAdImpression = function () {
                    playerInstance.debugMessage("Ad Impression"); //Announce the impressions

                    playerInstance.trackSingleEvent('impression');
                }; // Callback for AdClickThru


                playerInstance.onVpaidAdClickThru = function (url, id, playerHandles) {
                    playerInstance.debugMessage("Clickthrough portion of the ad was clicked"); // if playerHandles flag is set to true
                    // then player need to open click thorough url in new window

                    if (playerHandles) {
                        window.open(playerInstance.vastOptions.clickthroughUrl);
                    }

                    playerInstance.pauseVpaidAd(); // fire click tracking

                    playerInstance.callUris(playerInstance.vastOptions.clicktracking);
                }; // Callback for AdInteraction


                playerInstance.onVpaidAdInteraction = function (id) {
                    playerInstance.debugMessage("A non-clickthrough event has occured");
                }; // Callback for AdVideoStart


                playerInstance.onVpaidAdVideoStart = function () {
                    playerInstance.debugMessage("Video 0% completed");
                    playerInstance.trackSingleEvent('start');
                }; // Callback for AdUserClose


                playerInstance.onVpaidAdVideoFirstQuartile = function () {
                    playerInstance.debugMessage("Video 25% completed");
                    playerInstance.trackSingleEvent('firstQuartile');
                }; // Callback for AdUserClose


                playerInstance.onVpaidAdVideoMidpoint = function () {
                    playerInstance.debugMessage("Video 50% completed");
                    playerInstance.trackSingleEvent('midpoint');
                }; // Callback for AdUserClose


                playerInstance.onVpaidAdVideoThirdQuartile = function () {
                    playerInstance.debugMessage("Video 75% completed");
                    playerInstance.trackSingleEvent('thirdQuartile');
                }; // Callback for AdVideoComplete


                playerInstance.onVpaidAdVideoComplete = function () {
                    playerInstance.debugMessage("Video 100% completed");
                    playerInstance.trackSingleEvent('complete');
                }; // Callback for AdLinearChange


                playerInstance.onVpaidAdLinearChange = function () {
                    var vpaidNonLinearSlot = document.getElementsByClassName("fluid_vpaidNonLinear_ad")[0];
                    var closeBtn = document.getElementById('close_button_' + playerInstance.videoPlayerId);
                    var adListId = vpaidNonLinearSlot.getAttribute('adlistid');
                    playerInstance.debugMessage("Ad linear has changed: " + playerInstance.vpaidAdUnit.getAdLinear());

                    if (!playerInstance.vpaidAdUnit.getAdLinear()) {
                        return;
                    }

                    playerInstance.backupMainVideoContentTime(adListId);
                    playerInstance.isCurrentlyPlayingAd = true;

                    if (closeBtn) {
                        closeBtn.remove();
                    }

                    vpaidNonLinearSlot.className = 'fluid_vpaid_slot';
                    vpaidNonLinearSlot.id = playerInstance.videoPlayerId + "_fluid_vpaid_slot";
                    playerInstance.domRef.player.loop = false;
                    playerInstance.domRef.player.removeAttribute('controls');
                    var progressbarContainer = playerInstance.domRef.player.parentNode.getElementsByClassName('fluid_controls_currentprogress');

                    for (var i = 0; i < progressbarContainer.length; i++) {
                        progressbarContainer[i].style.backgroundColor = playerInstance.displayOptions.layoutControls.adProgressColor;
                    }

                    playerInstance.toggleLoader(false);
                }; // Pass through for getAdLinear


                playerInstance.getVpaidAdLinear = function () {
                    playerInstance.debugMessage("getAdLinear");
                    return playerInstance.vpaidAdUnit.getAdLinear();
                }; // Pass through for startAd()


                playerInstance.startVpaidAd = function () {
                    playerInstance.debugMessage("startAd");
                    playerInstance.vpaidTimeoutTimerStart();
                    playerInstance.vpaidAdUnit.startAd();
                }; // Callback for AdLoaded


                playerInstance.onVpaidAdLoaded = function () {
                    playerInstance.debugMessage("ad has been loaded"); // start the video play as vpaid is loaded successfully

                    playerInstance.vpaidTimeoutTimerClear();
                    playerInstance.startVpaidAd();
                }; // Callback for StartAd()


                playerInstance.onStartVpaidAd = function () {
                    playerInstance.debugMessage("Ad has started");
                    playerInstance.vpaidTimeoutTimerClear();
                }; // Pass through for stopAd()


                playerInstance.stopVpaidAd = function () {
                    playerInstance.vpaidTimeoutTimerStart();
                    playerInstance.vpaidAdUnit.stopAd();
                }; // Hard Pass through for stopAd() excluding deleteOtherVpaidAdsApart


                playerInstance.hardStopVpaidAd = function (deleteOtherVpaidAdsApart) {
                    // this is hard stop of vpaid ads
                    // we delete all the vpaid assets so the new one can be loaded
                    // delete all assets apart from the ad from deleteOtherVpaidAdsApart
                    if (playerInstance.vpaidAdUnit) {
                        playerInstance.vpaidAdUnit.stopAd();
                        playerInstance.vpaidAdUnit = null;
                    }

                    var vpaidIframes = document.getElementsByClassName("fluid_vpaid_iframe");
                    var vpaidSlots = document.getElementsByClassName("fluid_vpaid_slot");
                    var vpaidNonLinearSlots = document.getElementsByClassName("fluid_vpaidNonLinear_ad");

                    for (var i = 0; i < vpaidIframes.length; i++) {
                        if (vpaidIframes[i].getAttribute('adListId') !== deleteOtherVpaidAdsApart) {
                            vpaidIframes[i].remove();
                        }
                    }

                    for (var j = 0; j < vpaidSlots.length; j++) {
                        if (vpaidSlots[j].getAttribute('adListId') !== deleteOtherVpaidAdsApart) {
                            vpaidSlots[j].remove();
                        }
                    }

                    for (var k = 0; k < vpaidNonLinearSlots.length; k++) {
                        if (vpaidNonLinearSlots[k].getAttribute('adListId') !== deleteOtherVpaidAdsApart) {
                            vpaidNonLinearSlots[k].remove();
                        }
                    }
                }; // Callback for AdUserClose


                playerInstance.onStopVpaidAd = function () {
                    playerInstance.debugMessage("Ad has stopped");
                    playerInstance.vpaidTimeoutTimerClear();
                    playerInstance.onVpaidEnded();
                }; // Callback for AdUserClose


                playerInstance.onSkipVpaidAd = function () {
                    playerInstance.debugMessage("Ad was skipped");
                    playerInstance.vpaidTimeoutTimerClear();
                    playerInstance.onVpaidEnded();
                }; // Passthrough for skipAd


                playerInstance.skipVpaidAd = function () {
                    playerInstance.vpaidTimeoutTimerStart();

                    if (!playerInstance.vpaidAdUnit) {
                        return;
                    }

                    playerInstance.vpaidAdUnit.skipAd();
                    playerInstance.vpaidTimeoutTimerClear();
                    playerInstance.onVpaidEnded();
                }; // Passthrough for setAdVolume


                playerInstance.setVpaidAdVolume = function (val) {
                    if (!playerInstance.vpaidAdUnit) {
                        return;
                    }

                    playerInstance.vpaidAdUnit.setAdVolume(val);
                }; // Passthrough for getAdVolume


                playerInstance.getVpaidAdVolume = function () {
                    if (!playerInstance.vpaidAdUnit) {
                        return;
                    }

                    return playerInstance.vpaidAdUnit.getAdVolume();
                }; // Callback for AdVolumeChange


                playerInstance.onVpaidAdVolumeChange = function () {
                    if (!playerInstance.vpaidAdUnit) {
                        return;
                    }

                    playerInstance.debugMessage("Ad Volume has changed to - " + playerInstance.vpaidAdUnit.getAdVolume());
                };

                playerInstance.resizeVpaidAuto = function () {
                    if (playerInstance.vastOptions !== null && playerInstance.vastOptions.vpaid && playerInstance.vastOptions.linear) {
                        var adWidth = playerInstance.domRef.player.offsetWidth;
                        var adHeight = playerInstance.domRef.player.offsetHeight;
                        var mode = playerInstance.fullscreenMode ? 'fullscreen' : 'normal';
                        playerInstance.resizeVpaidAd(adWidth, adHeight, mode);
                    }
                }; //Passthrough for resizeAd


                playerInstance.resizeVpaidAd = function (width, height, viewMode) {
                    if (!playerInstance.vpaidAdUnit) {
                        return;
                    }

                    playerInstance.vpaidAdUnit.resizeAd(width, height, viewMode);
                }; // Passthrough for pauseAd()


                playerInstance.pauseVpaidAd = function () {
                    playerInstance.vpaidTimeoutTimerStart();

                    if (!playerInstance.vpaidAdUnit) {
                        return;
                    }

                    playerInstance.vpaidAdUnit.pauseAd();
                }; // Passthrough for resumeAd()


                playerInstance.resumeVpaidAd = function () {
                    playerInstance.vpaidTimeoutTimerStart();

                    if (!playerInstance.vpaidAdUnit) {
                        return;
                    }

                    playerInstance.vpaidAdUnit.resumeAd();
                }; //Passthrough for expandAd()


                playerInstance.expandVpaidAd = function () {
                    if (!playerInstance.vpaidAdUnit) {
                        return;
                    }

                    playerInstance.vpaidAdUnit.expandAd();
                }; //Passthrough for collapseAd()


                playerInstance.collapseVpaidAd = function () {
                    if (!playerInstance.vpaidAdUnit) {
                        return;
                    }

                    playerInstance.vpaidAdUnit.collapseAd();
                };

                playerInstance.vpaidTimeoutTimerClear = function () {
                    if (playerInstance.vpaidTimer) {
                        clearTimeout(playerInstance.vpaidTimer);
                    }
                }; // placeholder for timer function


                playerInstance.vpaidTimeoutTimerStart = function () {
                    // clear previous timer if any
                    playerInstance.vpaidTimeoutTimerClear();
                    playerInstance.vpaidTimer = setTimeout(function () {
                        playerInstance.announceLocalError('901');
                        playerInstance.onVpaidEnded();
                    }, playerInstance.displayOptions.vastOptions.vpaidTimeout);
                };

                playerInstance.vpaidCallbackListenersAttach = function () {
                    //The key of the object is the event name and the value is a reference to the callback function that is registered with the creative
                    // Looping through the object and registering each of the callbacks with the creative
                    for (var eventName in callbacks) {
                        playerInstance.vpaidAdUnit.subscribe(callbacks[eventName](), eventName, playerInstance);
                    }
                };

                playerInstance.vpaidCallbackListenersDetach = function () {
                    if (!playerInstance.vpaidAdUnit) {
                        return;
                    }

                    for (var eventName in callbacks) {
                        playerInstance.vpaidAdUnit.unsubscribe(callbacks[eventName](), eventName, playerInstance);
                    }
                };

                playerInstance.loadVpaid = function (adListId, vpaidJsUrl) {
                    var vpaidIframe = document.createElement('iframe');
                    vpaidIframe.id = playerInstance.videoPlayerId + "_" + adListId + "_fluid_vpaid_iframe";
                    vpaidIframe.className = 'fluid_vpaid_iframe';
                    vpaidIframe.setAttribute('adListId', adListId);
                    vpaidIframe.setAttribute('frameborder', '0');
                    playerInstance.domRef.player.parentNode.insertBefore(vpaidIframe, playerInstance.domRef.player.nextSibling);
                    vpaidIframe.contentWindow.document.write('<script src="' + vpaidJsUrl + '"></scr' + 'ipt>'); // set interval with timeout

                    playerInstance.tempVpaidCounter = 0;
                    playerInstance.getVPAIDAdInterval = setInterval(function () {
                        var fn = vpaidIframe.contentWindow['getVPAIDAd']; // check if JS is loaded fully in iframe

                        if (fn && typeof fn == 'function') {
                            if (playerInstance.vpaidAdUnit) {
                                playerInstance.hardStopVpaidAd(adListId);
                            }

                            playerInstance.vpaidAdUnit = fn();
                            clearInterval(playerInstance.getVPAIDAdInterval);

                            if (playerInstance.checkVPAIDInterface(playerInstance.vpaidAdUnit)) {
                                if (playerInstance.getVpaidAdLinear()) {
                                    playerInstance.isCurrentlyPlayingAd = true;
                                    playerInstance.switchPlayerToVpaidMode(adListId);
                                } else {
                                    playerInstance.debugMessage('non linear vpaid ad is loaded');
                                    playerInstance.loadVpaidNonlinearAssets(adListId);
                                }
                            }
                        } else {
                            // video player will wait for 2seconds if vpaid is not loaded, then it will declare vast error and move ahead
                            playerInstance.tempVpaidCounter++;

                            if (playerInstance.tempVpaidCounter >= 20) {
                                clearInterval(playerInstance.getVPAIDAdInterval);
                                playerInstance.adList[adListId].error = true;
                                playerInstance.playMainVideoWhenVpaidFails(403);
                                return false;
                            } else {
                                playerInstance.debugMessage(playerInstance.tempVpaidCounter);
                            }
                        }
                    }, 100);
                };

                playerInstance.onVpaidEnded = function (event) {
                    if (event) {
                        event.stopImmediatePropagation();
                    }

                    var vpaidSlot = document.getElementById(playerInstance.videoPlayerId + "_fluid_vpaid_slot");
                    playerInstance.vpaidCallbackListenersDetach();
                    playerInstance.vpaidAdUnit = null;
                    clearInterval(playerInstance.getVPAIDAdInterval);

                    if (!!vpaidSlot) {
                        vpaidSlot.remove();
                    }

                    playerInstance.checkForNextAd();
                };

                playerInstance.playMainVideoWhenVpaidFails = function (errorCode) {
                    var vpaidSlot = document.getElementById(playerInstance.videoPlayerId + "_fluid_vpaid_slot");

                    if (vpaidSlot) {
                        vpaidSlot.remove();
                    }

                    clearInterval(playerInstance.getVPAIDAdInterval);
                    playerInstance.playMainVideoWhenVastFails(errorCode);
                }; // TODO: ???


                playerInstance.switchPlayerToVpaidMode = function () {};
            });
// CONCATENATED MODULE: ./src/modules/vast.js
// VAST support module


            /* harmony default export */ var vast = (function (playerInstance, options) {
                playerInstance.getClickThroughUrlFromLinear = function (linear) {
                    var videoClicks = linear.getElementsByTagName('VideoClicks');

                    if (videoClicks.length) {
                        //There should be exactly 1 node
                        var clickThroughs = videoClicks[0].getElementsByTagName('ClickThrough');

                        if (clickThroughs.length) {
                            return playerInstance.extractNodeData(clickThroughs[0]);
                        }
                    }

                    return false;
                };

                playerInstance.getVastAdTagUriFromWrapper = function (xmlResponse) {
                    var wrapper = xmlResponse.getElementsByTagName('Wrapper');

                    if (typeof wrapper !== 'undefined' && wrapper.length) {
                        var vastAdTagURI = wrapper[0].getElementsByTagName('VASTAdTagURI');

                        if (vastAdTagURI.length) {
                            return playerInstance.extractNodeData(vastAdTagURI[0]);
                        }
                    }

                    return false;
                };

                playerInstance.hasInLine = function (xmlResponse) {
                    var inLine = xmlResponse.getElementsByTagName('InLine');
                    return typeof inLine !== 'undefined' && inLine.length;
                };

                playerInstance.hasVastAdTagUri = function (xmlResponse) {
                    var vastAdTagURI = xmlResponse.getElementsByTagName('VASTAdTagURI');
                    return typeof vastAdTagURI !== 'undefined' && vastAdTagURI.length;
                };

                playerInstance.getClickThroughUrlFromNonLinear = function (nonLinear) {
                    var result = '';
                    var nonLinears = nonLinear.getElementsByTagName('NonLinear');

                    if (nonLinears.length) {
                        //There should be exactly 1 node
                        var nonLinearClickThrough = nonLinear.getElementsByTagName('NonLinearClickThrough');

                        if (nonLinearClickThrough.length) {
                            result = playerInstance.extractNodeData(nonLinearClickThrough[0]);
                        }
                    }

                    return result;
                };

                playerInstance.getTrackingFromLinear = function (linear) {
                    var trackingEvents = linear.getElementsByTagName('TrackingEvents');

                    if (trackingEvents.length) {
                        //There should be no more than one node
                        return trackingEvents[0].getElementsByTagName('Tracking');
                    }

                    return [];
                };

                playerInstance.getDurationFromLinear = function (linear) {
                    var duration = linear.getElementsByTagName('Duration');

                    if (duration.length && typeof duration[0].childNodes[0] !== 'undefined') {
                        var nodeDuration = playerInstance.extractNodeData(duration[0]);
                        return playerInstance.convertTimeStringToSeconds(nodeDuration);
                    }

                    return false;
                };

                playerInstance.getDurationFromNonLinear = function (tag) {
                    var result = 0;
                    var nonLinear = tag.getElementsByTagName('NonLinear');

                    if (nonLinear.length && typeof nonLinear[0].getAttribute('minSuggestedDuration') !== 'undefined') {
                        result = playerInstance.convertTimeStringToSeconds(nonLinear[0].getAttribute('minSuggestedDuration'));
                    }

                    return result;
                };

                playerInstance.getDimensionFromNonLinear = function (tag) {
                    var result = {
                        'width': null,
                        'height': null
                    };
                    var nonLinear = tag.getElementsByTagName('NonLinear');

                    if (nonLinear.length) {
                        if (typeof nonLinear[0].getAttribute('width') !== 'undefined') {
                            result.width = nonLinear[0].getAttribute('width');
                        }

                        if (typeof nonLinear[0].getAttribute('height') !== 'undefined') {
                            result.height = nonLinear[0].getAttribute('height');
                        }
                    }

                    return result;
                };

                playerInstance.getCreativeTypeFromStaticResources = function (tag) {
                    var result = '';
                    var nonLinears = tag.getElementsByTagName('NonLinear');

                    if (nonLinears.length && typeof nonLinears[0].childNodes[0] !== 'undefined') {
                        //There should be exactly 1 StaticResource node
                        result = nonLinears[0].getElementsByTagName('StaticResource')[0].getAttribute('creativeType');
                    }

                    return result.toLowerCase();
                };

                playerInstance.getMediaFilesFromLinear = function (linear) {
                    var mediaFiles = linear.getElementsByTagName('MediaFiles');

                    if (mediaFiles.length) {
                        //There should be exactly 1 MediaFiles node
                        return mediaFiles[0].getElementsByTagName('MediaFile');
                    }

                    return [];
                };

                playerInstance.getStaticResourcesFromNonLinear = function (linear) {
                    var result = [];
                    var nonLinears = linear.getElementsByTagName('NonLinear');

                    if (nonLinears.length) {
                        //There should be exactly 1 StaticResource node
                        result = nonLinears[0].getElementsByTagName('StaticResource');
                    }

                    return result;
                };

                playerInstance.extractNodeData = function (parentNode) {
                    var contentAsString = "";

                    for (var n = 0; n < parentNode.childNodes.length; n++) {
                        var child = parentNode.childNodes[n];

                        if (child.nodeType === 8 || child.nodeType === 3 && /^\s*$/.test(child.nodeValue)) {// Comments or text with no content
                        } else {
                            contentAsString += child.nodeValue;
                        }
                    }

                    return contentAsString.replace(/(^\s+|\s+$)/g, '');
                };

                playerInstance.getAdParametersFromLinear = function (linear) {
                    var adParameters = linear.getElementsByTagName('AdParameters');
                    var adParametersData = null;

                    if (adParameters.length) {
                        adParametersData = playerInstance.extractNodeData(adParameters[0]);
                    }

                    return adParametersData;
                };

                playerInstance.getMediaFileListFromLinear = function (linear) {
                    var mediaFileList = [];
                    var mediaFiles = playerInstance.getMediaFilesFromLinear(linear);

                    if (!mediaFiles.length) {
                        return mediaFileList;
                    }

                    for (var n = 0; n < mediaFiles.length; n++) {
                        var mediaType = mediaFiles[n].getAttribute('mediaType');

                        if (!mediaType) {
                            // if there is no mediaType attribute then the video is 2D
                            mediaType = '2D';
                        } // get all the attributes of media file


                        mediaFileList.push({
                            'src': playerInstance.extractNodeData(mediaFiles[n]),
                            'type': mediaFiles[n].getAttribute('type'),
                            'apiFramework': mediaFiles[n].getAttribute('apiFramework'),
                            'codec': mediaFiles[n].getAttribute('codec'),
                            'id': mediaFiles[n].getAttribute('codec'),
                            'fileSize': mediaFiles[n].getAttribute('fileSize'),
                            'delivery': mediaFiles[n].getAttribute('delivery'),
                            'width': mediaFiles[n].getAttribute('width'),
                            'height': mediaFiles[n].getAttribute('height'),
                            'mediaType': mediaType.toLowerCase()
                        });
                    }

                    return mediaFileList;
                };

                playerInstance.getIconClickThroughFromLinear = function (linear) {
                    var iconClickThrough = linear.getElementsByTagName('IconClickThrough');

                    if (iconClickThrough.length) {
                        return playerInstance.extractNodeData(iconClickThrough[0]);
                    }

                    return '';
                };

                playerInstance.getStaticResourceFromNonLinear = function (linear) {
                    var fallbackStaticResource;
                    var staticResources = playerInstance.getStaticResourcesFromNonLinear(linear);

                    for (var i = 0; i < staticResources.length; i++) {
                        if (!staticResources[i].getAttribute('type')) {
                            fallbackStaticResource = playerInstance.extractNodeData(staticResources[i]);
                        }

                        if (staticResources[i].getAttribute('type') === playerInstance.displayOptions.staticResource) {
                            return playerInstance.extractNodeData(staticResources[i]);
                        }
                    }

                    return fallbackStaticResource;
                };

                playerInstance.registerTrackingEvents = function (creativeLinear, tmpOptions) {
                    var trackingEvents = playerInstance.getTrackingFromLinear(creativeLinear);
                    var eventType = '';
                    var oneEventOffset = 0;

                    for (var i = 0; i < trackingEvents.length; i++) {
                        eventType = trackingEvents[i].getAttribute('event');

                        switch (eventType) {
                            case 'start':
                            case 'firstQuartile':
                            case 'midpoint':
                            case 'thirdQuartile':
                            case 'complete':
                                if (typeof tmpOptions.tracking[eventType] === 'undefined') {
                                    tmpOptions.tracking[eventType] = [];
                                }

                                if (typeof tmpOptions.stopTracking[eventType] === 'undefined') {
                                    tmpOptions.stopTracking[eventType] = [];
                                }

                                tmpOptions.tracking[eventType].push(trackingEvents[i].childNodes[0].nodeValue);
                                tmpOptions.stopTracking[eventType] = false;
                                break;

                            case 'progress':
                                if (typeof tmpOptions.tracking[eventType] === 'undefined') {
                                    tmpOptions.tracking[eventType] = [];
                                }

                                oneEventOffset = playerInstance.convertTimeStringToSeconds(trackingEvents[i].getAttribute('offset'));

                                if (typeof tmpOptions.tracking[eventType][oneEventOffset] === 'undefined') {
                                    tmpOptions.tracking[eventType][oneEventOffset] = {
                                        elements: [],
                                        stopTracking: false
                                    };
                                }

                                tmpOptions.tracking[eventType][oneEventOffset].elements.push(trackingEvents[i].childNodes[0].nodeValue);
                                break;

                            default:
                                break;
                        }
                    }
                };

                playerInstance.registerClickTracking = function (clickTrackingTag, tmpOptions) {
                    if (!clickTrackingTag || !clickTrackingTag.length) {
                        return;
                    }

                    for (var i = 0; i < clickTrackingTag.length; i++) {
                        if (clickTrackingTag[i] === '') {
                            continue;
                        }

                        tmpOptions.clicktracking.push(clickTrackingTag[i]);
                    }
                };

                playerInstance.registerImpressionEvents = function (impressionTags, tmpOptions) {
                    if (!impressionTags.length) {
                        return;
                    }

                    for (var i = 0; i < impressionTags.length; i++) {
                        var impressionEvent = playerInstance.extractNodeData(impressionTags[i]);
                        tmpOptions.impression.push(impressionEvent);
                    }
                };

                playerInstance.registerErrorEvents = function (errorTags, tmpOptions) {
                    if (typeof errorTags !== 'undefined' && errorTags !== null && errorTags.length === 1 && //Only 1 Error tag is expected
                        errorTags[0].childNodes.length === 1) {
                        tmpOptions.errorUrl = errorTags[0].childNodes[0].nodeValue;
                    }
                };

                playerInstance.announceError = function (code) {
                    if (typeof playerInstance.vastOptions.errorUrl === 'undefined' || !playerInstance.vastOptions.errorUrl) {
                        return;
                    }

                    var parsedCode = typeof code !== 'undefined' ? parseInt(code) : 900;
                    var errorUrl = playerInstance.vastOptions.errorUrl.replace('[ERRORCODE]', parsedCode); //Send the error request

                    playerInstance.callUris([errorUrl]);
                };

                playerInstance.getClickTrackingEvents = function (linear) {
                    var result = [];
                    var videoClicks = linear.getElementsByTagName('VideoClicks'); //There should be exactly 1 node

                    if (!videoClicks.length) {
                        return;
                    }

                    var clickTracking = videoClicks[0].getElementsByTagName('ClickTracking');

                    if (!clickTracking.length) {
                        return;
                    }

                    for (var i = 0; i < clickTracking.length; i++) {
                        var clickTrackingEvent = playerInstance.extractNodeData(clickTracking[i]);
                        result.push(clickTrackingEvent);
                    }

                    return result;
                };

                playerInstance.getNonLinearClickTrackingEvents = function (nonLinear) {
                    var result = [];
                    var nonLinears = nonLinear.getElementsByTagName('NonLinear');

                    if (!nonLinears.length) {
                        return;
                    }

                    var clickTracking = nonLinear.getElementsByTagName('NonLinearClickTracking');

                    if (!clickTracking.length) {
                        return;
                    }

                    for (var i = 0; i < clickTracking.length; i++) {
                        var NonLinearClickTracking = playerInstance.extractNodeData(clickTracking[i]);
                        result.push(NonLinearClickTracking);
                    }

                    return result;
                }; // TODO: ???


                playerInstance.callUris = function (uris) {
                    for (var i = 0; i < uris.length; i++) {
                        new Image().src = uris[i];
                    }
                };

                playerInstance.recalculateAdDimensions = function () {
                    var videoPlayer = document.getElementById(playerInstance.videoPlayerId);
                    var divClickThrough = document.getElementById('vast_clickthrough_layer_' + playerInstance.videoPlayerId);

                    if (divClickThrough) {
                        divClickThrough.style.width = videoPlayer.offsetWidth + 'px';
                        divClickThrough.style.height = videoPlayer.offsetHeight + 'px';
                    }

                    var requestFullscreenFunctionNames = playerInstance.checkFullscreenSupport('fluid_video_wrapper_' + playerInstance.videoPlayerId);
                    var fullscreenButton = document.getElementById(playerInstance.videoPlayerId + '_fluid_control_fullscreen');
                    var menuOptionFullscreen = document.getElementById(playerInstance.videoPlayerId + 'context_option_fullscreen');

                    if (requestFullscreenFunctionNames) {
                        // this will go other way around because we already exited full screen
                        if (document[requestFullscreenFunctionNames.isFullscreen] === null) {
                            // Exit fullscreen
                            playerInstance.fullscreenOff(fullscreenButton, menuOptionFullscreen);
                        } else {
                            // Go fullscreen
                            playerInstance.fullscreenOn(fullscreenButton, menuOptionFullscreen);
                        }
                    } else {
                        // TODO: I am fairly certain this fallback does not work...
                        //The browser does not support the Fullscreen API, so a pseudo-fullscreen implementation is used
                        var fullscreenTag = document.getElementById('fluid_video_wrapper_' + playerInstance.videoPlayerId);

                        if (fullscreenTag.className.search(/\bpseudo_fullscreen\b/g) !== -1) {
                            fullscreenTag.className += ' pseudo_fullscreen';
                            playerInstance.fullscreenOn(fullscreenButton, menuOptionFullscreen);
                        } else {
                            fullscreenTag.className = fullscreenTag.className.replace(/\bpseudo_fullscreen\b/g, '');
                            playerInstance.fullscreenOff(fullscreenButton, menuOptionFullscreen);
                        }
                    }
                };

                playerInstance.prepareVast = function (roll) {
                    var list = playerInstance.findRoll(roll);

                    for (var i = 0; i < list.length; i++) {
                        var adListId = list[i];

                        if (!(playerInstance.adList[adListId].vastLoaded !== true && playerInstance.adList[adListId].error !== true)) {
                            continue;
                        }

                        playerInstance.processVastWithRetries(playerInstance.adList[adListId]);
                        playerInstance.domRef.player.addEventListener('adId_' + adListId, playerInstance[roll]);
                    }
                };

                playerInstance.playMainVideoWhenVastFails = function (errorCode) {
                    playerInstance.debugMessage('playMainVideoWhenVastFails called');
                    playerInstance.domRef.player.removeEventListener('loadedmetadata', playerInstance.switchPlayerToVastMode);
                    playerInstance.domRef.player.pause();
                    playerInstance.toggleLoader(false);
                    playerInstance.displayOptions.vastOptions.vastAdvanced.noVastVideoCallback();

                    if (!playerInstance.vastOptions || typeof playerInstance.vastOptions.errorUrl === 'undefined') {
                        playerInstance.announceLocalError(errorCode);
                    } else {
                        playerInstance.announceError(errorCode);
                    }

                    playerInstance.switchToMainVideo();
                }; // TODO: ???


                playerInstance.switchPlayerToVastMode = function () {};
                /**
                 * Process the XML response
                 *
                 * @param xmlResponse
                 * @param tmpOptions
                 * @param callBack
                 */


                playerInstance.processVastXml = function (xmlResponse, tmpOptions, callBack) {
                    var clickTracks;

                    if (!xmlResponse) {
                        callBack(false);
                        return;
                    } //Get impression tag


                    var impression = xmlResponse.getElementsByTagName('Impression');

                    if (impression !== null) {
                        playerInstance.registerImpressionEvents(impression, tmpOptions);
                    } //Get the error tag, if any


                    var errorTags = xmlResponse.getElementsByTagName('Error');

                    if (errorTags !== null) {
                        playerInstance.registerErrorEvents(errorTags, tmpOptions);
                    } //Get Creative


                    var creative = xmlResponse.getElementsByTagName('Creative'); //Currently only 1 creative and 1 linear is supported

                    if (typeof creative !== 'undefined' && creative.length) {
                        var arrayCreativeLinears = creative[0].getElementsByTagName('Linear');

                        if (typeof arrayCreativeLinears !== 'undefined' && arrayCreativeLinears !== null && arrayCreativeLinears.length) {
                            var creativeLinear = arrayCreativeLinears[0];
                            playerInstance.registerTrackingEvents(creativeLinear, tmpOptions);
                            clickTracks = playerInstance.getClickTrackingEvents(creativeLinear);
                            playerInstance.registerClickTracking(clickTracks, tmpOptions); //Extract the Ad data if it is actually the Ad (!wrapper)

                            if (!playerInstance.hasVastAdTagUri(xmlResponse) && playerInstance.hasInLine(xmlResponse)) {
                                //Set initial values
                                tmpOptions.adFinished = false;
                                tmpOptions.adType = 'linear';
                                tmpOptions.vpaid = false; //Extract the necessary data from the Linear node

                                tmpOptions.skipoffset = playerInstance.convertTimeStringToSeconds(creativeLinear.getAttribute('skipoffset'));
                                tmpOptions.clickthroughUrl = playerInstance.getClickThroughUrlFromLinear(creativeLinear);
                                tmpOptions.duration = playerInstance.getDurationFromLinear(creativeLinear);
                                tmpOptions.mediaFileList = playerInstance.getMediaFileListFromLinear(creativeLinear);
                                tmpOptions.adParameters = playerInstance.getAdParametersFromLinear(creativeLinear);
                                tmpOptions.iconClick = playerInstance.getIconClickThroughFromLinear(creativeLinear);

                                if (tmpOptions.adParameters) {
                                    tmpOptions.vpaid = true;
                                }
                            }
                        }

                        var arrayCreativeNonLinears = creative[0].getElementsByTagName('NonLinearAds');

                        if (typeof arrayCreativeNonLinears !== 'undefined' && arrayCreativeNonLinears !== null && arrayCreativeNonLinears.length) {
                            var creativeNonLinear = arrayCreativeNonLinears[0];
                            playerInstance.registerTrackingEvents(creativeNonLinear, tmpOptions);
                            clickTracks = playerInstance.getNonLinearClickTrackingEvents(creativeNonLinear);
                            playerInstance.registerClickTracking(clickTracks, tmpOptions); //Extract the Ad data if it is actually the Ad (!wrapper)

                            if (!playerInstance.hasVastAdTagUri(xmlResponse) && playerInstance.hasInLine(xmlResponse)) {
                                //Set initial values
                                tmpOptions.adType = 'nonLinear';
                                tmpOptions.vpaid = false; //Extract the necessary data from the NonLinear node

                                tmpOptions.clickthroughUrl = playerInstance.getClickThroughUrlFromNonLinear(creativeNonLinear);
                                tmpOptions.duration = playerInstance.getDurationFromNonLinear(creativeNonLinear); // VAST version < 4.0

                                tmpOptions.dimension = playerInstance.getDimensionFromNonLinear(creativeNonLinear); // VAST version < 4.0

                                tmpOptions.staticResource = playerInstance.getStaticResourceFromNonLinear(creativeNonLinear);
                                tmpOptions.creativeType = playerInstance.getCreativeTypeFromStaticResources(creativeNonLinear);
                                tmpOptions.adParameters = playerInstance.getAdParametersFromLinear(creativeNonLinear);

                                if (tmpOptions.adParameters) {
                                    tmpOptions.vpaid = true;
                                }
                            }
                        } //Extract the Ad data if it is actually the Ad (!wrapper)


                        if (!playerInstance.hasVastAdTagUri(xmlResponse) && playerInstance.hasInLine(xmlResponse)) {
                            if (typeof tmpOptions.mediaFileList !== 'undefined' || typeof tmpOptions.staticResource !== 'undefined') {
                                callBack(true, tmpOptions);
                            } else {
                                callBack(false);
                            }
                        }
                    } else {
                        callBack(false);
                    }
                };
                /**
                 * Parse the VAST Tag
                 *
                 * @param vastTag
                 * @param adListId
                 */


                playerInstance.processVastWithRetries = function (vastObj) {
                    var vastTag = vastObj.vastTag;
                    var adListId = vastObj.id;

                    var handleVastResult = function handleVastResult(pass, tmpOptions) {
                        if (pass && typeof tmpOptions !== 'undefined' && tmpOptions.vpaid && !playerInstance.displayOptions.vastOptions.allowVPAID) {
                            pass = false;
                            playerInstance.announceLocalError('103', 'VPAID not allowed, so skipping this VAST tag.');
                        }

                        if (pass) {
                            // ok
                            if (tmpOptions.adType === 'linear') {
                                if (typeof tmpOptions.iconClick !== 'undefined' && tmpOptions.iconClick !== null && tmpOptions.iconClick.length) {
                                    playerInstance.adList[adListId].landingPage = tmpOptions.iconClick;
                                }

                                var selectedMediaFile = playerInstance.getSupportedMediaFileObject(tmpOptions.mediaFileList);

                                if (selectedMediaFile) {
                                    playerInstance.adList[adListId].mediaType = selectedMediaFile.mediaType;
                                }
                            }

                            playerInstance.adList[adListId].adType = tmpOptions.adType ? tmpOptions.adType : 'unknown';
                            playerInstance.adList[adListId].vastLoaded = true;
                            playerInstance.adPool[adListId] = Object.assign({}, tmpOptions);
                            var event = document.createEvent('Event');
                            event.initEvent('adId_' + adListId, false, true);
                            playerInstance.domRef.player.dispatchEvent(event);
                            playerInstance.displayOptions.vastOptions.vastAdvanced.vastLoadedCallback();

                            if (playerInstance.hasTitle()) {
                                var title = document.getElementById(playerInstance.videoPlayerId + '_title');
                                title.style.display = 'none';
                            }
                        } else {
                            // when vast failed
                            playerInstance.announceLocalError('101');

                            if (vastObj.hasOwnProperty('fallbackVastTags') && vastObj.fallbackVastTags.length > 0) {
                                vastTag = vastObj.fallbackVastTags.shift();
                                playerInstance.processUrl(vastTag, handleVastResult);
                            } else {
                                if (vastObj.roll === 'preRoll') {
                                    playerInstance.preRollFail(vastObj);
                                }

                                playerInstance.adList[adListId].error = true;
                            }
                        }
                    };

                    playerInstance.processUrl(vastTag, handleVastResult);
                };

                playerInstance.processUrl = function (vastTag, callBack) {
                    var numberOfRedirects = 0;
                    var tmpOptions = {
                        tracking: [],
                        stopTracking: [],
                        impression: [],
                        clicktracking: [],
                        vastLoaded: false
                    };
                    playerInstance.resolveVastTag(vastTag, numberOfRedirects, tmpOptions, callBack);
                };

                playerInstance.resolveVastTag = function (vastTag, numberOfRedirects, tmpOptions, callBack) {
                    if (!vastTag || vastTag === '') {
                        callBack(false);
                        return;
                    }

                    var handleXmlHttpReq = function handleXmlHttpReq() {
                        var xmlHttpReq = this;
                        var xmlResponse = false;

                        if (xmlHttpReq.readyState === 4 && xmlHttpReq.status === 404) {
                            callBack(false);
                            return;
                        }

                        if (xmlHttpReq.readyState === 4 && xmlHttpReq.status === 0) {
                            callBack(false); //Most likely that Ad Blocker exists

                            return;
                        }

                        if (!(xmlHttpReq.readyState === 4 && xmlHttpReq.status === 200)) {
                            return;
                        }

                        if (xmlHttpReq.readyState === 4 && xmlHttpReq.status !== 200) {
                            callBack(false);
                            return;
                        }

                        try {
                            xmlResponse = xmlHttpReq.responseXML;
                        } catch (e) {
                            callBack(false);
                            return;
                        }

                        if (!xmlResponse) {
                            callBack(false);
                            return;
                        }

                        playerInstance.inLineFound = playerInstance.hasInLine(xmlResponse);

                        if (!playerInstance.inLineFound && playerInstance.hasVastAdTagUri(xmlResponse)) {
                            var vastAdTagUri = playerInstance.getVastAdTagUriFromWrapper(xmlResponse);

                            if (vastAdTagUri) {
                                playerInstance.resolveVastTag(vastAdTagUri, numberOfRedirects, tmpOptions, callBack);
                            } else {
                                callBack(false);
                                return;
                            }
                        }

                        if (numberOfRedirects > playerInstance.displayOptions.vastOptions.maxAllowedVastTagRedirects && !playerInstance.inLineFound) {
                            callBack(false);
                            return;
                        }

                        playerInstance.processVastXml(xmlResponse, tmpOptions, callBack);
                    };

                    if (numberOfRedirects <= playerInstance.displayOptions.vastOptions.maxAllowedVastTagRedirects) {
                        playerInstance.sendRequest(vastTag, true, playerInstance.displayOptions.vastOptions.vastTimeout, handleXmlHttpReq);
                    }

                    numberOfRedirects++;
                };

                playerInstance.setVastList = function () {
                    var ads = {};
                    var adGroupedByRolls = {
                        preRoll: [],
                        postRoll: [],
                        midRoll: [],
                        onPauseRoll: []
                    };
                    var def = {
                        id: null,
                        roll: null,
                        played: false,
                        vastLoaded: false,
                        error: false,
                        adText: null,
                        adTextPosition: null
                    };
                    var idPart = 0;

                    var validateVastList = function validateVastList(item) {
                        var hasError = false;

                        if (item.roll === 'midRoll') {
                            if (typeof item.timer === 'undefined') {
                                hasError = true;
                            }
                        }

                        return hasError;
                    };

                    var validateRequiredParams = function validateRequiredParams(item) {
                        var hasError = false;

                        if (!item.vastTag) {
                            playerInstance.announceLocalError(102, '"vastTag" property is missing from adList.');
                            hasError = true;
                        }

                        if (!item.roll) {
                            playerInstance.announceLocalError(102, '"roll" is missing from adList.');
                            hasError = true;
                        }

                        if (playerInstance.availableRolls.indexOf(item.roll) === -1) {
                            playerInstance.announceLocalError(102, 'Only ' + playerInstance.availableRolls.join(',') + ' rolls are supported.');
                            hasError = true;
                        }

                        if (item.size && playerInstance.supportedNonLinearAd.indexOf(item.size) === -1) {
                            playerInstance.announceLocalError(102, 'Only ' + playerInstance.supportedNonLinearAd.join(',') + ' size are supported.');
                            hasError = true;
                        }

                        return hasError;
                    };

                    if (playerInstance.displayOptions.vastOptions.hasOwnProperty('adList')) {
                        for (var key in playerInstance.displayOptions.vastOptions.adList) {
                            var adItem = playerInstance.displayOptions.vastOptions.adList[key];

                            if (validateRequiredParams(adItem)) {
                                playerInstance.announceLocalError(102, 'Wrong adList parameters.');
                                continue;
                            }

                            var id = 'ID' + idPart;
                            ads[id] = Object.assign({}, def);
                            ads[id] = Object.assign(ads[id], playerInstance.displayOptions.vastOptions.adList[key]);

                            if (adItem.roll == 'midRoll') {
                                ads[id].error = validateVastList('midRoll', adItem);
                            }

                            ads[id].id = id;
                            idPart++;
                        }
                    } // group the ads by roll
                    // pushing object references and forming json


                    Object.keys(ads).map(function (e) {
                        if (ads[e].roll.toLowerCase() === 'preRoll'.toLowerCase()) {
                            adGroupedByRolls.preRoll.push(ads[e]);
                        } else if (ads[e].roll.toLowerCase() === 'midRoll'.toLowerCase()) {
                            adGroupedByRolls.midRoll.push(ads[e]);
                        } else if (ads[e].roll.toLowerCase() === 'postRoll'.toLowerCase()) {
                            adGroupedByRolls.postRoll.push(ads[e]);
                        } else if (ads[e].roll.toLowerCase() === 'onPauseRoll'.toLowerCase()) {
                            adGroupedByRolls.onPauseRoll.push(ads[e]);
                        }
                    });
                    playerInstance.adGroupedByRolls = adGroupedByRolls;
                    playerInstance.adList = ads;
                };

                playerInstance.onVastAdEnded = function (event) {
                    if (event) {
                        event.stopImmediatePropagation();
                    } //"this" is the HTML5 video tag, because it disptches the "ended" event


                    playerInstance.deleteVastAdElements();
                    playerInstance.checkForNextAd();
                };

                playerInstance.vastLogoBehaviour = function (vastPlaying) {
                    if (!playerInstance.displayOptions.layoutControls.logo.showOverAds) {
                        var logoHolder = document.getElementById(playerInstance.videoPlayerId + '_logo');
                        var logoImage = document.getElementById(playerInstance.videoPlayerId + '_logo_image');

                        if (!logoHolder || !logoImage) {
                            return;
                        }

                        logoHolder.style.display = vastPlaying ? 'none' : 'inline';
                    }
                };

                playerInstance.deleteVastAdElements = function () {
                    playerInstance.removeClickthrough();
                    playerInstance.removeSkipButton();
                    playerInstance.removeAdCountdown();
                    playerInstance.removeAdPlayingText();
                    playerInstance.removeCTAButton();
                    playerInstance.vastLogoBehaviour(false);
                };
            });
// CONCATENATED MODULE: ./src/modules/cardboard.js


            /* harmony default export */ var cardboard = (function (playerInstance, options) {
                playerInstance.createCardboardJoystickButton = function (identity) {
                    var vrJoystickPanel = document.getElementById(playerInstance.videoPlayerId + '_fluid_vr_joystick_panel');
                    var joystickButton = document.createElement('div');
                    joystickButton.id = playerInstance.videoPlayerId + '_fluid_vr_joystick_' + identity;
                    joystickButton.className = 'fluid_vr_button fluid_vr_joystick_' + identity;
                    vrJoystickPanel.appendChild(joystickButton);
                    return joystickButton;
                };

                playerInstance.cardboardRotateLeftRight = function (param
                                                                    /* 0 - right, 1 - left */
                ) {
                    var go = playerInstance.vrROTATION_POSITION;
                    var back = -playerInstance.vrROTATION_POSITION;
                    var pos = param < 1 ? go : back;
                    var easing = {
                        val: pos
                    };
                    var tween = new TWEEN.Tween(easing).to({
                        val: 0
                    }, playerInstance.vrROTATION_SPEED).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
                        playerInstance.vrViewer.OrbitControls.rotateLeft(easing.val);
                    }).start();
                };

                playerInstance.cardboardRotateUpDown = function (param
                                                                 /* 0 - down, 1- up */
                ) {
                    var go = playerInstance.vrROTATION_POSITION;
                    var back = -playerInstance.vrROTATION_POSITION;
                    var pos = param < 1 ? go : back;
                    var easing = {
                        val: pos
                    };
                    var tween = new TWEEN.Tween(easing).to({
                        val: 0
                    }, playerInstance.vrROTATION_SPEED).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
                        playerInstance.vrViewer.OrbitControls.rotateUp(easing.val);
                    }).start();
                };

                playerInstance.createCardboardJoystick = function () {
                    var vrContainer = document.getElementById(playerInstance.videoPlayerId + '_fluid_vr_container'); // Create a JoyStick and append to VR container

                    var vrJoystickPanel = document.createElement('div');
                    vrJoystickPanel.id = playerInstance.videoPlayerId + '_fluid_vr_joystick_panel';
                    vrJoystickPanel.className = 'fluid_vr_joystick_panel';
                    vrContainer.appendChild(vrJoystickPanel); // Create Joystick buttons

                    var upButton = playerInstance.createCardboardJoystickButton('up');
                    var leftButton = playerInstance.createCardboardJoystickButton('left');
                    var rightButton = playerInstance.createCardboardJoystickButton('right');
                    var downButton = playerInstance.createCardboardJoystickButton('down');
                    var zoomDefaultButton = playerInstance.createCardboardJoystickButton('zoomdefault');
                    var zoomInButton = playerInstance.createCardboardJoystickButton('zoomin');
                    var zoomOutButton = playerInstance.createCardboardJoystickButton('zoomout'); // Camera movement buttons

                    upButton.addEventListener('click', function () {
                        //player.vrViewer.OrbitControls.rotateUp(-0.1);
                        playerInstance.cardboardRotateUpDown(1);
                    });
                    downButton.addEventListener('click', function () {
                        //player.vrViewer.OrbitControls.rotateUp(0.1);
                        playerInstance.cardboardRotateUpDown(0);
                    });
                    rightButton.addEventListener('click', function () {
                        //player.vrViewer.OrbitControls.rotateLeft(0.1);
                        playerInstance.cardboardRotateLeftRight(0);
                    });
                    leftButton.addEventListener('click', function () {
                        //player.vrViewer.OrbitControls.rotateLeft(-0.1);
                        playerInstance.cardboardRotateLeftRight(1);
                    });
                    zoomDefaultButton.addEventListener('click', function () {
                        playerInstance.vrViewer.camera.fov = 60;
                        playerInstance.vrViewer.camera.updateProjectionMatrix();
                    }); // Camera Zoom buttons

                    zoomOutButton.addEventListener('click', function () {
                        playerInstance.vrViewer.camera.fov *= 1.1;
                        playerInstance.vrViewer.camera.updateProjectionMatrix();
                    });
                    zoomInButton.addEventListener('click', function () {
                        playerInstance.vrViewer.camera.fov *= 0.9;
                        playerInstance.vrViewer.camera.updateProjectionMatrix();
                    });
                };

                playerInstance.cardBoardResize = function () {
                    playerInstance.domRef.player.addEventListener('theatreModeOn', function () {
                        playerInstance.vrViewer.onWindowResize();
                    });
                    playerInstance.domRef.player.addEventListener('theatreModeOff', function () {
                        playerInstance.vrViewer.onWindowResize();
                    });
                };

                playerInstance.cardBoardSwitchToNormal = function () {
                    var vrJoystickPanel = document.getElementById(playerInstance.videoPlayerId + '_fluid_vr_joystick_panel');
                    var controlBar = document.getElementById(playerInstance.videoPlayerId + '_fluid_controls_container');
                    var videoPlayerTag = playerInstance.domRef.player;
                    playerInstance.vrViewer.enableEffect(PANOLENS.MODES.NORMAL);
                    playerInstance.vrViewer.onWindowResize();
                    playerInstance.vrMode = false; // remove dual control bar

                    var newControlBar = videoPlayerTag.parentNode.getElementsByClassName('fluid_vr2_controls_container')[0];
                    videoPlayerTag.parentNode.removeChild(newControlBar);

                    if (playerInstance.displayOptions.layoutControls.showCardBoardJoystick && vrJoystickPanel) {
                        vrJoystickPanel.style.display = "block";
                    }

                    controlBar.classList.remove("fluid_vr_controls_container"); // show volume control bar

                    var volumeContainer = document.getElementById(playerInstance.videoPlayerId + '_fluid_control_volume_container');
                    volumeContainer.style.display = "block"; // show all ads overlays if any

                    var adCountDownTimerText = document.getElementById('ad_countdown' + playerInstance.videoPlayerId);
                    var ctaButton = document.getElementById(playerInstance.videoPlayerId + '_fluid_cta');
                    var addAdPlayingTextOverlay = document.getElementById(playerInstance.videoPlayerId + '_fluid_ad_playing');
                    var skipBtn = document.getElementById('skip_button_' + playerInstance.videoPlayerId);

                    if (adCountDownTimerText) {
                        adCountDownTimerText.style.display = 'block';
                    }

                    if (ctaButton) {
                        ctaButton.style.display = 'block';
                    }

                    if (addAdPlayingTextOverlay) {
                        addAdPlayingTextOverlay.style.display = 'block';
                    }

                    if (skipBtn) {
                        skipBtn.style.display = 'block';
                    }
                };

                playerInstance.cardBoardHideDefaultControls = function () {
                    var vrJoystickPanel = document.getElementById(playerInstance.videoPlayerId + '_fluid_vr_joystick_panel');
                    var initialPlay = document.getElementById(playerInstance.videoPlayerId + '_fluid_initial_play');
                    var volumeContainer = document.getElementById(playerInstance.videoPlayerId + '_fluid_control_volume_container'); // hide the joystick in VR mode

                    if (playerInstance.displayOptions.layoutControls.showCardBoardJoystick && vrJoystickPanel) {
                        vrJoystickPanel.style.display = "none";
                    } // hide big play icon


                    if (initialPlay) {
                        document.getElementById(playerInstance.videoPlayerId + '_fluid_initial_play').style.display = "none";
                        document.getElementById(playerInstance.videoPlayerId + '_fluid_initial_play_button').style.opacity = "1";
                    } // hide volume control bar


                    volumeContainer.style.display = "none";
                };

                playerInstance.cardBoardCreateVRControls = function () {
                    var controlBar = document.getElementById(playerInstance.videoPlayerId + '_fluid_controls_container'); // create and append dual control bar

                    var newControlBar = controlBar.cloneNode(true);
                    newControlBar.removeAttribute('id');
                    newControlBar.querySelectorAll('*').forEach(function (node) {
                        node.removeAttribute('id');
                    });
                    newControlBar.classList.add("fluid_vr2_controls_container");
                    playerInstance.domRef.player.parentNode.insertBefore(newControlBar, playerInstance.domRef.player.nextSibling);
                    playerInstance.copyEvents(newControlBar);
                };

                playerInstance.cardBoardSwitchToVR = function () {
                    var controlBar = document.getElementById(playerInstance.videoPlayerId + '_fluid_controls_container');
                    playerInstance.vrViewer.enableEffect(PANOLENS.MODES.CARDBOARD);
                    playerInstance.vrViewer.onWindowResize();
                    playerInstance.vrViewer.disableReticleControl();
                    playerInstance.vrMode = true;
                    controlBar.classList.add("fluid_vr_controls_container");
                    playerInstance.cardBoardHideDefaultControls();
                    playerInstance.cardBoardCreateVRControls(); // hide all ads overlays

                    var adCountDownTimerText = document.getElementById('ad_countdown' + playerInstance.videoPlayerId);
                    var ctaButton = document.getElementById(playerInstance.videoPlayerId + '_fluid_cta');
                    var addAdPlayingTextOverlay = document.getElementById(playerInstance.videoPlayerId + '_fluid_ad_playing');
                    var skipBtn = document.getElementById('skip_button_' + playerInstance.videoPlayerId);

                    if (adCountDownTimerText) {
                        adCountDownTimerText.style.display = 'none';
                    }

                    if (ctaButton) {
                        ctaButton.style.display = 'none';
                    }

                    if (addAdPlayingTextOverlay) {
                        addAdPlayingTextOverlay.style.display = 'none';
                    }

                    if (skipBtn) {
                        skipBtn.style.display = 'none';
                    }
                };

                playerInstance.cardBoardMoveTimeInfo = function () {
                    var timePlaceholder = document.getElementById(playerInstance.videoPlayerId + '_fluid_control_duration');
                    var controlBar = document.getElementById(playerInstance.videoPlayerId + '_fluid_controls_container');
                    timePlaceholder.classList.add("cardboard_time");
                    controlBar.appendChild(timePlaceholder); // override the time display function for this instance

                    playerInstance.controlDurationUpdate = function () {
                        var currentPlayTime = playerInstance.formatTime(playerInstance.domRef.player.currentTime);
                        var totalTime = playerInstance.formatTime(playerInstance.currentVideoDuration);
                        var timePlaceholder = playerInstance.domRef.player.parentNode.getElementsByClassName('fluid_control_duration');
                        var durationText = '';

                        if (playerInstance.isCurrentlyPlayingAd) {
                            durationText = "<span class='ad_timer_prefix'>AD : </span>" + currentPlayTime + ' / ' + totalTime;

                            for (var i = 0; i < timePlaceholder.length; i++) {
                                timePlaceholder[i].classList.add("ad_timer_prefix");
                            }
                        } else {
                            durationText = currentPlayTime + ' / ' + totalTime;

                            for (var _i = 0; _i < timePlaceholder.length; _i++) {
                                timePlaceholder[_i].classList.remove("ad_timer_prefix");
                            }
                        }

                        for (var _i2 = 0; _i2 < timePlaceholder.length; _i2++) {
                            timePlaceholder[_i2].innerHTML = durationText;
                        }
                    };
                };

                playerInstance.cardBoardAlterDefaultControls = function () {
                    playerInstance.cardBoardMoveTimeInfo();
                };

                playerInstance.createCardboardView = function () {
                    // Create a container for 360degree
                    var vrContainer = document.createElement('div');
                    vrContainer.id = playerInstance.videoPlayerId + '_fluid_vr_container';
                    vrContainer.className = 'fluid_vr_container';
                    playerInstance.domRef.player.parentNode.insertBefore(vrContainer, playerInstance.domRef.player.nextSibling); // OverRide some conflicting functions from panolens

                    PANOLENS.VideoPanorama.prototype.pauseVideo = function () {};

                    PANOLENS.VideoPanorama.prototype.playVideo = function () {};

                    playerInstance.vrPanorama = new PANOLENS.VideoPanorama('', {
                        videoElement: playerInstance.domRef.player,
                        autoplay: playerInstance.displayOptions.layoutControls.autoPlay,
                        loop: !!playerInstance.displayOptions.layoutControls.loop
                    });
                    playerInstance.vrViewer = new PANOLENS.Viewer({
                        container: vrContainer,
                        controlBar: true,
                        controlButtons: [],
                        enableReticle: false
                    });
                    playerInstance.vrViewer.add(playerInstance.vrPanorama);
                    playerInstance.vrViewer.enableEffect(PANOLENS.MODES.NORMAL);
                    playerInstance.vrViewer.onWindowResize(); // if Mobile device then enable controls using gyroscope

                    if (playerInstance.getMobileOs().userOs === 'Android' || playerInstance.getMobileOs().userOs === 'iOS') {
                        playerInstance.vrViewer.enableControl(1);
                    } // Make Changes for default skin


                    playerInstance.cardBoardAlterDefaultControls(); // resize on toggle theater mode

                    playerInstance.cardBoardResize(); // Store initial camera position

                    playerInstance.vrViewer.initialCameraPosition = JSON.parse(JSON.stringify(playerInstance.vrViewer.camera.position));

                    if (playerInstance.displayOptions.layoutControls.showCardBoardJoystick) {
                        if (!(playerInstance.getMobileOs().userOs === 'Android' || playerInstance.getMobileOs().userOs === 'iOS')) {
                            playerInstance.createCardboardJoystick();
                        } // Disable zoom if showing joystick


                        playerInstance.vrViewer.OrbitControls.noZoom = true;
                    }

                    playerInstance.trackEvent(playerInstance.domRef.player.parentNode, 'click', '.fluid_control_cardboard', function () {
                        if (playerInstance.vrMode) {
                            playerInstance.cardBoardSwitchToNormal();
                        } else {
                            playerInstance.cardBoardSwitchToVR();
                        }
                    });
                };

                playerInstance.createCardboard = function () {
                    if (!playerInstance.displayOptions.layoutControls.showCardBoardView) {
                        return;
                    }

                    document.getElementById(playerInstance.videoPlayerId + '_fluid_control_cardboard').style.display = 'inline-block';

                    if (!window.PANOLENS) {
                        __webpack_require__.e(/* import() | panolens */ 4).then(__webpack_require__.bind(null, 267)).then(function (it) {
                            window.PANOLENS = it;
                            playerInstance.createCardboardView();
                        });
                    } else {
                        playerInstance.createCardboardView();
                    }
                };
            });
// CONCATENATED MODULE: ./src/modules/subtitles.js


            /* harmony default export */ var subtitles = (function (playerInstance, options) {
                playerInstance.subtitleFetchParse = function (subtitleItem) {
                    playerInstance.sendRequest(subtitleItem.url, true, playerInstance.displayOptions.vastOptions.vastTimeout, function () {
                        var convertVttRawData = function convertVttRawData(vttRawData) {
                            if (!(typeof vttRawData.cues !== 'undefined' && vttRawData.cues.length)) {
                                return [];
                            }

                            var result = [];

                            for (var i = 0; i < vttRawData.cues.length; i++) {
                                var tempThumbnailData = vttRawData.cues[i].text.split('#');
                                result.push({
                                    startTime: vttRawData.cues[i].startTime,
                                    endTime: vttRawData.cues[i].endTime,
                                    text: vttRawData.cues[i].text,
                                    cue: vttRawData.cues[i]
                                });
                            }

                            return result;
                        };

                        var xmlHttpReq = this;

                        if (xmlHttpReq.readyState === 4 && xmlHttpReq.status !== 200) {
                            //The response returned an error.
                            return;
                        }

                        if (!(xmlHttpReq.readyState === 4 && xmlHttpReq.status === 200)) {
                            return;
                        }

                        var textResponse = xmlHttpReq.responseText;
                        var parser = new WebVTT.Parser(window, WebVTT.StringDecoder());
                        var cues = [];
                        var regions = []; // TODO: unused?

                        parser.oncue = function (cue) {
                            cues.push(cue);
                        };

                        parser.onregion = function (region) {
                            regions.push(region);
                        };

                        parser.parse(textResponse);
                        parser.flush();
                        playerInstance.subtitlesData = cues;
                    });
                };

                playerInstance.createSubtitlesSwitch = function () {
                    var subtitlesOff = 'OFF';
                    playerInstance.subtitlesData = [];

                    if (!playerInstance.displayOptions.layoutControls.subtitlesEnabled) {
                        // No other video subtitles
                        document.getElementById(playerInstance.videoPlayerId + '_fluid_control_subtitles').style.display = 'none';
                        return;
                    }

                    var tracks = [];
                    tracks.push({
                        'label': subtitlesOff,
                        'url': 'na',
                        'lang': subtitlesOff
                    });
                    var tracksList = playerInstance.domRef.player.querySelectorAll('track');
                    [].forEach.call(tracksList, function (track) {
                        if (track.kind === 'metadata' && track.src) {
                            tracks.push({
                                'label': track.label,
                                'url': track.src,
                                'lang': track.srclang
                            });
                        }
                    });
                    playerInstance.subtitlesTracks = tracks;
                    var subtitlesChangeButton = document.getElementById(playerInstance.videoPlayerId + '_fluid_control_subtitles');
                    subtitlesChangeButton.style.display = 'inline-block';
                    var appendSubtitleChange = false;
                    var subtitlesChangeList = document.createElement('div');
                    subtitlesChangeList.id = playerInstance.videoPlayerId + '_fluid_control_subtitles_list';
                    subtitlesChangeList.className = 'fluid_subtitles_list';
                    subtitlesChangeList.style.display = 'none';
                    var firstSubtitle = true;
                    playerInstance.subtitlesTracks.forEach(function (subtitle) {
                        var subtitleSelected = firstSubtitle ? "subtitle_selected" : "";
                        firstSubtitle = false;
                        var subtitlesChangeDiv = document.createElement('div');
                        subtitlesChangeDiv.id = 'subtitle_' + playerInstance.videoPlayerId + '_' + subtitle.label;
                        subtitlesChangeDiv.className = 'fluid_subtitle_list_item';
                        subtitlesChangeDiv.innerHTML = '<span class="subtitle_button_icon ' + subtitleSelected + '"></span>' + subtitle.label;
                        subtitlesChangeDiv.addEventListener('click', function (event) {
                            event.stopPropagation();
                            var subtitleChangedTo = this;
                            var subtitleIcons = document.getElementsByClassName('subtitle_button_icon');

                            for (var i = 0; i < subtitleIcons.length; i++) {
                                subtitleIcons[i].className = subtitleIcons[i].className.replace("subtitle_selected", "");
                            }

                            subtitleChangedTo.firstChild.className += ' subtitle_selected';
                            playerInstance.subtitlesTracks.forEach(function (subtitle) {
                                if (subtitle.label === subtitleChangedTo.innerText.replace(/(\r\n\t|\n|\r\t)/gm, "")) {
                                    if (subtitle.label === subtitlesOff) {
                                        playerInstance.subtitlesData = [];
                                    } else {
                                        playerInstance.subtitleFetchParse(subtitle);
                                    }
                                }
                            });
                            playerInstance.openCloseSubtitlesSwitch();
                        });
                        subtitlesChangeList.appendChild(subtitlesChangeDiv);
                        appendSubtitleChange = true;
                    });

                    if (appendSubtitleChange) {
                        subtitlesChangeButton.appendChild(subtitlesChangeList);
                        subtitlesChangeButton.addEventListener('click', function () {
                            playerInstance.openCloseSubtitlesSwitch();
                        });
                    } else {
                        // Didn't give any subtitle options
                        document.getElementById(playerInstance.videoPlayerId + '_fluid_control_subtitles').style.display = 'none';
                    } //attach subtitles to show based on time
                    //this function is for rendering of subtitles when content is playing


                    var videoPlayerSubtitlesUpdate = function videoPlayerSubtitlesUpdate() {
                        playerInstance.renderSubtitles();
                    };

                    playerInstance.domRef.player.addEventListener('timeupdate', videoPlayerSubtitlesUpdate);
                };

                playerInstance.renderSubtitles = function () {
                    var videoPlayer = playerInstance.domRef.player; //if content is playing then no subtitles

                    var currentTime = Math.floor(videoPlayer.currentTime);
                    var subtitlesAvailable = false;
                    var subtitlesContainer = document.getElementById(playerInstance.videoPlayerId + '_fluid_subtitles_container');

                    if (playerInstance.isCurrentlyPlayingAd) {
                        subtitlesContainer.innerHTML = '';
                        return;
                    }

                    for (var i = 0; i < playerInstance.subtitlesData.length; i++) {
                        if (currentTime >= playerInstance.subtitlesData[i].startTime && currentTime <= playerInstance.subtitlesData[i].endTime) {
                            subtitlesContainer.innerHTML = '';
                            subtitlesContainer.appendChild(WebVTT.convertCueToDOMTree(window, playerInstance.subtitlesData[i].text));
                            subtitlesAvailable = true;
                        }
                    }

                    if (!subtitlesAvailable) {
                        subtitlesContainer.innerHTML = '';
                    }
                };

                playerInstance.openCloseSubtitlesSwitch = function () {
                    var subtitleChangeList = document.getElementById(playerInstance.videoPlayerId + '_fluid_control_subtitles_list');

                    if (playerInstance.isCurrentlyPlayingAd) {
                        subtitleChangeList.style.display = 'none';
                        return;
                    }

                    if (subtitleChangeList.style.display === 'none') {
                        subtitleChangeList.style.display = 'block';

                        var mouseOut = function mouseOut(event) {
                            subtitleChangeList.removeEventListener('mouseleave', mouseOut);
                            subtitleChangeList.style.display = 'none';
                        };

                        subtitleChangeList.addEventListener('mouseleave', mouseOut);
                    } else {
                        subtitleChangeList.style.display = 'none';
                    }
                };

                playerInstance.createSubtitles = function () {
                    var divSubtitlesContainer = document.createElement('div');
                    divSubtitlesContainer.id = playerInstance.videoPlayerId + '_fluid_subtitles_container';
                    divSubtitlesContainer.className = 'fluid_subtitles_container';
                    playerInstance.domRef.player.parentNode.insertBefore(divSubtitlesContainer, playerInstance.domRef.player.nextSibling);

                    if (!playerInstance.displayOptions.layoutControls.subtitlesEnabled) {
                        return;
                    }

                    Promise.all(/* import() | vttjs */[__webpack_require__.e(5), __webpack_require__.e(6)]).then(__webpack_require__.t.bind(null, 268, 7)).then(function (it) {
                        window.WebVTT = it.WebVTT;
                        playerInstance.createSubtitlesSwitch();
                    });
                };
            });
// CONCATENATED MODULE: ./src/modules/timeline.js


            function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

            /* harmony default export */ var timeline = (function (playerInstance, options) {
                playerInstance.setupThumbnailPreviewVtt = function () {
                    playerInstance.sendRequest(playerInstance.displayOptions.layoutControls.timelinePreview.file, true, playerInstance.displayOptions.vastOptions.vastTimeout, function () {
                        var convertVttRawData = function convertVttRawData(vttRawData) {
                            if (!(typeof vttRawData.cues !== 'undefined' && vttRawData.cues.length)) {
                                return [];
                            }

                            var result = [];
                            var tempThumbnailData = null;
                            var tempThumbnailCoordinates = null;

                            for (var i = 0; i < vttRawData.cues.length; i++) {
                                tempThumbnailData = vttRawData.cues[i].text.split('#');
                                var xCoords = 0,
                                    yCoords = 0,
                                    wCoords = 122.5,
                                    hCoords = 69; // .vtt file contains sprite corrdinates

                                if (tempThumbnailData.length === 2 && tempThumbnailData[1].indexOf('xywh=') === 0) {
                                    tempThumbnailCoordinates = tempThumbnailData[1].substring(5);
                                    tempThumbnailCoordinates = tempThumbnailCoordinates.split(',');

                                    if (tempThumbnailCoordinates.length === 4) {
                                        playerInstance.displayOptions.layoutControls.timelinePreview.spriteImage = true;
                                        xCoords = parseInt(tempThumbnailCoordinates[0]);
                                        yCoords = parseInt(tempThumbnailCoordinates[1]);
                                        wCoords = parseInt(tempThumbnailCoordinates[2]);
                                        hCoords = parseInt(tempThumbnailCoordinates[3]);
                                    }
                                }

                                var imageUrl = void 0;

                                if (playerInstance.displayOptions.layoutControls.timelinePreview.spriteRelativePath && playerInstance.displayOptions.layoutControls.timelinePreview.file.indexOf('/') !== -1 && (typeof playerInstance.displayOptions.layoutControls.timelinePreview.sprite === 'undefined' || playerInstance.displayOptions.layoutControls.timelinePreview.sprite === '')) {
                                    imageUrl = playerInstance.displayOptions.layoutControls.timelinePreview.file.substring(0, playerInstance.displayOptions.layoutControls.timelinePreview.file.lastIndexOf('/'));
                                    imageUrl += '/' + tempThumbnailData[0];
                                } else {
                                    imageUrl = playerInstance.displayOptions.layoutControls.timelinePreview.sprite ? playerInstance.displayOptions.layoutControls.timelinePreview.sprite : tempThumbnailData[0];
                                }

                                result.push({
                                    startTime: vttRawData.cues[i].startTime,
                                    endTime: vttRawData.cues[i].endTime,
                                    image: imageUrl,
                                    x: xCoords,
                                    y: yCoords,
                                    w: wCoords,
                                    h: hCoords
                                });
                            }

                            return result;
                        };

                        var xmlHttpReq = this;

                        if (xmlHttpReq.readyState === 4 && xmlHttpReq.status !== 200) {
                            //The response returned an error.
                            return;
                        }

                        if (!(xmlHttpReq.readyState === 4 && xmlHttpReq.status === 200)) {
                            return;
                        }

                        var textResponse = xmlHttpReq.responseText;
                        var webVttParser = new window.WebVTTParser();
                        var vttRawData = webVttParser.parse(textResponse);
                        playerInstance.timelinePreviewData = convertVttRawData(vttRawData);
                    });
                };

                playerInstance.generateTimelinePreviewTags = function () {
                    var progressContainer = document.getElementById(playerInstance.videoPlayerId + '_fluid_controls_progress_container');
                    var previewContainer = document.createElement('div');
                    previewContainer.id = playerInstance.videoPlayerId + '_fluid_timeline_preview_container';
                    previewContainer.className = 'fluid_timeline_preview_container';
                    previewContainer.style.display = 'none';
                    previewContainer.style.position = 'absolute';
                    progressContainer.appendChild(previewContainer); //Shadow is needed to not trigger mouseleave event, that stops showing thumbnails, in case one scrubs a bit too fast and leaves current thumb before new one drawn.

                    var previewContainerShadow = document.createElement('div');
                    previewContainerShadow.id = playerInstance.videoPlayerId + '_fluid_timeline_preview_container_shadow';
                    previewContainerShadow.className = 'fluid_timeline_preview_container_shadow';
                    previewContainerShadow.style.position = 'absolute';
                    previewContainerShadow.style.display = 'none';
                    previewContainerShadow.style.opacity = 1;
                    progressContainer.appendChild(previewContainerShadow);
                };

                playerInstance.getThumbnailCoordinates = function (second) {
                    if (playerInstance.timelinePreviewData.length) {
                        for (var i = 0; i < playerInstance.timelinePreviewData.length; i++) {
                            if (second >= playerInstance.timelinePreviewData[i].startTime && second <= playerInstance.timelinePreviewData[i].endTime) {
                                return playerInstance.timelinePreviewData[i];
                            }
                        }
                    }

                    return false;
                };

                playerInstance.drawTimelinePreview = function (event) {
                    var timelinePreviewTag = document.getElementById(playerInstance.videoPlayerId + '_fluid_timeline_preview_container');
                    var timelinePreviewShadow = document.getElementById(playerInstance.videoPlayerId + '_fluid_timeline_preview_container_shadow');
                    var progressContainer = document.getElementById(playerInstance.videoPlayerId + '_fluid_controls_progress_container');
                    var totalWidth = progressContainer.clientWidth;

                    if (playerInstance.isCurrentlyPlayingAd) {
                        if (timelinePreviewTag.style.display !== 'none') {
                            timelinePreviewTag.style.display = 'none';
                        }

                        return;
                    } //get the hover position


                    var hoverX = playerInstance.getEventOffsetX(event, progressContainer);
                    var hoverSecond = null;

                    if (totalWidth) {
                        hoverSecond = playerInstance.currentVideoDuration * hoverX / totalWidth; //get the corresponding thumbnail coordinates

                        var thumbnailCoordinates = playerInstance.getThumbnailCoordinates(hoverSecond);
                        timelinePreviewShadow.style.width = totalWidth + 'px';
                        timelinePreviewShadow.style.display = 'block';

                        if (thumbnailCoordinates !== false) {
                            timelinePreviewTag.style.width = thumbnailCoordinates.w + 'px';
                            timelinePreviewTag.style.height = thumbnailCoordinates.h + 'px';
                            timelinePreviewShadow.style.height = thumbnailCoordinates.h + 'px';
                            timelinePreviewTag.style.background = 'url(' + thumbnailCoordinates.image + ') no-repeat scroll -' + thumbnailCoordinates.x + 'px -' + thumbnailCoordinates.y + 'px';
                            timelinePreviewTag.style.left = hoverX - thumbnailCoordinates.w / 2 + 'px';
                            timelinePreviewTag.style.display = 'block';

                            if (!playerInstance.displayOptions.layoutControls.timelinePreview.spriteImage) {
                                timelinePreviewTag.style.backgroundSize = 'contain';
                            }
                        } else {
                            timelinePreviewTag.style.display = 'none';
                        }
                    }
                };

                playerInstance.setupThumbnailPreview = function () {
                    var timelinePreview = playerInstance.displayOptions.layoutControls.timelinePreview;

                    if (!timelinePreview || !timelinePreview.type) {
                        return;
                    }

                    var eventOn = 'mousemove';
                    var eventOff = 'mouseleave';

                    if (playerInstance.mobileInfo.userOs) {
                        eventOn = 'touchmove';
                        eventOff = 'touchend';
                    }

                    document.getElementById(playerInstance.videoPlayerId + '_fluid_controls_progress_container').addEventListener(eventOn, playerInstance.drawTimelinePreview.bind(playerInstance), false);
                    document.getElementById(playerInstance.videoPlayerId + '_fluid_controls_progress_container').addEventListener(eventOff, function (event) {
                        var progress = document.getElementById(playerInstance.videoPlayerId + '_fluid_controls_progress_container');

                        if (typeof event.clientX !== 'undefined' && progress.contains(document.elementFromPoint(event.clientX, event.clientY))) {
                            //False positive (Chrome bug when fast click causes leave event)
                            return;
                        }

                        document.getElementById(playerInstance.videoPlayerId + '_fluid_timeline_preview_container').style.display = 'none';
                        document.getElementById(playerInstance.videoPlayerId + '_fluid_timeline_preview_container_shadow').style.display = 'none';
                    }, false);
                    playerInstance.generateTimelinePreviewTags();

                    if ('VTT' === timelinePreview.type && typeof timelinePreview.file === 'string') {
                        __webpack_require__.e(/* import() | webvtt */ 7).then(__webpack_require__.bind(null, 269)).then(function (it) {
                            window.WebVTTParser = it.default;
                            playerInstance.setupThumbnailPreviewVtt();
                        });
                    } else if ('static' === timelinePreview.type && _typeof(timelinePreview.frames) === 'object') {
                        timelinePreview.spriteImage = true;
                        playerInstance.timelinePreviewData = timelinePreview.frames;
                    } else {
                        throw 'Invalid thumbnail-preview - type must be VTT or static';
                    }

                    playerInstance.showTimeOnHover = false;
                };
            });
// CONCATENATED MODULE: ./src/modules/adsupport.js


            /* harmony default export */ var adsupport = (function (playerInstance, options) {
                var VPAID_VERSION = '2.0';

                playerInstance.renderLinearAd = function (adListId, backupTheVideoTime) {
                    playerInstance.toggleLoader(true); //get the proper ad

                    playerInstance.vastOptions = playerInstance.adPool[adListId];

                    if (backupTheVideoTime) {
                        playerInstance.backupMainVideoContentTime(adListId);
                    }

                    var playVideoPlayer = function playVideoPlayer(adListId) {
                        playerInstance.switchPlayerToVpaidMode = function (adListId) {
                            playerInstance.debugMessage('starting function switchPlayerToVpaidMode');
                            var vpaidIframe = playerInstance.videoPlayerId + "_" + adListId + "_fluid_vpaid_iframe";
                            var creativeData = {};
                            creativeData.AdParameters = playerInstance.adPool[adListId].adParameters;
                            var slotElement = document.createElement('div');
                            slotElement.id = playerInstance.videoPlayerId + "_fluid_vpaid_slot";
                            slotElement.className = 'fluid_vpaid_slot';
                            slotElement.setAttribute('adListId', adListId);
                            playerInstance.domRef.player.parentNode.insertBefore(slotElement, vpaidIframe.nextSibling);
                            var environmentVars = {
                                slot: slotElement,
                                videoSlot: playerInstance.domRef.player,
                                videoSlotCanAutoPlay: true
                            }; // calls this functions after ad unit is loaded in iframe

                            var ver = playerInstance.vpaidAdUnit.handshakeVersion(VPAID_VERSION);
                            var compare = playerInstance.compareVersion(VPAID_VERSION, ver);

                            if (compare === 1) {
                                //VPAID version of ad is lower than we need
                                playerInstance.adList[adListId].error = true;
                                playerInstance.playMainVideoWhenVpaidFails(403);
                                return false;
                            }

                            if (playerInstance.vastOptions.skipoffset !== false) {
                                playerInstance.addSkipButton();
                            }

                            playerInstance.domRef.player.loop = false;
                            playerInstance.domRef.player.removeAttribute('controls'); //Remove the default Controls

                            playerInstance.vpaidCallbackListenersAttach();
                            var mode = playerInstance.fullscreenMode ? 'fullscreen' : 'normal';
                            var adWidth = playerInstance.domRef.player.offsetWidth;
                            var adHeight = playerInstance.domRef.player.offsetHeight;
                            playerInstance.vpaidAdUnit.initAd(adWidth, adHeight, mode, 3000, creativeData, environmentVars);
                            var progressbarContainer = playerInstance.domRef.player.parentNode.getElementsByClassName('fluid_controls_currentprogress');

                            for (var i = 0; i < progressbarContainer.length; i++) {
                                progressbarContainer[i].style.backgroundColor = playerInstance.displayOptions.layoutControls.adProgressColor;
                            }

                            playerInstance.toggleLoader(false);
                            playerInstance.adList[adListId].played = true;
                            playerInstance.adFinished = false;
                        };

                        playerInstance.switchPlayerToVastMode = function () {
                            //Get the actual duration from the video file if it is not present in the VAST XML
                            if (!playerInstance.vastOptions.duration) {
                                playerInstance.vastOptions.duration = playerInstance.domRef.player.duration;
                            }

                            if (playerInstance.displayOptions.layoutControls.showCardBoardView) {
                                if (!playerInstance.adList[adListId].landingPage) {
                                    playerInstance.addCTAButton(playerInstance.adPool[adListId].clickthroughUrl);
                                } else {
                                    playerInstance.addCTAButton(playerInstance.adList[adListId].landingPage);
                                }
                            } else {
                                var addClickthroughLayer = typeof playerInstance.adList[adListId].adClickable != "undefined" ? playerInstance.adList[adListId].adClickable : playerInstance.displayOptions.vastOptions.adClickable;

                                if (addClickthroughLayer) {
                                    playerInstance.addClickthroughLayer(playerInstance.videoPlayerId);
                                }

                                playerInstance.addCTAButton(playerInstance.adList[adListId].landingPage);
                            }

                            if (playerInstance.vastOptions.skipoffset !== false) {
                                playerInstance.addSkipButton();
                            }

                            playerInstance.domRef.player.loop = false;
                            playerInstance.addAdCountdown();
                            playerInstance.domRef.player.removeAttribute('controls'); //Remove the default Controls

                            playerInstance.vastLogoBehaviour(true);
                            var progressbarContainer = playerInstance.domRef.player.parentNode.getElementsByClassName('fluid_controls_currentprogress');

                            for (var i = 0; i < progressbarContainer.length; i++) {
                                progressbarContainer[i].style.backgroundColor = playerInstance.displayOptions.layoutControls.adProgressColor;
                            }

                            if (playerInstance.displayOptions.vastOptions.adText || playerInstance.adList[adListId].adText) {
                                var adTextToShow = playerInstance.adList[adListId].adText !== null ? playerInstance.adList[adListId].adText : playerInstance.displayOptions.vastOptions.adText;
                                playerInstance.addAdPlayingText(adTextToShow);
                            }

                            playerInstance.positionTextElements(playerInstance.adList[adListId]);
                            playerInstance.toggleLoader(false);
                            playerInstance.adList[adListId].played = true;
                            playerInstance.adFinished = false;
                            playerInstance.domRef.player.play(); //Announce the impressions

                            playerInstance.trackSingleEvent('impression');
                            playerInstance.domRef.player.removeEventListener('loadedmetadata', playerInstance.switchPlayerToVastMode); // if in vr mode then do not show

                            if (playerInstance.vrMode) {
                                var adCountDownTimerText = document.getElementById('ad_countdown' + playerInstance.videoPlayerId);
                                var ctaButton = document.getElementById(playerInstance.videoPlayerId + '_fluid_cta');
                                var addAdPlayingTextOverlay = document.getElementById(playerInstance.videoPlayerId + '_fluid_ad_playing');
                                var skipBtn = document.getElementById('skip_button_' + playerInstance.videoPlayerId);

                                if (adCountDownTimerText) {
                                    adCountDownTimerText.style.display = 'none';
                                }

                                if (ctaButton) {
                                    ctaButton.style.display = 'none';
                                }

                                if (addAdPlayingTextOverlay) {
                                    addAdPlayingTextOverlay.style.display = 'none';
                                }

                                if (skipBtn) {
                                    skipBtn.style.display = 'none';
                                }
                            }
                        };

                        playerInstance.domRef.player.pause(); // Remove the streaming objects to prevent errors on the VAST content

                        playerInstance.detachStreamers(); //Try to load multiple

                        var selectedMediaFile = playerInstance.getSupportedMediaFileObject(playerInstance.vastOptions.mediaFileList); // if player in cardboard mode then, linear ads media type should be a '360' video

                        if (playerInstance.displayOptions.layoutControls.showCardBoardView && playerInstance.adList[adListId].mediaType !== '360') {
                            playerInstance.adList[adListId].error = true;
                            playerInstance.playMainVideoWhenVastFails(403);
                            return false;
                        }

                        var isVpaid = playerInstance.vastOptions.vpaid;

                        if (!isVpaid) {
                            if (selectedMediaFile.src === false) {
                                // Couldn’t find MediaFile that is supported by this video player, based on the attributes of the MediaFile element.
                                playerInstance.adList[adListId].error = true;
                                playerInstance.playMainVideoWhenVastFails(403);
                                return false;
                            }

                            playerInstance.domRef.player.addEventListener('loadedmetadata', playerInstance.switchPlayerToVastMode);
                            playerInstance.domRef.player.src = selectedMediaFile.src;
                            playerInstance.isCurrentlyPlayingAd = true;

                            if (playerInstance.displayOptions.vastOptions.showProgressbarMarkers) {
                                playerInstance.hideAdMarkers();
                            }

                            playerInstance.domRef.player.load(); //Handle the ending of the Pre-Roll ad

                            playerInstance.domRef.player.addEventListener('ended', playerInstance.onVastAdEnded);
                        } else {
                            playerInstance.loadVpaid(adListId, selectedMediaFile.src);

                            if (playerInstance.displayOptions.vastOptions.showProgressbarMarkers) {
                                playerInstance.hideAdMarkers();
                            }
                        }
                    };
                    /**
                     * Sends requests to the tracking URIs
                     */


                    var videoPlayerTimeUpdate = function videoPlayerTimeUpdate() {
                        if (playerInstance.adFinished) {
                            playerInstance.domRef.player.removeEventListener('timeupdate', videoPlayerTimeUpdate);
                            return;
                        }

                        var currentTime = Math.floor(playerInstance.domRef.player.currentTime);

                        if (playerInstance.vastOptions.duration !== 0) {
                            playerInstance.scheduleTrackingEvent(currentTime, playerInstance.vastOptions.duration);
                        }

                        if (currentTime >= playerInstance.vastOptions.duration - 1 && playerInstance.vastOptions.duration !== 0) {
                            playerInstance.domRef.player.removeEventListener('timeupdate', videoPlayerTimeUpdate);
                            playerInstance.adFinished = true;
                        }
                    };

                    playVideoPlayer(adListId);
                    playerInstance.domRef.player.addEventListener('timeupdate', videoPlayerTimeUpdate);
                };

                playerInstance.playRoll = function (adListId) {
                    // register all the ad pods
                    for (var i = 0; i < adListId.length; i++) {
                        if (!playerInstance.adPool.hasOwnProperty(adListId[i])) {
                            playerInstance.announceLocalError(101);
                            return;
                        }

                        playerInstance.temporaryAdPods.push(playerInstance.adList[adListId[i]]);
                    }

                    if (playerInstance.vastOptions !== null && playerInstance.vastOptions.adType.toLowerCase() === 'linear') {
                        return;
                    }

                    var adListIdToPlay = playerInstance.getNextAdPod();

                    if (adListIdToPlay !== null) {
                        playerInstance.renderLinearAd(adListIdToPlay, true);
                    }
                };

                playerInstance.backupMainVideoContentTime = function (adListId) {
                    var roll = playerInstance.adList[adListId].roll; //spec configs by roll

                    switch (roll) {
                        case 'midRoll':
                            playerInstance.domRef.player.mainVideoCurrentTime = playerInstance.domRef.player.currentTime - 1;
                            break;

                        case 'postRoll':
                            playerInstance.domRef.player.mainVideoCurrentTime = playerInstance.mainVideoDuration;
                            playerInstance.autoplayAfterAd = false;
                            playerInstance.domRef.player.currentTime = playerInstance.mainVideoDuration;
                            break;

                        case 'preRoll':
                            if (playerInstance.domRef.player.currentTime > 0) {
                                playerInstance.domRef.player.mainVideoCurrentTime = playerInstance.domRef.player.currentTime - 1;
                            }

                            break;
                    }
                };

                playerInstance.getSupportedMediaFileObject = function (mediaFiles) {
                    var selectedMediaFile = null;
                    var adSupportedType = false;

                    if (mediaFiles.length) {
                        for (var i = 0; i < mediaFiles.length; i++) {
                            if (mediaFiles[i].apiFramework !== 'VPAID') {
                                var supportLevel = playerInstance.getMediaFileTypeSupportLevel(mediaFiles[i]['type']);

                                if (supportLevel === 'maybe' || supportLevel === 'probably') {
                                    selectedMediaFile = mediaFiles[i];
                                    adSupportedType = true;
                                } //one of the best(s) option, no need to seek more


                                if (supportLevel === 'probably') {
                                    break;
                                }
                            } else {
                                selectedMediaFile = mediaFiles[i];
                                adSupportedType = true;
                                break;
                            }
                        }
                    }

                    if (adSupportedType === false) {
                        return false;
                    }

                    return selectedMediaFile;
                };
                /**
                 * Reports how likely it is that the current browser will be able to play media of a given MIME type.
                 * @return string|null "probably", "maybe", "no" or null
                 */


                playerInstance.getMediaFileTypeSupportLevel = function (mediaType) {
                    if (null === mediaType) {
                        return null;
                    }

                    var tmpVideo = document.createElement('video');
                    var response = tmpVideo.canPlayType(mediaType);
                    return !response ? "no" : response;
                };

                playerInstance.scheduleTrackingEvent = function (currentTime, duration) {
                    if (currentTime === 0) {
                        playerInstance.trackSingleEvent('start');
                    }

                    if (typeof playerInstance.vastOptions.tracking['progress'] !== 'undefined' && playerInstance.vastOptions.tracking['progress'].length && typeof playerInstance.vastOptions.tracking['progress'][currentTime] !== 'undefined') {
                        playerInstance.trackSingleEvent('progress', currentTime);
                    }

                    if (currentTime === Math.floor(duration / 4)) {
                        playerInstance.trackSingleEvent('firstQuartile');
                    }

                    if (currentTime === Math.floor(duration / 2)) {
                        playerInstance.trackSingleEvent('midpoint');
                    }

                    if (currentTime === Math.floor(duration * 3 / 4)) {
                        playerInstance.trackSingleEvent('thirdQuartile');
                    }

                    if (currentTime >= duration - 1) {
                        playerInstance.trackSingleEvent('complete');
                    }
                }; // ADS


                playerInstance.trackSingleEvent = function (eventType, eventSubType) {
                    if (typeof playerInstance.vastOptions === 'undefined' || playerInstance.vastOptions === null) {
                        return;
                    }

                    var trackingUris = [];
                    trackingUris.length = 0;

                    switch (eventType) {
                        case 'start':
                        case 'firstQuartile':
                        case 'midpoint':
                        case 'thirdQuartile':
                        case 'complete':
                            if (playerInstance.vastOptions.stopTracking[eventType] === false) {
                                if (playerInstance.vastOptions.tracking[eventType] !== null) {
                                    trackingUris = playerInstance.vastOptions.tracking[eventType];
                                }

                                playerInstance.vastOptions.stopTracking[eventType] = true;
                            }

                            break;

                        case 'progress':
                            playerInstance.vastOptions.tracking['progress'][eventSubType].elements.forEach(function (currentValue, index) {
                                if (playerInstance.vastOptions.tracking['progress'][eventSubType].stopTracking === false && playerInstance.vastOptions.tracking['progress'][eventSubType].elements.length) {
                                    trackingUris = playerInstance.vastOptions.tracking['progress'][eventSubType].elements;
                                }

                                playerInstance.vastOptions.tracking['progress'][eventSubType].stopTracking = true;
                            });
                            break;

                        case 'impression':
                            if (typeof playerInstance.vastOptions.impression !== 'undefined' && playerInstance.vastOptions.impression !== null && typeof playerInstance.vastOptions.impression.length !== 'undefined') {
                                trackingUris = playerInstance.vastOptions.impression;
                            }

                            break;

                        default:
                            break;
                    }

                    playerInstance.callUris(trackingUris);
                }; // ADS


                playerInstance.completeNonLinearStatic = function (adListId) {
                    playerInstance.closeNonLinear(adListId);

                    if (playerInstance.adFinished === false) {
                        playerInstance.adFinished = true;
                        playerInstance.trackSingleEvent('complete');
                    }

                    clearInterval(playerInstance.nonLinearTracking);
                }; // ADS

                /**
                 * Show up a nonLinear static creative
                 */


                playerInstance.createNonLinearStatic = function (adListId) {
                    if (!playerInstance.adPool.hasOwnProperty(adListId) || playerInstance.adPool[adListId].error === true) {
                        playerInstance.announceLocalError(101);
                        return;
                    } //get the proper ad


                    playerInstance.vastOptions = playerInstance.adPool[adListId];
                    playerInstance.createBoard(adListId);

                    if (playerInstance.adList[adListId].error === true) {
                        return;
                    }

                    playerInstance.adFinished = false;
                    var duration;

                    if (!playerInstance.vastOptions.vpaid) {
                        playerInstance.trackSingleEvent('start');
                        duration = playerInstance.adList[adListId].nonLinearDuration ? playerInstance.adList[adListId].nonLinearDuration : playerInstance.vastOptions.duration;
                        playerInstance.nonLinearTracking = setInterval(function () {
                            if (playerInstance.adFinished === true) {
                                return;
                            }

                            var currentTime = Math.floor(playerInstance.domRef.player.currentTime);
                            playerInstance.scheduleTrackingEvent(currentTime, duration);

                            if (currentTime >= duration - 1) {
                                playerInstance.adFinished = true;
                            }
                        }, 400);
                    }

                    var time = parseInt(playerInstance.getCurrentTime()) + parseInt(duration);
                    playerInstance.scheduleTask({
                        time: time,
                        closeStaticAd: adListId
                    });
                }; // ADS


                playerInstance.createVpaidNonLinearBoard = function (adListId) {
                    // create iframe
                    // pass the js
                    var vastSettings = playerInstance.adPool[adListId];

                    playerInstance.loadVpaidNonlinearAssets = function (adListId) {
                        playerInstance.debugMessage('starting function switchPlayerToVpaidMode');
                        var vAlign = playerInstance.adList[adListId].vAlign ? playerInstance.adList[adListId].vAlign : playerInstance.nonLinearVerticalAlign;
                        var showCloseButton = playerInstance.adList[adListId].vpaidNonLinearCloseButton ? playerInstance.adList[adListId].vpaidNonLinearCloseButton : playerInstance.vpaidNonLinearCloseButton;
                        var vpaidIframe = playerInstance.videoPlayerId + "_" + adListId + "_fluid_vpaid_iframe";
                        var creativeData = {};
                        creativeData.AdParameters = playerInstance.adPool[adListId].adParameters;
                        var slotWrapper = document.createElement('div');
                        slotWrapper.id = 'fluid_vpaidNonLinear_' + adListId;
                        slotWrapper.className = 'fluid_vpaidNonLinear_' + vAlign;
                        slotWrapper.className += ' fluid_vpaidNonLinear_ad';
                        slotWrapper.setAttribute('adListId', adListId); // Default values in case nothing defined in VAST data or ad settings

                        var adWidth = Math.min(468, playerInstance.domRef.player.offsetWidth);
                        var adHeight = Math.min(60, Math.floor(playerInstance.domRef.player.offsetHeight / 4));

                        if (typeof playerInstance.adList[adListId].size !== 'undefined') {
                            var dimensions = playerInstance.adList[adListId].size.split('x');
                            adWidth = dimensions[0];
                            adHeight = dimensions[1];
                        } else if (vastSettings.dimension.width && vastSettings.dimension.height) {
                            adWidth = vastSettings.dimension.width;
                            adHeight = vastSettings.dimension.height;
                        }

                        slotWrapper.style.width = '100%';
                        slotWrapper.style.height = adHeight + 'px';
                        var slotFrame;

                        if (showCloseButton) {
                            var _slotFrame = document.createElement('div');

                            _slotFrame.className = 'fluid_vpaidNonLinear_frame';
                            _slotFrame.style.width = adWidth + 'px';
                            _slotFrame.style.height = adHeight + 'px';
                            slotWrapper.appendChild(_slotFrame);
                            var closeBtn = document.createElement('div');
                            closeBtn.id = 'close_button_' + playerInstance.videoPlayerId;
                            closeBtn.className = 'close_button';
                            closeBtn.innerHTML = '';
                            closeBtn.title = playerInstance.displayOptions.layoutControls.closeButtonCaption;
                            var tempadListId = adListId;

                            closeBtn.onclick = function (event) {
                                playerInstance.hardStopVpaidAd('');

                                if (typeof event.stopImmediatePropagation !== 'undefined') {
                                    event.stopImmediatePropagation();
                                }

                                playerInstance.adFinished = true; //if any other onPauseRoll then render it

                                if (playerInstance.adList[tempadListId].roll === 'onPauseRoll' && playerInstance.onPauseRollAdPods[0]) {
                                    var getNextOnPauseRollAd = playerInstance.onPauseRollAdPods[0];
                                    playerInstance.createBoard(getNextOnPauseRollAd);
                                    playerInstance.currentOnPauseRollAd = playerInstance.onPauseRollAdPods[0];
                                    delete playerInstance.onPauseRollAdPods[0];
                                }

                                return false;
                            };

                            _slotFrame.appendChild(closeBtn);
                        }

                        var slotIframe = document.createElement('iframe');
                        slotIframe.id = playerInstance.videoPlayerId + "non_linear_vapid_slot_iframe";
                        slotIframe.className = 'fluid_vpaid_nonlinear_slot_iframe';
                        slotIframe.setAttribute('width', adWidth + 'px');
                        slotIframe.setAttribute('height', adHeight + 'px');
                        slotIframe.setAttribute('sandbox', 'allow-forms allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts');
                        slotIframe.setAttribute('frameborder', '0');
                        slotIframe.setAttribute('scrolling', 'no');
                        slotIframe.setAttribute('marginwidth', '0');
                        slotIframe.setAttribute('marginheight', '0');
                        slotWrapper.appendChild(slotIframe);
                        playerInstance.domRef.player.parentNode.insertBefore(slotWrapper, vpaidIframe.nextSibling);
                        var slotElement = slotIframe.contentWindow.document.createElement('div');
                        slotIframe.contentWindow.document.body.appendChild(slotElement);
                        playerInstance.vastOptions.slotIframe = slotIframe;
                        playerInstance.vastOptions.slotFrame = slotFrame;
                        var environmentVars = {
                            slot: slotElement,
                            videoSlot: playerInstance.domRef.player,
                            videoSlotCanAutoPlay: true
                        };
                        playerInstance.debugMessage(playerInstance.adList[adListId]); // calls this functions after ad unit is loaded in iframe

                        var ver = playerInstance.vpaidAdUnit.handshakeVersion(VPAID_VERSION);
                        var compare = playerInstance.compareVersion(VPAID_VERSION, ver);

                        if (compare === 1) {
                            //VPAID version of ad is lower than we need
                            playerInstance.adList[adListId].error = true;
                            playerInstance.playMainVideoWhenVpaidFails(403);
                            return false;
                        }

                        playerInstance.domRef.player.loop = false;
                        playerInstance.domRef.player.removeAttribute('controls'); //Remove the default Controls

                        playerInstance.vpaidCallbackListenersAttach();
                        var mode = playerInstance.fullscreenMode ? 'fullscreen' : 'normal';
                        playerInstance.vpaidAdUnit.initAd(adWidth, adHeight, mode, 3000, creativeData, environmentVars);
                        playerInstance.toggleLoader(false);
                        playerInstance.adList[adListId].played = true;
                        playerInstance.adFinished = false;
                    };

                    playerInstance.loadVpaid(adListId, vastSettings.staticResource);
                    playerInstance.debugMessage('create non linear vpaid');
                }; // ADS


                playerInstance.createNonLinearBoard = function (adListId) {
                    var vastSettings = playerInstance.adPool[adListId];
                    playerInstance.adList[adListId].played = true;
                    var playerWidth = playerInstance.domRef.player.clientWidth;
                    var playerHeight = playerInstance.domRef.player.clientHeight;
                    var board = document.createElement('div');
                    var vAlign = playerInstance.adList[adListId].vAlign ? playerInstance.adList[adListId].vAlign : playerInstance.nonLinearVerticalAlign;
                    var creative = new Image();
                    creative.src = vastSettings.staticResource;
                    creative.id = 'fluid_nonLinear_imgCreative_' + adListId + '_' + playerInstance.videoPlayerId;

                    creative.onerror = function () {
                        playerInstance.adList[adListId].error = true;
                        playerInstance.announceError(500);
                    };

                    creative.onload = function () {
                        var origWidth;
                        var origHeight;
                        var newBannerWidth;
                        var newBannerHeight; //Set banner size based on the below priority
                        // 1. adList -> roll -> size
                        // 2. VAST XML width/height attriubute (VAST 3.)
                        // 3. VAST XML static resource dimension

                        if (typeof playerInstance.adList[adListId].size !== 'undefined') {
                            origWidth = playerInstance.adList[adListId].size.split('x')[0];
                            origHeight = playerInstance.adList[adListId].size.split('x')[1];
                        } else if (vastSettings.dimension.width && vastSettings.dimension.height) {
                            origWidth = vastSettings.dimension.width;
                            origHeight = vastSettings.dimension.height;
                        } else {
                            origWidth = creative.width;
                            origHeight = creative.height;
                        }

                        if (origWidth > playerWidth) {
                            newBannerWidth = playerWidth - 5;
                            newBannerHeight = origHeight * newBannerWidth / origWidth;
                        } else {
                            newBannerWidth = origWidth;
                            newBannerHeight = origHeight;
                        }

                        if (playerInstance.adList[adListId].roll !== 'onPauseRoll') {
                            //Show the board only if media loaded
                            document.getElementById('fluid_nonLinear_' + adListId).style.display = '';
                        }

                        var img = document.getElementById(creative.id);
                        img.width = newBannerWidth;
                        img.height = newBannerHeight;
                        playerInstance.trackSingleEvent('impression');
                    };

                    board.id = 'fluid_nonLinear_' + adListId;
                    board.className = 'fluid_nonLinear_' + vAlign;
                    board.className += ' fluid_nonLinear_ad';
                    board.innerHTML = creative.outerHTML;
                    board.style.display = 'none'; //Bind the Onclick event

                    board.onclick = function () {
                        if (typeof vastSettings.clickthroughUrl !== 'undefined') {
                            window.open(vastSettings.clickthroughUrl);
                        } //Tracking the NonLinearClickTracking events


                        if (typeof vastSettings.clicktracking !== 'undefined') {
                            playerInstance.callUris([vastSettings.clicktracking]);
                        }
                    };

                    if (typeof vastSettings.clickthroughUrl !== 'undefined') {
                        board.style.cursor = 'pointer';
                    }

                    var closeBtn = document.createElement('div');
                    closeBtn.id = 'close_button_' + playerInstance.videoPlayerId;
                    closeBtn.className = 'close_button';
                    closeBtn.innerHTML = '';
                    closeBtn.title = playerInstance.displayOptions.layoutControls.closeButtonCaption;
                    var tempadListId = adListId;

                    closeBtn.onclick = function (event) {
                        this.parentElement.remove();

                        if (typeof event.stopImmediatePropagation !== 'undefined') {
                            event.stopImmediatePropagation();
                        }

                        playerInstance.adFinished = true;
                        clearInterval(playerInstance.nonLinearTracking); //if any other onPauseRoll then render it

                        if (playerInstance.adList[tempadListId].roll === 'onPauseRoll' && playerInstance.onPauseRollAdPods[0]) {
                            var getNextOnPauseRollAd = playerInstance.onPauseRollAdPods[0];
                            playerInstance.createBoard(getNextOnPauseRollAd);
                            playerInstance.currentOnPauseRollAd = playerInstance.onPauseRollAdPods[0];
                            delete playerInstance.onPauseRollAdPods[0];
                        }

                        return false;
                    };

                    board.appendChild(closeBtn);
                    playerInstance.domRef.player.parentNode.insertBefore(board, playerInstance.domRef.player.nextSibling);
                }; // ADS

                /**
                 * Adds a nonLinear static Image banner
                 *
                 * currently only image/gif, image/jpeg, image/png supported
                 */


                playerInstance.createBoard = function (adListId) {
                    var vastSettings = playerInstance.adPool[adListId]; // create nonLinear Vpaid
                    // create nonLinear regular

                    if (vastSettings.vpaid) {
                        playerInstance.hardStopVpaidAd('');
                        playerInstance.createVpaidNonLinearBoard(adListId);
                    } else {
                        if (typeof vastSettings.staticResource === 'undefined' || playerInstance.supportedStaticTypes.indexOf(vastSettings.creativeType) === -1) {
                            //Couldn’t find NonLinear resource with supported type.
                            playerInstance.adList[adListId].error = true;

                            if (!playerInstance.vastOptions || typeof playerInstance.vastOptions.errorUrl === 'undefined') {
                                playerInstance.announceLocalError(503);
                            } else {
                                playerInstance.announceError(503);
                            }

                            return;
                        }

                        playerInstance.createNonLinearBoard(adListId);
                    }
                };

                playerInstance.closeNonLinear = function (adListId) {
                    var element = document.getElementById('fluid_nonLinear_' + adListId);

                    if (element) {
                        element.remove();
                    }
                };

                playerInstance.rollGroupContainsLinear = function (groupedRolls) {
                    var found = false;

                    for (var i = 0; i < groupedRolls.length; i++) {
                        if (playerInstance.adList[groupedRolls[i].id].adType && playerInstance.adList[groupedRolls[i].id].adType === 'linear') {
                            found = true;
                            break;
                        }
                    }

                    return found;
                };

                playerInstance.rollGroupContainsNonlinear = function (groupedRolls) {
                    var found = false;

                    for (var i = 0; i < groupedRolls.length; i++) {
                        if (playerInstance.adList[groupedRolls[i].id].adType.toLowerCase() === 'nonlinear') {
                            found = true;
                            break;
                        }
                    }

                    return found;
                };

                playerInstance.preRollFail = function () {
                    var preRollsLength = playerInstance.preRollAdPodsLength;
                    playerInstance.preRollVastResolved++;

                    if (playerInstance.preRollVastResolved === preRollsLength) {
                        playerInstance.preRollAdsPlay();
                    }
                };

                playerInstance.preRollSuccess = function () {
                    var preRollsLength = playerInstance.preRollAdPodsLength;
                    playerInstance.preRollVastResolved++;

                    if (playerInstance.preRollVastResolved === preRollsLength) {
                        playerInstance.preRollAdsPlay();
                    }
                };

                playerInstance.preRollAdsPlay = function () {
                    var time = 0;
                    var adListIds = playerInstance.preRollAdPods;
                    var adsByType = {
                        linear: [],
                        nonLinear: []
                    };
                    playerInstance.firstPlayLaunched = true;

                    for (var index = 0; index < adListIds.length; index++) {
                        if (playerInstance.adList[adListIds[index]].played === true) {
                            return;
                        }

                        if (playerInstance.adList[adListIds[index]].adType === 'linear') {
                            adsByType.linear.push(adListIds[index]);
                        }

                        if (playerInstance.adList[adListIds[index]].adType === 'nonLinear') {
                            adsByType.nonLinear.push(adListIds[index]);
                            playerInstance.scheduleTask({
                                time: time,
                                playRoll: 'midRoll',
                                adListId: adsByType.nonLinear.shift()
                            });
                        }
                    }

                    if (adsByType.linear.length > 0) {
                        playerInstance.toggleLoader(true);
                        playerInstance.playRoll(adsByType.linear);
                    } else {
                        playerInstance.playMainVideoWhenVastFails(900);
                    }
                };

                playerInstance.preRoll = function (event) {
                    var vastObj = event.vastObj;
                    playerInstance.domRef.player.removeEventListener(event.type, playerInstance.preRoll);
                    var adListId = [];
                    adListId[0] = event.type.replace('adId_', '');
                    var time = 0;

                    if (playerInstance.adList[adListId[0]].played === true) {
                        return;
                    }

                    playerInstance.preRollAdPods.push(adListId[0]);
                    playerInstance.preRollSuccess(vastObj);
                };

                playerInstance.createAdMarker = function (adListId, time) {
                    var markersHolder = document.getElementById(playerInstance.videoPlayerId + '_ad_markers_holder');
                    var adMarker = document.createElement('div');
                    adMarker.id = 'ad_marker_' + playerInstance.videoPlayerId + "_" + adListId;
                    adMarker.className = 'fluid_controls_ad_marker';
                    adMarker.style.left = time / playerInstance.mainVideoDuration * 100 + '%';

                    if (playerInstance.isCurrentlyPlayingAd) {
                        adMarker.style.display = 'none';
                    }

                    markersHolder.appendChild(adMarker);
                };

                playerInstance.hideAdMarker = function (adListId) {
                    var element = document.getElementById('ad_marker_' + playerInstance.videoPlayerId + "_" + adListId);

                    if (element) {
                        element.style.display = 'none';
                    }
                };

                playerInstance.showAdMarkers = function () {
                    var markersHolder = document.getElementById(playerInstance.videoPlayerId + '_ad_markers_holder');
                    var adMarkers = markersHolder.getElementsByClassName('fluid_controls_ad_marker');
                    var idPrefix = 'ad_marker_' + playerInstance.videoPlayerId + "_";

                    for (var i = 0; i < adMarkers.length; ++i) {
                        var item = adMarkers[i];
                        var adListId = item.id.replace(idPrefix, '');

                        if (playerInstance.adList[adListId].played === false) {
                            item.style.display = '';
                        }
                    }
                };

                playerInstance.hideAdMarkers = function () {
                    var markersHolder = document.getElementById(playerInstance.videoPlayerId + '_ad_markers_holder');
                    var adMarkers = markersHolder.getElementsByClassName('fluid_controls_ad_marker');

                    for (var i = 0; i < adMarkers.length; ++i) {
                        var item = adMarkers[i];
                        item.style.display = 'none';
                    }
                };

                playerInstance.midRoll = function (event) {
                    playerInstance.domRef.player.removeEventListener(event.type, playerInstance.midRoll);
                    var adListId = event.type.replace('adId_', '');

                    if (playerInstance.adList[adListId].played === true) {
                        return;
                    }

                    var time = playerInstance.adList[adListId].timer;

                    if (typeof time == 'string' && time.indexOf("%") !== -1) {
                        time = time.replace('%', '');
                        time = Math.floor(playerInstance.mainVideoDuration / 100 * time);
                    }

                    if (playerInstance.displayOptions.vastOptions.showProgressbarMarkers && playerInstance.adList[adListId].adType === "nonLinear") {
                        playerInstance.createAdMarker(adListId, time);
                    }

                    playerInstance.scheduleTask({
                        time: time,
                        playRoll: 'midRoll',
                        adListId: adListId
                    });
                };

                playerInstance.postRoll = function (event) {
                    playerInstance.domRef.player.removeEventListener(event.type, playerInstance.postRoll);
                    var adListId = event.type.replace('adId_', '');
                    playerInstance.scheduleTask({
                        time: Math.floor(playerInstance.mainVideoDuration),
                        playRoll: 'postRoll',
                        adListId: adListId
                    });
                };

                playerInstance.onPauseRoll = function (event) {
                    playerInstance.domRef.player.removeEventListener(event.type, playerInstance.onPauseRoll);
                    var adListId = event.type.replace('adId_', '');

                    if (playerInstance.adList[adListId].adType === 'nonLinear') {
                        if (!playerInstance.adPool.hasOwnProperty(adListId) || playerInstance.adPool[adListId].error === true) {
                            playerInstance.announceLocalError(101);
                            return;
                        } //var playerWrapper = document.getElementById('fluid_video_wrapper_' + playerInstance.videoPlayerId);


                        var nonLinearAdExists = document.getElementsByClassName('fluid_nonLinear_ad')[0];

                        if (!nonLinearAdExists) {
                            playerInstance.createBoard(adListId);
                            playerInstance.currentOnPauseRollAd = adListId;
                            var onPauseAd = document.getElementById('fluid_nonLinear_' + adListId);

                            if (onPauseAd) {
                                onPauseAd.style.display = 'none';
                            }
                        } else {
                            playerInstance.onPauseRollAdPods.push(adListId);
                        }
                    }
                };
                /**
                 * Check if player has a valid nonLinear onPause Ad
                 */


                playerInstance.hasValidOnPauseAd = function () {
                    // TODO should be only one. Add validator to allow only one onPause roll
                    var onPauseAd = playerInstance.findRoll('onPauseRoll');
                    return onPauseAd.length !== 0 && playerInstance.adList[onPauseAd[0]] && playerInstance.adList[onPauseAd[0]].error === false;
                };
                /**
                 * Hide/show nonLinear onPause Ad
                 */


                playerInstance.toggleOnPauseAd = function () {
                    if (playerInstance.hasValidOnPauseAd() && !playerInstance.isCurrentlyPlayingAd) {
                        var onPauseRoll = playerInstance.findRoll('onPauseRoll');
                        var adListId;

                        if (playerInstance.currentOnPauseRollAd !== '') {
                            adListId = playerInstance.currentOnPauseRollAd;
                        } else {
                            adListId = onPauseRoll[0];
                        }

                        playerInstance.vastOptions = playerInstance.adPool[adListId];
                        var onPauseAd = document.getElementById('fluid_nonLinear_' + adListId);

                        if (onPauseAd && playerInstance.domRef.player.paused) {
                            setTimeout(function () {
                                onPauseAd.style.display = 'flex';
                                playerInstance.adList[adListId].played = false;
                                playerInstance.trackingOnPauseNonLinearAd(adListId, 'start');
                            }, 500);
                        } else if (onPauseAd && !playerInstance.domRef.player.paused) {
                            onPauseAd.style.display = 'none';
                            playerInstance.adFinished = true;
                            playerInstance.trackingOnPauseNonLinearAd(adListId, 'complete');
                        }
                    }
                };
                /**
                 * Helper function for tracking onPause Ads
                 */


                playerInstance.trackingOnPauseNonLinearAd = function (adListId, status) {
                    if (!playerInstance.adPool.hasOwnProperty(adListId) || playerInstance.adPool[adListId].error === true) {
                        playerInstance.announceLocalError(101);
                        return;
                    }

                    playerInstance.vastOptions = playerInstance.adPool[adListId];
                    playerInstance.trackSingleEvent(status);
                };

                playerInstance.getLinearAdsFromKeyTime = function (keyTimeLinearObj) {
                    var adListIds = [];

                    for (var i = 0; i < keyTimeLinearObj.length; i++) {
                        if (playerInstance.adList[keyTimeLinearObj[i].adListId].played === false) {
                            adListIds.push(keyTimeLinearObj[i].adListId);
                        }
                    }

                    return adListIds;
                };

                playerInstance.adKeytimePlay = function (keyTime) {
                    if (!playerInstance.timerPool[keyTime] || playerInstance.isCurrentlyPlayingAd) {
                        return;
                    }

                    var timerPoolKeytimeCloseStaticAdsLength = playerInstance.timerPool[keyTime]['closeStaticAd'].length;
                    var timerPoolKeytimeLinearAdsLength = playerInstance.timerPool[keyTime]['linear'].length;
                    var timerPoolKeytimeNonlinearAdsLength = playerInstance.timerPool[keyTime]['nonLinear'].length; // remove the item from keytime if no ads to play

                    if (timerPoolKeytimeCloseStaticAdsLength === 0 && timerPoolKeytimeLinearAdsLength === 0 && timerPoolKeytimeNonlinearAdsLength === 0) {
                        delete playerInstance.timerPool[keyTime];
                        return;
                    } // Task: close nonLinear ads


                    if (timerPoolKeytimeCloseStaticAdsLength > 0) {
                        for (var index = 0; index < timerPoolKeytimeCloseStaticAdsLength; index++) {
                            var adListId = playerInstance.timerPool[keyTime]['closeStaticAd'][index].closeStaticAd;

                            if (playerInstance.adList[adListId].played === true) {
                                playerInstance.completeNonLinearStatic(adListId);
                            }
                        } // empty closeStaticAd from the timerpool after closing


                        playerInstance.timerPool[keyTime]['closeStaticAd'] = [];
                    } // Task: play linear ads


                    if (timerPoolKeytimeLinearAdsLength > 0) {
                        var adListIds = playerInstance.getLinearAdsFromKeyTime(playerInstance.timerPool[keyTime]['linear']);

                        if (adListIds.length > 0) {
                            playerInstance.playRoll(adListIds); // empty the linear ads from the timerpool after played

                            playerInstance.timerPool[keyTime]['linear'] = []; // return after starting video ad, so non-linear will not overlap

                            return;
                        }
                    } // Task: play nonLinear ads


                    if (timerPoolKeytimeNonlinearAdsLength > 0) {
                        for (var _index = 0; _index < timerPoolKeytimeNonlinearAdsLength; _index++) {
                            var _adListId = playerInstance.timerPool[keyTime]['nonLinear'][_index].adListId;
                            var vastOptions = playerInstance.adPool[_adListId]; // we are not supporting nonLinear ads in cardBoard mode

                            if (playerInstance.adList[_adListId].played === false && !playerInstance.displayOptions.layoutControls.showCardBoardView) {
                                playerInstance.createNonLinearStatic(_adListId);

                                if (playerInstance.displayOptions.vastOptions.showProgressbarMarkers) {
                                    playerInstance.hideAdMarker(_adListId);
                                } // delete nonLinear after playing


                                playerInstance.timerPool[keyTime]['nonLinear'].splice(_index, 1); // return after starting non-linear ad, so multiple non-linear will not overlap
                                // unplayed non-linear will appear if user seeks back to the time :)

                                return;
                            }
                        }
                    }
                };

                playerInstance.adTimer = function () {
                    if (!!playerInstance.isTimer) {
                        return;
                    }

                    playerInstance.isTimer = !playerInstance.isTimer;
                    playerInstance.timer = setInterval(function () {
                        var keyTime = Math.floor(playerInstance.getCurrentTime());
                        playerInstance.adKeytimePlay(keyTime);
                    }, 800);
                }; // ADS


                playerInstance.scheduleTask = function (task) {
                    if (!playerInstance.timerPool.hasOwnProperty(task.time)) {
                        playerInstance.timerPool[task.time] = {
                            linear: [],
                            nonLinear: [],
                            closeStaticAd: []
                        };
                    }

                    if (task.hasOwnProperty('playRoll') && playerInstance.adList[task.adListId].adType === 'linear') {
                        playerInstance.timerPool[task.time]['linear'].push(task);
                    } else if (task.hasOwnProperty('playRoll') && playerInstance.adList[task.adListId].adType === 'nonLinear') {
                        playerInstance.timerPool[task.time]['nonLinear'].push(task);
                    } else if (task.hasOwnProperty('closeStaticAd')) {
                        playerInstance.timerPool[task.time]['closeStaticAd'].push(task);
                    }
                }; // ADS


                playerInstance.switchToMainVideo = function () {
                    playerInstance.debugMessage('starting main video');
                    playerInstance.domRef.player.src = playerInstance.originalSrc;
                    playerInstance.initialiseStreamers();
                    var newCurrentTime = typeof playerInstance.domRef.player.mainVideoCurrentTime !== 'undefined' ? playerInstance.domRef.player.mainVideoCurrentTime : 0;

                    if (playerInstance.domRef.player.hasOwnProperty('currentTime')) {
                        playerInstance.domRef.player.currentTime = newCurrentTime;
                    }

                    if (playerInstance.displayOptions.layoutControls.loop) {
                        playerInstance.domRef.player.loop = true;
                    }

                    playerInstance.setCurrentTimeAndPlay(newCurrentTime, playerInstance.autoplayAfterAd);
                    playerInstance.isCurrentlyPlayingAd = false;
                    playerInstance.deleteVastAdElements();
                    playerInstance.adFinished = true;
                    playerInstance.displayOptions.vastOptions.vastAdvanced.vastVideoEndedCallback();
                    playerInstance.vastOptions = null;
                    playerInstance.setBuffering();
                    var progressbarContainer = document.getElementById(playerInstance.videoPlayerId + '_fluid_controls_progress_container');

                    if (progressbarContainer !== null) {
                        var backgroundColor = playerInstance.displayOptions.layoutControls.primaryColor ? playerInstance.displayOptions.layoutControls.primaryColor : "white";
                        var currentProgressBar = playerInstance.domRef.player.parentNode.getElementsByClassName('fluid_controls_currentprogress');

                        for (var i = 0; i < currentProgressBar.length; i++) {
                            currentProgressBar[i].style.backgroundColor = backgroundColor;
                        }
                    }

                    playerInstance.domRef.player.removeEventListener('ended', playerInstance.onVastAdEnded);

                    if (playerInstance.displayOptions.vastOptions.showProgressbarMarkers) {
                        playerInstance.showAdMarkers();
                    }

                    if (playerInstance.hasTitle()) {
                        var title = document.getElementById(playerInstance.videoPlayerId + '_title');
                        title.style.display = 'inline';
                    }
                }; // ADS


                playerInstance.getNextAdPod = function () {
                    var getFirstUnPlayedAd = false;
                    var adListId = null; // if temporaryAdPods is not empty

                    if (playerInstance.temporaryAdPods.length > 0) {
                        var temporaryAdPods = playerInstance.temporaryAdPods.shift();
                        adListId = temporaryAdPods.id;
                    }

                    return adListId;
                }; // ADS


                playerInstance.checkForNextAd = function () {
                    var availableNextAdID = playerInstance.getNextAdPod();

                    if (availableNextAdID === null) {
                        playerInstance.switchToMainVideo();
                        playerInstance.vastOptions = null;
                        playerInstance.adFinished = true;
                    } else {
                        playerInstance.domRef.player.removeEventListener('ended', playerInstance.onVastAdEnded);
                        playerInstance.isCurrentlyPlayingAd = false;
                        playerInstance.vastOptions = null;
                        playerInstance.adFinished = true;
                        playerInstance.renderLinearAd(availableNextAdID, false); // passing false so it doesn't backup the Ad playbacktime as video playback time
                    }
                };
                /**
                 * Adds a Skip Button
                 */


                playerInstance.addSkipButton = function () {
                    // TODO: ahh yes, the DIVbutton...
                    var divSkipButton = document.createElement('div');
                    divSkipButton.id = 'skip_button_' + playerInstance.videoPlayerId;
                    divSkipButton.className = 'skip_button skip_button_disabled';
                    divSkipButton.innerHTML = playerInstance.displayOptions.vastOptions.skipButtonCaption.replace('[seconds]', playerInstance.vastOptions.skipoffset);
                    document.getElementById('fluid_video_wrapper_' + playerInstance.videoPlayerId).appendChild(divSkipButton);
                    playerInstance.domRef.player.addEventListener('timeupdate', playerInstance.decreaseSkipOffset, false);
                };
                /**
                 * Ad Countdown
                 */


                playerInstance.addAdCountdown = function () {
                    var videoWrapper = document.getElementById('fluid_video_wrapper_' + playerInstance.videoPlayerId);
                    var divAdCountdown = document.createElement('div'); // Create element

                    var adCountdown = playerInstance.pad(parseInt(playerInstance.currentVideoDuration / 60)) + ':' + playerInstance.pad(parseInt(playerInstance.currentVideoDuration % 60));
                    var durationText = parseInt(adCountdown);
                    divAdCountdown.id = 'ad_countdown' + playerInstance.videoPlayerId;
                    divAdCountdown.className = 'ad_countdown';
                    divAdCountdown.innerHTML = "<span class='ad_timer_prefix'>Ad - </span>" + durationText;
                    videoWrapper.appendChild(divAdCountdown);
                    playerInstance.domRef.player.addEventListener('timeupdate', playerInstance.decreaseAdCountdown, false);
                    videoWrapper.addEventListener('mouseover', function () {
                        divAdCountdown.style.display = 'none';
                    }, false);
                };

                playerInstance.decreaseAdCountdown = function decreaseAdCountdown() {
                    var sec = parseInt(playerInstance.currentVideoDuration) - parseInt(playerInstance.domRef.player.currentTime);
                    var btn = document.getElementById('ad_countdown' + playerInstance.videoPlayerId);

                    if (btn) {
                        btn.innerHTML = "<span class='ad_timer_prefix'>Ad - </span> " + playerInstance.pad(parseInt(sec / 60)) + ':' + playerInstance.pad(parseInt(sec % 60));
                    } else {
                        playerInstance.domRef.player.removeEventListener('timeupdate', playerInstance.decreaseAdCountdown);
                    }
                };

                playerInstance.removeAdCountdown = function () {
                    var btn = document.getElementById('ad_countdown' + playerInstance.videoPlayerId);

                    if (btn) {
                        btn.parentElement.removeChild(btn);
                    }
                };

                playerInstance.toggleAdCountdown = function (showing) {
                    var btn = document.getElementById('ad_countdown' + playerInstance.videoPlayerId);

                    if (btn) {
                        if (showing) {
                            btn.style.display = 'inline-block';
                        } else {
                            btn.style.display = 'none';
                        }
                    }
                };

                playerInstance.addAdPlayingText = function (textToShow) {
                    var adPlayingDiv = document.createElement('div');
                    adPlayingDiv.id = playerInstance.videoPlayerId + '_fluid_ad_playing';

                    if (playerInstance.displayOptions.layoutControls.primaryColor) {
                        adPlayingDiv.style.backgroundColor = playerInstance.displayOptions.layoutControls.primaryColor;
                        adPlayingDiv.style.opacity = 1;
                    }

                    adPlayingDiv.className = 'fluid_ad_playing';
                    adPlayingDiv.innerText = textToShow;
                    document.getElementById('fluid_video_wrapper_' + playerInstance.videoPlayerId).appendChild(adPlayingDiv);
                };

                playerInstance.positionTextElements = function (adListData) {
                    var allowedPosition = ['top left', 'top right', 'bottom left', 'bottom right'];
                    var skipButton = document.getElementById('skip_button_' + playerInstance.videoPlayerId);
                    var adPlayingDiv = document.getElementById(playerInstance.videoPlayerId + '_fluid_ad_playing');
                    var ctaButton = document.getElementById(playerInstance.videoPlayerId + '_fluid_cta');
                    var ctaButtonHeightWithSpacing = 0;
                    var adPlayingDivHeightWithSpacing = 0;
                    var pixelSpacing = 8;
                    var isBottom = false;
                    var skipButtonHeightWithSpacing = 0;
                    var positionsCTA = [];
                    var defaultPositions = {
                        top: {
                            left: {
                                h: 34,
                                v: 34
                            },
                            right: {
                                h: 0,
                                v: 34
                            }
                        },
                        bottom: {
                            left: {
                                h: 34,
                                v: 50
                            },
                            right: {
                                h: 0,
                                v: 50
                            }
                        }
                    };

                    if (skipButton !== null) {
                        skipButtonHeightWithSpacing = skipButton.offsetHeight + pixelSpacing;
                        var wrapperElement = playerInstance.domRef.wrapper;

                        if (wrapperElement.classList.contains('mobile')) {
                            defaultPositions.bottom.left.v = 75;
                            defaultPositions.bottom.right.v = 75;
                        }
                    }

                    var CTATextPosition;

                    if (ctaButton !== null) {
                        CTATextPosition = playerInstance.displayOptions.vastOptions.adCTATextPosition.toLowerCase();

                        if (allowedPosition.indexOf(CTATextPosition) === -1) {
                            console.log('[FP Error] Invalid position for CTAText. Reverting to "bottom right"');
                            CTATextPosition = 'bottom right';
                        }

                        positionsCTA = CTATextPosition.split(' ');
                        isBottom = positionsCTA[0] === 'bottom';
                        ctaButton.style[positionsCTA[0]] = defaultPositions[positionsCTA[0]][positionsCTA[1]].v + 'px';
                        ctaButton.style[positionsCTA[1]] = defaultPositions[positionsCTA[0]][positionsCTA[1]].h + 'px';

                        if (isBottom && positionsCTA[1] === 'right') {
                            ctaButton.style[positionsCTA[0]] = defaultPositions[positionsCTA[0]][positionsCTA[1]].v + skipButtonHeightWithSpacing + 'px';
                        }

                        ctaButtonHeightWithSpacing = ctaButton.offsetHeight + pixelSpacing + 'px';
                    }

                    var adPlayingDivPosition;
                    var positionsAdText;

                    if (adPlayingDiv !== null) {
                        adPlayingDivPosition = adListData.adTextPosition !== null ? adListData.adTextPosition.toLowerCase() : playerInstance.displayOptions.vastOptions.adTextPosition.toLowerCase();

                        if (allowedPosition.indexOf(adPlayingDivPosition) === -1) {
                            console.log('[FP Error] Invalid position for adText. Reverting to "top left"');
                            adPlayingDivPosition = 'top left';
                        }

                        positionsAdText = adPlayingDivPosition.split(' ');
                        adPlayingDiv.style[positionsAdText[0]] = defaultPositions[positionsAdText[0]][positionsAdText[1]].v + 'px';
                        adPlayingDiv.style[positionsAdText[1]] = defaultPositions[positionsAdText[0]][positionsAdText[1]].h + 'px';
                        adPlayingDivHeightWithSpacing = adPlayingDiv.offsetHeight + pixelSpacing + 'px';
                    }

                    if (ctaButtonHeightWithSpacing > 0 && adPlayingDivHeightWithSpacing > 0 && CTATextPosition === adPlayingDivPosition) {
                        if (isBottom) {
                            if (positionsCTA[1] === 'right') {
                                adPlayingDiv.style.bottom = defaultPositions[positionsAdText[0]][positionsAdText[1]].v + skipButtonHeightWithSpacing + ctaButtonHeightWithSpacing + 'px';
                            } else {
                                adPlayingDiv.style.bottom = defaultPositions[positionsAdText[0]][positionsAdText[1]].v + ctaButtonHeightWithSpacing + 'px';
                            }
                        } else {
                            ctaButton.style.top = defaultPositions[positionsCTA[0]][positionsCTA[1]].v + adPlayingDivHeightWithSpacing + 'px';
                        }
                    }
                };

                playerInstance.removeAdPlayingText = function () {
                    var div = document.getElementById(playerInstance.videoPlayerId + '_fluid_ad_playing');

                    if (!div) {
                        return;
                    }

                    div.parentElement.removeChild(div);
                };

                playerInstance.addCTAButton = function (landingPage) {
                    if (!landingPage) {
                        return;
                    }

                    var ctaButton = document.createElement('div');
                    ctaButton.id = playerInstance.videoPlayerId + '_fluid_cta';
                    ctaButton.className = 'fluid_ad_cta';
                    var link = document.createElement('span');
                    link.innerHTML = playerInstance.displayOptions.vastOptions.adCTAText + "<br/><span class=\"add_icon_clickthrough\">" + landingPage + "</span>";
                    ctaButton.addEventListener('click', function () {
                        if (!playerInstance.domRef.player.paused) {
                            playerInstance.domRef.player.pause();
                        }

                        var win = window.open(playerInstance.vastOptions.clickthroughUrl, '_blank');
                        win.focus();
                        return true;
                    }, false);
                    ctaButton.appendChild(link);
                    document.getElementById('fluid_video_wrapper_' + playerInstance.videoPlayerId).appendChild(ctaButton);
                };

                playerInstance.removeCTAButton = function () {
                    var btn = document.getElementById(playerInstance.videoPlayerId + '_fluid_cta');

                    if (!btn) {
                        return;
                    }

                    btn.parentElement.removeChild(btn);
                };

                playerInstance.decreaseSkipOffset = function () {
                    var sec = playerInstance.vastOptions.skipoffset - Math.floor(playerInstance.domRef.player.currentTime);
                    var btn = document.getElementById('skip_button_' + playerInstance.videoPlayerId);

                    if (!btn) {
                        playerInstance.domRef.player.removeEventListener('timeupdate', playerInstance.decreaseSkipOffset);
                        return;
                    }

                    if (sec >= 1) {
                        //set the button label with the remaining seconds
                        btn.innerHTML = playerInstance.displayOptions.vastOptions.skipButtonCaption.replace('[seconds]', sec);
                        return;
                    } // TODO: refactored, but this is still terrible - remove all this and just make the button clickable...


                    var skipLink = document.createElement('a');
                    skipLink.href = '#';
                    skipLink.id = 'skipHref_' + playerInstance.videoPlayerId;
                    skipLink.innerHTML = playerInstance.displayOptions.vastOptions.skipButtonClickCaption;

                    skipLink.onclick = function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        playerInstance.pressSkipButton();
                    };

                    btn.innerHTML = '';
                    btn.appendChild(skipLink); //removes the CSS class for a disabled button

                    btn.className = btn.className.replace(/\bskip_button_disabled\b/, '');
                    playerInstance.domRef.player.removeEventListener('timeupdate', playerInstance.decreaseSkipOffset);
                };

                playerInstance.pressSkipButton = function () {
                    playerInstance.removeSkipButton();
                    playerInstance.removeAdPlayingText();
                    playerInstance.removeCTAButton();

                    if (playerInstance.vastOptions.vpaid) {
                        // skip the linear vpaid ad
                        playerInstance.skipVpaidAd();
                        return;
                    } // skip the regular linear vast


                    playerInstance.displayOptions.vastOptions.vastAdvanced.vastVideoSkippedCallback();
                    var event = document.createEvent('Event');
                    event.initEvent('ended', false, true);
                    playerInstance.domRef.player.dispatchEvent(event);
                };

                playerInstance.removeSkipButton = function () {
                    var btn = document.getElementById('skip_button_' + playerInstance.videoPlayerId);

                    if (btn) {
                        btn.parentElement.removeChild(btn);
                    }
                };
                /**
                 * Makes the player open the ad URL on clicking
                 */


                playerInstance.addClickthroughLayer = function () {
                    var divWrapper = playerInstance.domRef.wrapper;
                    var divClickThrough = document.createElement('div');
                    divClickThrough.className = 'vast_clickthrough_layer';
                    divClickThrough.id = 'vast_clickthrough_layer_' + playerInstance.videoPlayerId;
                    divClickThrough.setAttribute('style', 'position: absolute; cursor: pointer; top: 0; left: 0; width: ' + playerInstance.domRef.player.offsetWidth + 'px; height: ' + playerInstance.domRef.player.offsetHeight + 'px;');
                    divWrapper.appendChild(divClickThrough); //Bind the Onclick event

                    var openClickthrough = function openClickthrough() {
                        window.open(playerInstance.vastOptions.clickthroughUrl); //Tracking the Clickthorugh events

                        if (typeof playerInstance.vastOptions.clicktracking !== 'undefined') {
                            playerInstance.callUris(playerInstance.vastOptions.clicktracking);
                        }
                    };

                    var clickthroughLayer = document.getElementById('vast_clickthrough_layer_' + playerInstance.videoPlayerId);
                    var isIos9orLower = playerInstance.mobileInfo.device === 'iPhone' && playerInstance.mobileInfo.userOsMajor !== false && playerInstance.mobileInfo.userOsMajor <= 9;

                    clickthroughLayer.onclick = function () {
                        if (playerInstance.domRef.player.paused) {
                            //On Mobile Safari on iPhones with iOS 9 or lower open the clickthrough only once
                            if (isIos9orLower && !playerInstance.suppressClickthrough) {
                                openClickthrough();
                                playerInstance.suppressClickthrough = true;
                            } else {
                                playerInstance.domRef.player.play();
                            }
                        } else {
                            openClickthrough();
                            playerInstance.domRef.player.pause();
                        }
                    };
                };
                /**
                 * Remove the Clickthrough layer
                 */


                playerInstance.removeClickthrough = function () {
                    var clickthroughLayer = document.getElementById('vast_clickthrough_layer_' + playerInstance.videoPlayerId);

                    if (clickthroughLayer) {
                        clickthroughLayer.parentNode.removeChild(clickthroughLayer);
                    }
                };
            });
// CONCATENATED MODULE: ./src/modules/streaming.js
            // Prevent DASH.js from automatically attaching to video sources by default.
// Whoever thought this is a good idea?!

            if (typeof window !== 'undefined' && !window.dashjs) {
                window.dashjs = {
                    skipAutoCreate: true,
                    isDefaultSubject: true
                };
            }

            /* harmony default export */ var streaming = (function (playerInstance, options) {
                playerInstance.initialiseStreamers = function () {
                    playerInstance.detachStreamers();

                    switch (playerInstance.displayOptions.layoutControls.mediaType) {
                        case 'application/dash+xml':
                            // MPEG-DASH
                            if (!playerInstance.dashScriptLoaded && (!window.dashjs || window.dashjs.isDefaultSubject)) {
                                playerInstance.dashScriptLoaded = true;
                                Promise.all(/* import() | dashjs */[__webpack_require__.e(2), __webpack_require__.e(0)]).then(__webpack_require__.t.bind(null, 270, 7)).then(function (it) {
                                    window.dashjs = it.default;
                                    playerInstance.initialiseDash();
                                });
                            } else {
                                playerInstance.initialiseDash();
                            }

                            break;

                        case 'application/x-mpegurl':
                            // HLS
                            if (!playerInstance.hlsScriptLoaded && !window.Hls) {
                                playerInstance.hlsScriptLoaded = true;
                                __webpack_require__.e(/* import() | hlsjs */ 3).then(__webpack_require__.t.bind(null, 271, 7)).then(function (it) {
                                    window.Hls = it.default;
                                    playerInstance.initialiseHls();
                                });
                            } else {
                                playerInstance.initialiseHls();
                            }

                            break;
                    }
                };

                playerInstance.initialiseDash = function () {
                    if (typeof (window.MediaSource || window.WebKitMediaSource) === 'function') {
                        // If false we want to override the autoPlay, as it comes from postRoll
                        var playVideo = !playerInstance.autoplayAfterAd ? playerInstance.autoplayAfterAd : playerInstance.displayOptions.layoutControls.autoPlay;
                        var defaultOptions = {
                            'debug': {
                                'logLevel':  false ? undefined : dashjs.Debug.LOG_LEVEL_FATAL
                            }
                        };
                        var dashPlayer = dashjs.MediaPlayer().create();

                        var _options = playerInstance.displayOptions.modules.configureDash(defaultOptions);

                        dashPlayer.updateSettings(_options);
                        playerInstance.displayOptions.modules.onBeforeInitDash(dashPlayer);
                        dashPlayer.initialize(playerInstance.domRef.player, playerInstance.originalSrc, playVideo);
                        dashPlayer.on('streamInitializing', function () {
                            playerInstance.toggleLoader(true);
                        });
                        dashPlayer.on('canPlay', function () {
                            playerInstance.toggleLoader(false);
                        });
                        dashPlayer.on('playbackPlaying', function () {
                            playerInstance.toggleLoader(false);
                        });
                        playerInstance.displayOptions.modules.onAfterInitDash(dashPlayer);
                        playerInstance.dashPlayer = dashPlayer;
                    } else {
                        playerInstance.nextSource();
                        console.log('[FP_WARNING] Media type not supported by this browser using DASH.js. (application/dash+xml)');
                    }
                };

                playerInstance.initialiseHls = function () {
                    if (Hls.isSupported()) {
                        var defaultOptions = {
                            debug:  true && false === true,
                            p2pConfig: {
                                logLevel: false
                            },
                            enableWebVTT: false,
                            enableCEA708Captions: false
                        };

                        var _options2 = playerInstance.displayOptions.modules.configureHls(defaultOptions);

                        var hls = new Hls(_options2);
                        playerInstance.displayOptions.modules.onBeforeInitHls(hls);
                        hls.attachMedia(playerInstance.domRef.player);
                        hls.loadSource(playerInstance.originalSrc);
                        playerInstance.displayOptions.modules.onAfterInitHls(hls);
                        playerInstance.hlsPlayer = hls;

                        if (!playerInstance.firstPlayLaunched && playerInstance.displayOptions.layoutControls.autoPlay) {
                            playerInstance.domRef.player.play();
                        }
                    } else {
                        playerInstance.nextSource();
                        console.log('[FP_WARNING] Media type not supported by this browser using HLS.js. (application/x-mpegURL)');
                    }
                };

                playerInstance.detachStreamers = function () {
                    if (playerInstance.dashPlayer) {
                        playerInstance.dashPlayer.reset();
                        playerInstance.dashPlayer = false;
                    } else if (playerInstance.hlsPlayer) {
                        playerInstance.hlsPlayer.detachMedia();
                        playerInstance.hlsPlayer = false;
                    }
                };
            });
// CONCATENATED MODULE: ./src/modules/utils.js


            /* harmony default export */ var utils = (function (playerInstance, options) {
                playerInstance.isTouchDevice = function () {
                    return !!('ontouchstart' in window // works on most browsers
                        || navigator.maxTouchPoints); // works on IE10/11 and Surface
                };
                /**
                 * Distinguishes iOS from Android devices and the OS version.
                 *
                 * This should be avoided in favor of capability detection.
                 *
                 * @deprecated deprecated as of v3.0
                 * @returns object
                 */


                playerInstance.getMobileOs = function () {
                    var ua = navigator.userAgent || '';
                    var result = {
                        device: false,
                        userOs: false,
                        userOsVer: false,
                        userOsMajor: false
                    };
                    var versionIndex; // determine OS

                    if (ua.match(/Android/i)) {
                        result.userOs = 'Android';
                        versionIndex = ua.indexOf('Android ');
                    } else if (ua.match(/iPhone/i)) {
                        result.device = 'iPhone';
                        result.userOs = 'iOS';
                        versionIndex = ua.indexOf('OS ');
                    } else if (ua.match(/iPad/i)) {
                        result.device = 'iPad';
                        result.userOs = 'iOS';
                        versionIndex = ua.indexOf('OS ');
                    } else {
                        result.userOs = false;
                    } // determine version


                    if ('iOS' === result.userOs && versionIndex > -1) {
                        var userOsTemp = ua.substr(versionIndex + 3);
                        var indexOfEndOfVersion = userOsTemp.indexOf(' ');

                        if (indexOfEndOfVersion !== -1) {
                            result.userOsVer = userOsTemp.substring(0, userOsTemp.indexOf(' ')).replace(/_/g, '.');
                            result.userOsMajor = parseInt(result.userOsVer);
                        }
                    } else if ('Android' === result.userOs && versionIndex > -1) {
                        result.userOsVer = ua.substr(versionIndex + 8, 3);
                    } else {
                        result.userOsVer = false;
                    }

                    return result;
                };
                /**
                 * Browser detection.
                 * This should be avoided in favor of capability detection.
                 *
                 * @deprecated deprecated as of v3.0
                 *
                 * @returns object
                 */


                playerInstance.getBrowserVersion = function () {
                    var ua = navigator.userAgent || '';
                    var result = {
                        browserName: false,
                        fullVersion: false,
                        majorVersion: false,
                        userOsMajor: false
                    };
                    var idx, uaindex;

                    try {
                        result.browserName = navigator.appName;

                        if ((idx = ua.indexOf('OPR/')) !== -1) {
                            result.browserName = 'Opera';
                            result.fullVersion = ua.substring(idx + 4);
                        } else if ((idx = ua.indexOf('Opera')) !== -1) {
                            result.browserName = 'Opera';
                            result.fullVersion = ua.substring(idx + 6);
                            if ((idx = ua.indexOf('Version')) !== -1) result.fullVersion = ua.substring(idx + 8);
                        } else if ((idx = ua.indexOf('MSIE')) !== -1) {
                            result.browserName = 'Microsoft Internet Explorer';
                            result.fullVersion = ua.substring(idx + 5);
                        } else if ((idx = ua.indexOf('Chrome')) !== -1) {
                            result.browserName = 'Google Chrome';
                            result.fullVersion = ua.substring(idx + 7);
                        } else if ((idx = ua.indexOf('Safari')) !== -1) {
                            result.browserName = 'Safari';
                            result.fullVersion = ua.substring(idx + 7);
                            if ((idx = ua.indexOf('Version')) !== -1) result.fullVersion = ua.substring(idx + 8);
                        } else if ((idx = ua.indexOf('Firefox')) !== -1) {
                            result.browserName = 'Mozilla Firefox';
                            result.fullVersion = ua.substring(idx + 8);
                        } // Others "name/version" is at the end of userAgent
                        else if ((uaindex = ua.lastIndexOf(' ') + 1) < (idx = ua.lastIndexOf('/'))) {
                            result.browserName = ua.substring(uaindex, idx);
                            result.fullVersion = ua.substring(idx + 1);

                            if (result.browserName.toLowerCase() === result.browserName.toUpperCase()) {
                                result.browserName = navigator.appName;
                            }
                        } // trim the fullVersion string at semicolon/space if present


                        if ((uaindex = result.fullVersion.indexOf(';')) !== -1) {
                            result.fullVersion = result.fullVersion.substring(0, uaindex);
                        }

                        if ((uaindex = result.fullVersion.indexOf(' ')) !== -1) {
                            result.fullVersion = result.fullVersion.substring(0, uaindex);
                        }

                        result.majorVersion = parseInt('' + result.fullVersion, 10);

                        if (isNaN(result.majorVersion)) {
                            result.fullVersion = '' + parseFloat(navigator.appVersion);
                            result.majorVersion = parseInt(navigator.appVersion, 10);
                        }
                    } catch (e) {//Return default obj.
                    }

                    return result;
                };

                playerInstance.compareVersion = function (v1, v2) {
                    if (typeof v1 !== 'string') return false;
                    if (typeof v2 !== 'string') return false;
                    v1 = v1.split('.');
                    v2 = v2.split('.');
                    var k = Math.min(v1.length, v2.length);

                    for (var i = 0; i < k; ++i) {
                        v1[i] = parseInt(v1[i], 10);
                        v2[i] = parseInt(v2[i], 10);
                        if (v1[i] > v2[i]) return 1;
                        if (v1[i] < v2[i]) return -1;
                    }

                    return v1.length === v2.length ? 0 : v1.length < v2.length ? -1 : 1;
                };

                playerInstance.convertTimeStringToSeconds = function (str) {
                    if (!(str && str.match(/^(\d){2}(:[0-5][0-9]){2}(.(\d){1,3})?$/))) {
                        return false;
                    }

                    var timeParts = str.split(':');
                    return parseInt(timeParts[0], 10) * 3600 + parseInt(timeParts[1], 10) * 60 + parseInt(timeParts[2], 10);
                }; // Format time to hh:mm:ss


                playerInstance.formatTime = function (duration) {
                    var formatDateObj = new Date(duration * 1000);
                    var formatHours = playerInstance.pad(formatDateObj.getUTCHours());
                    var formatMinutes = playerInstance.pad(formatDateObj.getUTCMinutes());
                    var formatSeconds = playerInstance.pad(formatDateObj.getSeconds());
                    return formatHours >= 1 ? formatHours + ':' + formatMinutes + ':' + formatSeconds : formatMinutes + ':' + formatSeconds;
                };

                playerInstance.pad = function (value) {
                    if (value < 10) {
                        return '0' + value;
                    }

                    return value;
                };
            });
// CONCATENATED MODULE: ./src/fluidplayer.js
            // Player modules

            function fluidplayer_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { fluidplayer_typeof = function _typeof(obj) { return typeof obj; }; } else { fluidplayer_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return fluidplayer_typeof(obj); }

            function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

            function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

            function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }









            var FP_MODULES = [vpaid, vast, cardboard, subtitles, timeline, adsupport, streaming, utils]; // Determine build mode
// noinspection JSUnresolvedVariable

            var FP_DEVELOPMENT_MODE =  true && "production" === 'development'; // Are we running in debug mode?
// noinspection JSUnresolvedVariable

            var FP_RUNTIME_DEBUG =  true && false === true;
            var playerInstances = 0;

            var fluidPlayerClass = function fluidPlayerClass() {
                var _this = this;

                // "self" always points to current instance of the player within the scope of the instance
                // This should help readability and context awareness slightly...
                var self = this;
                self.domRef = {
                    player: null
                }; // noinspection JSUnresolvedVariable

                self.version =  true ? "3.0.4" : undefined; // noinspection JSUnresolvedVariable

                self.homepage =  true ? "https://fluidplayer.com" + '/?utm_source=player&utm_medium=context_menu&utm_campaign=organic' : undefined;
                self.destructors = [];

                self.init = function (playerTarget, options) {
                    // Install player modules and features
                    var moduleOptions = {
                        development: FP_DEVELOPMENT_MODE,
                        debug: FP_RUNTIME_DEBUG
                    };

                    var _iterator = _createForOfIteratorHelper(FP_MODULES),
                        _step;

                    try {
                        for (_iterator.s(); !(_step = _iterator.n()).done;) {
                            var playerModule = _step.value;
                            playerModule(self, moduleOptions);
                        }
                    } catch (err) {
                        _iterator.e(err);
                    } finally {
                        _iterator.f();
                    }

                    var playerNode;

                    if (playerTarget instanceof HTMLVideoElement) {
                        playerNode = playerTarget; // Automatically assign ID if none exists

                        if (!playerTarget.id) {
                            playerTarget.id = 'fluid_player_instance_' + (playerInstances++).toString();
                        }
                    } else if (typeof playerTarget === 'string' || playerTarget instanceof String) {
                        playerNode = document.getElementById(playerTarget);
                    } else {
                        throw 'Invalid initializer - player target must be HTMLVideoElement or ID';
                    }

                    if (!playerNode) {
                        throw 'Could not find a HTML node to attach to for target ' + playerTarget + '"';
                    }

                    playerNode.setAttribute('playsinline', '');
                    playerNode.setAttribute('webkit-playsinline', '');
                    self.domRef.player = playerNode;
                    self.vrROTATION_POSITION = 0.1;
                    self.vrROTATION_SPEED = 80;
                    self.vrMode = false;
                    self.vrPanorama = null;
                    self.vrViewer = null;
                    self.vpaidTimer = null;
                    self.vpaidAdUnit = null;
                    self.vastOptions = null;
                    /**
                     * @deprecated Nothing should RELY on this. An internal ID generator
                     * should be used where absolutely necessary and DOM objects under FP control
                     * MUST be referenced in domRef.
                     */

                    self.videoPlayerId = playerNode.id;
                    self.originalSrc = self.getCurrentSrc();
                    self.isCurrentlyPlayingAd = false;
                    self.recentWaiting = false;
                    self.latestVolume = 1;
                    self.currentVideoDuration = 0;
                    self.firstPlayLaunched = false;
                    self.suppressClickthrough = false;
                    self.timelinePreviewData = [];
                    self.mainVideoCurrentTime = 0;
                    self.mainVideoDuration = 0;
                    self.isTimer = false;
                    self.timer = null;
                    self.timerPool = {};
                    self.adList = {};
                    self.adPool = {};
                    self.adGroupedByRolls = {};
                    self.onPauseRollAdPods = [];
                    self.currentOnPauseRollAd = '';
                    self.preRollAdsResolved = false;
                    self.preRollAdPods = [];
                    self.preRollAdPodsLength = 0;
                    self.preRollVastResolved = 0;
                    self.temporaryAdPods = [];
                    self.availableRolls = ['preRoll', 'midRoll', 'postRoll', 'onPauseRoll'];
                    self.supportedNonLinearAd = ['300x250', '468x60', '728x90'];
                    self.autoplayAfterAd = true;
                    self.nonLinearDuration = 15;
                    self.supportedStaticTypes = ['image/gif', 'image/jpeg', 'image/png'];
                    self.inactivityTimeout = null;
                    self.isUserActive = null;
                    self.nonLinearVerticalAlign = 'bottom';
                    self.vpaidNonLinearCloseButton = true;
                    self.showTimeOnHover = true;
                    self.initialAnimationSet = true;
                    self.theatreMode = false;
                    self.theatreModeAdvanced = false;
                    self.fullscreenMode = false;
                    self.originalWidth = playerNode.offsetWidth;
                    self.originalHeight = playerNode.offsetHeight;
                    self.dashPlayer = false;
                    self.hlsPlayer = false;
                    self.dashScriptLoaded = false;
                    self.hlsScriptLoaded = false;
                    self.isPlayingMedia = false;
                    self.isSwitchingSource = false;
                    self.isLoading = false;
                    self.isInIframe = self.inIframe();
                    self.mainVideoReadyState = false;
                    self.xmlCollection = [];
                    self.inLineFound = null;
                    self.fluidStorage = {};
                    self.fluidPseudoPause = false;
                    self.mobileInfo = self.getMobileOs();
                    self.events = {}; //Default options

                    self.displayOptions = {
                        layoutControls: {
                            mediaType: self.getCurrentSrcType(),
                            primaryColor: false,
                            posterImage: false,
                            posterImageSize: 'contain',
                            adProgressColor: '#f9d300',
                            playButtonShowing: true,
                            playPauseAnimation: true,
                            closeButtonCaption: 'Close',
                            // Remove?
                            fillToContainer: false,
                            autoPlay: false,
                            preload: 'auto',
                            mute: false,
                            loop: null,
                            keyboardControl: true,
                            allowDownload: false,
                            playbackRateEnabled: false,
                            subtitlesEnabled: false,
                            showCardBoardView: false,
                            showCardBoardJoystick: false,
                            allowTheatre: true,
                            doubleclickFullscreen: true,
                            theatreSettings: {
                                width: '100%',
                                height: '60%',
                                marginTop: 0,
                                horizontalAlign: 'center',
                                keepPosition: false
                            },
                            theatreAdvanced: false,
                            title: null,
                            logo: {
                                imageUrl: null,
                                position: 'top left',
                                clickUrl: null,
                                opacity: 1,
                                mouseOverImageUrl: null,
                                imageMargin: '2px',
                                hideWithControls: false,
                                showOverAds: false
                            },
                            controlBar: {
                                autoHide: false,
                                autoHideTimeout: 3,
                                animated: true
                            },
                            timelinePreview: {
                                spriteImage: false,
                                spriteRelativePath: false
                            },
                            htmlOnPauseBlock: {
                                html: null,
                                height: null,
                                width: null
                            },
                            layout: 'default',
                            //options: 'default', '<custom>'
                            playerInitCallback: function playerInitCallback() {},
                            persistentSettings: {
                                volume: true,
                                quality: true,
                                speed: true,
                                theatre: true
                            },
                            controlForwardBackward: {
                                show: false
                            },
                            contextMenu: {
                                controls: true,
                                links: []
                            }
                        },
                        vastOptions: {
                            adList: {},
                            skipButtonCaption: 'Skip ad in [seconds]',
                            skipButtonClickCaption: 'Skip Ad <span class="skip_button_icon"></span>',
                            adText: null,
                            adTextPosition: 'top left',
                            adCTAText: 'Visit now!',
                            adCTATextPosition: 'bottom right',
                            adClickable: true,
                            vastTimeout: 5000,
                            showProgressbarMarkers: false,
                            allowVPAID: false,
                            showPlayButton: false,
                            maxAllowedVastTagRedirects: 3,
                            vpaidTimeout: 3000,
                            vastAdvanced: {
                                vastLoadedCallback: function vastLoadedCallback() {},
                                noVastVideoCallback: function noVastVideoCallback() {},
                                vastVideoSkippedCallback: function vastVideoSkippedCallback() {},
                                vastVideoEndedCallback: function vastVideoEndedCallback() {}
                            }
                        },
                        captions: {
                            play: 'Play',
                            pause: 'Pause',
                            mute: 'Mute',
                            unmute: 'Unmute',
                            fullscreen: 'Fullscreen',
                            subtitles: 'Subtitles',
                            exitFullscreen: 'Exit Fullscreen'
                        },
                        debug: FP_RUNTIME_DEBUG,
                        modules: {
                            configureHls: function configureHls(options) {
                                return options;
                            },
                            onBeforeInitHls: function onBeforeInitHls(hls) {},
                            onAfterInitHls: function onAfterInitHls(hls) {},
                            configureDash: function configureDash(options) {
                                return options;
                            },
                            onBeforeInitDash: function onBeforeInitDash(dash) {},
                            onAfterInitDash: function onAfterInitDash(dash) {}
                        },
                        onBeforeXMLHttpRequestOpen: function onBeforeXMLHttpRequestOpen(request) {},
                        onBeforeXMLHttpRequest: function onBeforeXMLHttpRequest(request) {
                            if (FP_RUNTIME_DEBUG || FP_DEVELOPMENT_MODE) {
                                console.debug('[FP_DEBUG] Request made', request);
                            }
                        }
                    };

                    if (!!options.hlsjsConfig) {
                        console.error('[FP_ERROR] player option hlsjsConfig is removed and has no effect. ' + 'Use module callbacks instead!');
                    } // Overriding the default options


                    for (var key in options) {
                        if (!options.hasOwnProperty(key)) {
                            continue;
                        }

                        if (fluidplayer_typeof(options[key]) == "object") {
                            for (var subKey in options[key]) {
                                if (!options[key].hasOwnProperty(subKey)) {
                                    continue;
                                }

                                self.displayOptions[key][subKey] = options[key][subKey];
                            }
                        } else {
                            self.displayOptions[key] = options[key];
                        }
                    }

                    self.domRef.wrapper = self.setupPlayerWrapper();
                    playerNode.addEventListener('webkitfullscreenchange', self.recalculateAdDimensions);
                    playerNode.addEventListener('fullscreenchange', self.recalculateAdDimensions);
                    playerNode.addEventListener('waiting', self.onRecentWaiting);
                    playerNode.addEventListener('pause', self.onFluidPlayerPause);
                    playerNode.addEventListener('loadedmetadata', self.mainVideoReady);
                    playerNode.addEventListener('error', self.onErrorDetection);
                    playerNode.addEventListener('ended', self.onMainVideoEnded);
                    playerNode.addEventListener('durationchange', function () {
                        self.currentVideoDuration = self.getCurrentVideoDuration();
                    });

                    if (self.displayOptions.layoutControls.showCardBoardView) {
                        // This fixes cross origin errors on three.js
                        playerNode.setAttribute('crossOrigin', 'anonymous');
                    } //Manually load the video duration if the video was loaded before adding the event listener


                    self.currentVideoDuration = self.getCurrentVideoDuration();

                    if (isNaN(self.currentVideoDuration) || !isFinite(self.currentVideoDuration)) {
                        self.currentVideoDuration = 0;
                    }

                    self.setLayout(); //Set the volume control state

                    self.latestVolume = playerNode.volume; // Set the default animation setting

                    self.initialAnimationSet = self.displayOptions.layoutControls.playPauseAnimation; //Set the custom fullscreen behaviour

                    self.handleFullscreen();
                    self.initLogo();
                    self.initTitle();
                    self.initMute();
                    self.initLoop();
                    self.displayOptions.layoutControls.playerInitCallback();
                    self.createVideoSourceSwitch();
                    self.createSubtitles();
                    self.createCardboard();
                    self.userActivityChecker();
                    self.setVastList();
                    self.setPersistentSettings(); // DO NOT initialize streamers if there are pre-rolls. It will break the streamers!
                    // Streamers will re-initialize once ad has been shown.

                    var preRolls = self.findRoll('preRoll');

                    if (!preRolls || 0 === preRolls.length) {
                        self.initialiseStreamers();
                    }

                    var _play_videoPlayer = playerNode.play;

                    playerNode.play = function () {
                        var promise = null;

                        if (self.displayOptions.layoutControls.showCardBoardView) {
                            if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                                DeviceOrientationEvent.requestPermission().then(function (response) {
                                    if (response === 'granted') {
                                        self.debugMessage('DeviceOrientationEvent permission granted!');
                                    }
                                }).catch(console.error);
                            }
                        }

                        try {
                            promise = _play_videoPlayer.apply(this, arguments);

                            if (promise !== undefined && promise !== null) {
                                promise.then(function () {
                                    self.isPlayingMedia = true;
                                    clearTimeout(self.promiseTimeout);
                                }).catch(function (error) {
                                    console.error('[FP_ERROR] Playback error', error);
                                    var isAbortError = typeof error.name !== 'undefined' && error.name === 'AbortError'; // Ignore abort errors which caused for example Safari or autoplay functions
                                    // (example: interrupted by a new load request)
                                    // (example: interrupted by a new load request)

                                    if (isAbortError) {// Ignore AbortError error reporting
                                    } else {
                                        self.announceLocalError(202, 'Failed to play video.');
                                    }

                                    clearTimeout(self.promiseTimeout);
                                });
                                self.promiseTimeout = setTimeout(function () {
                                    if (self.isPlayingMedia === false) {
                                        self.announceLocalError(204, '[FP_ERROR] Timeout error. Failed to play video?');
                                    }
                                }, 5000);
                            }

                            return promise;
                        } catch (error) {
                            console.error('[FP_ERROR] Playback error', error);
                            self.announceLocalError(201, 'Failed to play video.');
                        }
                    };

                    var videoPauseOriginal = playerNode.pause;

                    playerNode.pause = function () {
                        if (self.isPlayingMedia === true) {
                            self.isPlayingMedia = false;
                            return videoPauseOriginal.apply(this, arguments);
                        } // just in case


                        if (self.isCurrentlyPlayingVideo(self.domRef.player)) {
                            try {
                                self.isPlayingMedia = false;
                                return videoPauseOriginal.apply(this, arguments);
                            } catch (e) {
                                self.announceLocalError(203, 'Failed to play video.');
                            }
                        }
                    };

                    if (!!self.displayOptions.layoutControls.autoPlay && !self.dashScriptLoaded && !self.hlsScriptLoaded) {
                        //There is known issue with Safari 11+, will prevent autoPlay, so we wont try
                        var browserVersion = self.getBrowserVersion();

                        if ('Safari' === browserVersion.browserName) {
                            return;
                        }

                        playerNode.play();
                    }

                    var videoWrapper = document.getElementById('fluid_video_wrapper_' + playerNode.id);

                    if (!self.mobileInfo.userOs) {
                        videoWrapper.addEventListener('mouseleave', self.handleMouseleave, false);
                        videoWrapper.addEventListener('mouseenter', self.showControlBar, false);
                        videoWrapper.addEventListener('mouseenter', self.showTitle, false);
                    } else {
                        //On mobile mouseleave behavior does not make sense, so it's better to keep controls, once the playback starts
                        //Autohide behavior on timer is a separate functionality
                        self.hideControlBar();
                        videoWrapper.addEventListener('touchstart', self.showControlBar, false);
                    } //Keyboard Controls


                    if (self.displayOptions.layoutControls.keyboardControl) {
                        self.keyboardControl();
                    }

                    if (self.displayOptions.layoutControls.controlBar.autoHide) {
                        self.linkControlBarUserActivity();
                    } // Hide the captions on init if user added subtitles track.
                    // We are taking captions track kind of as metadata


                    try {
                        if (!!self.domRef.player.textTracks) {
                            var _iterator2 = _createForOfIteratorHelper(self.domRef.player.textTracks),
                                _step2;

                            try {
                                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                                    var textTrack = _step2.value;
                                    textTrack.mode = 'hidden';
                                }
                            } catch (err) {
                                _iterator2.e(err);
                            } finally {
                                _iterator2.f();
                            }
                        }
                    } catch (_ignored) {}
                };

                self.getCurrentVideoDuration = function () {
                    if (self.domRef.player) {
                        return self.domRef.player.duration;
                    }

                    return 0;
                };

                self.toggleLoader = function (showLoader) {
                    self.isLoading = !!showLoader;
                    var loaderDiv = document.getElementById('vast_video_loading_' + self.videoPlayerId);
                    loaderDiv.style.display = showLoader ? 'table' : 'none';
                };

                self.sendRequest = function (url, withCredentials, timeout, functionReadyStateChange) {
                    var xmlHttpReq = new XMLHttpRequest();
                    xmlHttpReq.onreadystatechange = functionReadyStateChange;
                    self.displayOptions.onBeforeXMLHttpRequestOpen(xmlHttpReq);
                    xmlHttpReq.open('GET', url, true);
                    xmlHttpReq.withCredentials = withCredentials;
                    xmlHttpReq.timeout = timeout;
                    self.displayOptions.onBeforeXMLHttpRequest(xmlHttpReq);
                    xmlHttpReq.send();
                }; // TODO: rename


                self.announceLocalError = function (code, msg) {
                    var parsedCode = typeof code !== 'undefined' ? parseInt(code) : 900;
                    var message = '[Error] (' + parsedCode + '): ';
                    message += !msg ? 'Failed to load Vast' : msg;
                    console.warn(message);
                }; // TODO: move this somewhere else and refactor


                self.debugMessage = function (msg) {
                    if (self.displayOptions.debug) {
                        console.log(msg);
                    }
                };

                self.onMainVideoEnded = function (event) {
                    self.debugMessage('onMainVideoEnded is called');

                    if (self.isCurrentlyPlayingAd && self.autoplayAfterAd) {
                        // It may be in-stream ending, and if it's not postroll then we don't execute anything
                        return;
                    } //we can remove timer as no more ad will be shown


                    if (Math.floor(self.getCurrentTime()) >= Math.floor(self.mainVideoDuration)) {
                        // play pre-roll ad
                        // sometime pre-roll ad will be missed because we are clearing the timer
                        self.adKeytimePlay(Math.floor(self.mainVideoDuration));
                        clearInterval(self.timer);
                    }

                    if (!!self.displayOptions.layoutControls.loop) {
                        self.switchToMainVideo();
                        self.playPauseToggle();
                    }
                };

                self.getCurrentTime = function () {
                    return self.isCurrentlyPlayingAd ? self.mainVideoCurrentTime : self.domRef.player.currentTime;
                };
                /**
                 * Gets the src value of the first source element of the video tag.
                 *
                 * @returns string|null
                 */


                self.getCurrentSrc = function () {
                    var sources = self.domRef.player.getElementsByTagName('source');

                    if (sources.length) {
                        return sources[0].getAttribute('src');
                    }

                    return null;
                };
                /**
                 * Src types required for streaming elements
                 */


                self.getCurrentSrcType = function () {
                    var sources = self.domRef.player.getElementsByTagName('source');

                    if (!sources.length) {
                        return null;
                    }

                    for (var i = 0; i < sources.length; i++) {
                        if (sources[i].getAttribute('src') === self.originalSrc) {
                            return sources[i].getAttribute('type').toLowerCase();
                        }
                    }

                    return null;
                };

                self.onRecentWaiting = function () {
                    self.recentWaiting = true;
                    setTimeout(function () {
                        self.recentWaiting = false;
                    }, 1000);
                };
                /**
                 * Dispatches a custom pause event which is not present when seeking.
                 */


                self.onFluidPlayerPause = function () {
                    setTimeout(function () {
                        if (self.recentWaiting) {
                            return;
                        }

                        var event = document.createEvent('CustomEvent');
                        event.initEvent('fluidplayerpause', false, true);
                        self.domRef.player.dispatchEvent(event);
                    }, 100);
                };

                self.checkShouldDisplayVolumeBar = function () {
                    return 'iOS' !== self.getMobileOs().userOs;
                };

                self.generateCustomControlTags = function (options) {
                    var controls = {}; // Loader

                    controls.loader = document.createElement('div');
                    controls.loader.className = 'vast_video_loading';
                    controls.loader.id = 'vast_video_loading_' + self.videoPlayerId;
                    controls.loader.style.display = 'none'; // Root element

                    controls.root = document.createElement('div');
                    controls.root.className = 'fluid_controls_container';
                    controls.root.id = self.videoPlayerId + '_fluid_controls_container';

                    if (!options.displayVolumeBar) {
                        controls.root.className = controls.root.className + ' no_volume_bar';
                    }

                    if (options.controlForwardBackward) {
                        controls.root.className = controls.root.className + ' skip_controls';
                    } // Left container


                    controls.leftContainer = document.createElement('div');
                    controls.leftContainer.className = 'fluid_controls_left';
                    controls.root.appendChild(controls.leftContainer); // Left container -> Play/Pause

                    controls.playPause = document.createElement('div');
                    controls.playPause.className = 'fluid_button fluid_button_play fluid_control_playpause';
                    controls.playPause.id = self.videoPlayerId + '_fluid_control_playpause';
                    controls.leftContainer.appendChild(controls.playPause);

                    if (options.controlForwardBackward) {
                        // Left container -> Skip backwards
                        controls.skipBack = document.createElement('div');
                        controls.skipBack.className = 'fluid_button fluid_button_skip_back';
                        controls.skipBack.id = self.videoPlayerId + '_fluid_control_skip_back';
                        controls.leftContainer.appendChild(controls.skipBack); // Left container -> Skip forward

                        controls.skipForward = document.createElement('div');
                        controls.skipForward.className = 'fluid_button fluid_button_skip_forward';
                        controls.skipForward.id = self.videoPlayerId + '_fluid_control_skip_forward';
                        controls.leftContainer.appendChild(controls.skipForward);
                    } // Progress container


                    controls.progressContainer = document.createElement('div');
                    controls.progressContainer.className = 'fluid_controls_progress_container fluid_slider';
                    controls.progressContainer.id = self.videoPlayerId + '_fluid_controls_progress_container';
                    controls.root.appendChild(controls.progressContainer); // Progress container -> Progress wrapper

                    controls.progressWrapper = document.createElement('div');
                    controls.progressWrapper.className = 'fluid_controls_progress';
                    controls.progressContainer.appendChild(controls.progressWrapper); // Progress container -> Progress wrapper -> Current progress

                    controls.progressCurrent = document.createElement('div');
                    controls.progressCurrent.className = 'fluid_controls_currentprogress';
                    controls.progressCurrent.id = self.videoPlayerId + '_vast_control_currentprogress';
                    controls.progressCurrent.style.backgroundColor = options.primaryColor;
                    controls.progressWrapper.appendChild(controls.progressCurrent); // Progress container -> Progress wrapper -> Current progress -> Marker

                    controls.progress_current_marker = document.createElement('div');
                    controls.progress_current_marker.className = 'fluid_controls_currentpos';
                    controls.progress_current_marker.id = self.videoPlayerId + '_vast_control_currentpos';
                    controls.progressCurrent.appendChild(controls.progress_current_marker); // Progress container -> Buffered indicator

                    controls.bufferedIndicator = document.createElement('div');
                    controls.bufferedIndicator.className = 'fluid_controls_buffered';
                    controls.bufferedIndicator.id = self.videoPlayerId + '_buffered_amount';
                    controls.progressContainer.appendChild(controls.bufferedIndicator); // Progress container -> Ad markers

                    controls.adMarkers = document.createElement('div');
                    controls.adMarkers.className = 'fluid_controls_ad_markers_holder';
                    controls.adMarkers.id = self.videoPlayerId + '_ad_markers_holder';
                    controls.progressContainer.appendChild(controls.adMarkers); // Right container

                    controls.rightContainer = document.createElement('div');
                    controls.rightContainer.className = 'fluid_controls_right';
                    controls.root.appendChild(controls.rightContainer); // Right container -> Fullscreen

                    controls.fullscreen = document.createElement('div');
                    controls.fullscreen.id = self.videoPlayerId + '_fluid_control_fullscreen';
                    controls.fullscreen.className = 'fluid_button fluid_control_fullscreen fluid_button_fullscreen';
                    controls.rightContainer.appendChild(controls.fullscreen); // Right container -> Theatre

                    controls.theatre = document.createElement('div');
                    controls.theatre.id = self.videoPlayerId + '_fluid_control_theatre';
                    controls.theatre.className = 'fluid_button fluid_control_theatre fluid_button_theatre';
                    controls.rightContainer.appendChild(controls.theatre); // Right container -> Cardboard

                    controls.cardboard = document.createElement('div');
                    controls.cardboard.id = self.videoPlayerId + '_fluid_control_cardboard';
                    controls.cardboard.className = 'fluid_button fluid_control_cardboard fluid_button_cardboard';
                    controls.rightContainer.appendChild(controls.cardboard); // Right container -> Subtitles

                    controls.subtitles = document.createElement('div');
                    controls.subtitles.id = self.videoPlayerId + '_fluid_control_subtitles';
                    controls.subtitles.className = 'fluid_button fluid_button_subtitles';
                    controls.rightContainer.appendChild(controls.subtitles); // Right container -> Video source

                    controls.videoSource = document.createElement('div');
                    controls.videoSource.id = self.videoPlayerId + '_fluid_control_video_source';
                    controls.videoSource.className = 'fluid_button fluid_button_video_source';
                    controls.rightContainer.appendChild(controls.videoSource); // Right container -> Playback rate

                    controls.playbackRate = document.createElement('div');
                    controls.playbackRate.id = self.videoPlayerId + '_fluid_control_playback_rate';
                    controls.playbackRate.className = 'fluid_button fluid_button_playback_rate';
                    controls.rightContainer.appendChild(controls.playbackRate); // Right container -> Download

                    controls.download = document.createElement('div');
                    controls.download.id = self.videoPlayerId + '_fluid_control_download';
                    controls.download.className = 'fluid_button fluid_button_download';
                    controls.rightContainer.appendChild(controls.download); // Right container -> Volume container

                    controls.volumeContainer = document.createElement('div');
                    controls.volumeContainer.id = self.videoPlayerId + '_fluid_control_volume_container';
                    controls.volumeContainer.className = 'fluid_control_volume_container fluid_slider';
                    controls.rightContainer.appendChild(controls.volumeContainer); // Right container -> Volume container -> Volume

                    controls.volume = document.createElement('div');
                    controls.volume.id = self.videoPlayerId + '_fluid_control_volume';
                    controls.volume.className = 'fluid_control_volume';
                    controls.volumeContainer.appendChild(controls.volume); // Right container -> Volume container -> Volume -> Current

                    controls.volumeCurrent = document.createElement('div');
                    controls.volumeCurrent.id = self.videoPlayerId + '_fluid_control_currentvolume';
                    controls.volumeCurrent.className = 'fluid_control_currentvolume';
                    controls.volume.appendChild(controls.volumeCurrent); // Right container -> Volume container -> Volume -> Current -> position

                    controls.volumeCurrentPos = document.createElement('div');
                    controls.volumeCurrentPos.id = self.videoPlayerId + '_fluid_control_volume_currentpos';
                    controls.volumeCurrentPos.className = 'fluid_control_volume_currentpos';
                    controls.volumeCurrent.appendChild(controls.volumeCurrentPos); // Right container -> Volume container

                    controls.mute = document.createElement('div');
                    controls.mute.id = self.videoPlayerId + '_fluid_control_mute';
                    controls.mute.className = 'fluid_button fluid_button_volume fluid_control_mute';
                    controls.rightContainer.appendChild(controls.mute); // Right container -> Volume container

                    controls.duration = document.createElement('div');
                    controls.duration.id = self.videoPlayerId + '_fluid_control_duration';
                    controls.duration.className = 'fluid_control_duration fluid_fluid_control_duration';
                    controls.duration.innerText = '00:00 / 00:00';
                    controls.rightContainer.appendChild(controls.duration);
                    return controls;
                };

                self.controlPlayPauseToggle = function () {
                    var playPauseButton = self.domRef.player.parentNode.getElementsByClassName('fluid_control_playpause');
                    var menuOptionPlay = document.getElementById(self.videoPlayerId + 'context_option_play');
                    var controlsDisplay = self.domRef.player.parentNode.getElementsByClassName('fluid_controls_container');
                    var fpLogo = document.getElementById(self.videoPlayerId + '_logo');
                    var initialPlay = document.getElementById(self.videoPlayerId + '_fluid_initial_play');

                    if (initialPlay) {
                        document.getElementById(self.videoPlayerId + '_fluid_initial_play').style.display = "none";
                        document.getElementById(self.videoPlayerId + '_fluid_initial_play_button').style.opacity = "1";
                    }

                    if (!self.domRef.player.paused) {
                        for (var i = 0; i < playPauseButton.length; i++) {
                            playPauseButton[i].className = playPauseButton[i].className.replace(/\bfluid_button_play\b/g, 'fluid_button_pause');
                        }

                        for (var _i = 0; _i < controlsDisplay.length; _i++) {
                            controlsDisplay[_i].classList.remove('initial_controls_show');
                        }

                        if (fpLogo) {
                            fpLogo.classList.remove('initial_controls_show');
                        }

                        if (menuOptionPlay !== null) {
                            menuOptionPlay.innerHTML = self.displayOptions.captions.pause;
                        }

                        return;
                    }

                    for (var _i2 = 0; _i2 < playPauseButton.length; _i2++) {
                        playPauseButton[_i2].className = playPauseButton[_i2].className.replace(/\bfluid_button_pause\b/g, 'fluid_button_play');
                    }

                    for (var _i3 = 0; _i3 < controlsDisplay.length; _i3++) {
                        controlsDisplay[_i3].classList.add('initial_controls_show');
                    }

                    if (self.isCurrentlyPlayingAd && self.displayOptions.vastOptions.showPlayButton) {
                        document.getElementById(self.videoPlayerId + '_fluid_initial_play').style.display = "block";
                        document.getElementById(self.videoPlayerId + '_fluid_initial_play_button').style.opacity = "1";
                    }

                    if (fpLogo) {
                        fpLogo.classList.add('initial_controls_show');
                    }

                    if (menuOptionPlay !== null) {
                        menuOptionPlay.innerHTML = self.displayOptions.captions.play;
                    }
                };

                self.playPauseAnimationToggle = function (play) {
                    if (self.isCurrentlyPlayingAd || !self.displayOptions.layoutControls.playPauseAnimation || self.isSwitchingSource) {
                        return;
                    }

                    if (play) {
                        document.getElementById(self.videoPlayerId + '_fluid_state_button').classList.remove('fluid_initial_pause_button');
                        document.getElementById(self.videoPlayerId + '_fluid_state_button').classList.add('fluid_initial_play_button');
                    } else {
                        document.getElementById(self.videoPlayerId + '_fluid_state_button').classList.remove('fluid_initial_play_button');
                        document.getElementById(self.videoPlayerId + '_fluid_state_button').classList.add('fluid_initial_pause_button');
                    }

                    document.getElementById(self.videoPlayerId + '_fluid_initial_play').classList.add('transform-active');
                    setTimeout(function () {
                        document.getElementById(self.videoPlayerId + '_fluid_initial_play').classList.remove('transform-active');
                    }, 800);
                };

                self.contolProgressbarUpdate = function () {
                    var currentProgressTag = self.domRef.player.parentNode.getElementsByClassName('fluid_controls_currentprogress');

                    for (var i = 0; i < currentProgressTag.length; i++) {
                        currentProgressTag[i].style.width = self.domRef.player.currentTime / self.currentVideoDuration * 100 + '%';
                    }
                };

                self.controlDurationUpdate = function () {
                    var currentPlayTime = self.formatTime(self.domRef.player.currentTime);
                    var isLiveHls = false;

                    if (self.hlsPlayer) {
                        isLiveHls = self.hlsPlayer.levels && self.hlsPlayer.levels[self.hlsPlayer.currentLevel] && self.hlsPlayer.levels[self.hlsPlayer.currentLevel].details.live;
                    }

                    var durationText;

                    if (isNaN(self.currentVideoDuration) || !isFinite(self.currentVideoDuration) || isLiveHls) {
                        durationText = currentPlayTime;
                    } else {
                        var totalTime = self.formatTime(self.currentVideoDuration);
                        durationText = currentPlayTime + ' / ' + totalTime;
                    }

                    var timePlaceholder = self.domRef.player.parentNode.getElementsByClassName('fluid_control_duration');

                    for (var i = 0; i < timePlaceholder.length; i++) {
                        timePlaceholder[i].innerHTML = durationText;
                    }
                };

                self.contolVolumebarUpdate = function () {
                    var currentVolumeTag = document.getElementById(self.videoPlayerId + '_fluid_control_currentvolume');
                    var volumeposTag = document.getElementById(self.videoPlayerId + '_fluid_control_volume_currentpos');
                    var volumebarTotalWidth = document.getElementById(self.videoPlayerId + '_fluid_control_volume').clientWidth;
                    var volumeposTagWidth = volumeposTag.clientWidth;
                    var muteButtonTag = self.domRef.player.parentNode.getElementsByClassName('fluid_control_mute');
                    var menuOptionMute = document.getElementById(self.videoPlayerId + 'context_option_mute');

                    if (0 !== self.domRef.player.volume) {
                        self.latestVolume = self.domRef.player.volume;
                        self.fluidStorage.fluidMute = false;
                    } else {
                        self.fluidStorage.fluidMute = true;
                    }

                    if (self.domRef.player.volume && !self.domRef.player.muted) {
                        for (var i = 0; i < muteButtonTag.length; i++) {
                            muteButtonTag[i].className = muteButtonTag[i].className.replace(/\bfluid_button_mute\b/g, 'fluid_button_volume');
                        }

                        if (menuOptionMute !== null) {
                            menuOptionMute.innerHTML = self.displayOptions.captions.mute;
                        }
                    } else {
                        for (var _i4 = 0; _i4 < muteButtonTag.length; _i4++) {
                            muteButtonTag[_i4].className = muteButtonTag[_i4].className.replace(/\bfluid_button_volume\b/g, 'fluid_button_mute');
                        }

                        if (menuOptionMute !== null) {
                            menuOptionMute.innerHTML = self.displayOptions.captions.unmute;
                        }
                    }

                    currentVolumeTag.style.width = self.domRef.player.volume * volumebarTotalWidth + 'px';
                    volumeposTag.style.left = self.domRef.player.volume * volumebarTotalWidth - volumeposTagWidth / 2 + 'px';
                };

                self.muteToggle = function () {
                    if (0 !== self.domRef.player.volume && !self.domRef.player.muted) {
                        self.domRef.player.volume = 0;
                        self.domRef.player.muted = true;
                    } else {
                        self.domRef.player.volume = self.latestVolume;
                        self.domRef.player.muted = false;
                    } // Persistent settings


                    self.fluidStorage.fluidVolume = self.latestVolume;
                    self.fluidStorage.fluidMute = self.domRef.player.muted;
                };

                self.checkFullscreenSupport = function (videoPlayerWrapperId) {
                    var videoPlayerWrapper = document.getElementById(videoPlayerWrapperId);

                    if (videoPlayerWrapper.mozRequestFullScreen) {
                        return {
                            goFullscreen: 'mozRequestFullScreen',
                            exitFullscreen: 'mozCancelFullScreen',
                            isFullscreen: 'mozFullScreenElement'
                        };
                    } else if (videoPlayerWrapper.webkitRequestFullscreen) {
                        return {
                            goFullscreen: 'webkitRequestFullscreen',
                            exitFullscreen: 'webkitExitFullscreen',
                            isFullscreen: 'webkitFullscreenElement'
                        };
                    } else if (videoPlayerWrapper.msRequestFullscreen) {
                        return {
                            goFullscreen: 'msRequestFullscreen',
                            exitFullscreen: 'msExitFullscreen',
                            isFullscreen: 'msFullscreenElement'
                        };
                    } else if (videoPlayerWrapper.requestFullscreen) {
                        return {
                            goFullscreen: 'requestFullscreen',
                            exitFullscreen: 'exitFullscreen',
                            isFullscreen: 'fullscreenElement'
                        };
                    } else if (self.domRef.player.webkitSupportsFullscreen) {
                        return {
                            goFullscreen: 'webkitEnterFullscreen',
                            exitFullscreen: 'webkitExitFullscreen',
                            isFullscreen: 'webkitDisplayingFullscreen'
                        };
                    }

                    return false;
                };

                self.fullscreenOff = function (fullscreenButton, menuOptionFullscreen) {
                    for (var i = 0; i < fullscreenButton.length; i++) {
                        fullscreenButton[i].className = fullscreenButton[i].className.replace(/\bfluid_button_fullscreen_exit\b/g, 'fluid_button_fullscreen');
                    }

                    if (menuOptionFullscreen !== null) {
                        menuOptionFullscreen.innerHTML = 'Fullscreen';
                    }

                    self.fullscreenMode = false;
                };

                self.fullscreenOn = function (fullscreenButton, menuOptionFullscreen) {
                    for (var i = 0; i < fullscreenButton.length; i++) {
                        fullscreenButton[i].className = fullscreenButton[i].className.replace(/\bfluid_button_fullscreen\b/g, 'fluid_button_fullscreen_exit');
                    }

                    if (menuOptionFullscreen !== null) {
                        menuOptionFullscreen.innerHTML = self.displayOptions.captions.exitFullscreen;
                    }

                    self.fullscreenMode = true;
                };

                self.fullscreenToggle = function () {
                    var videoPlayerTag = self.domRef.player;
                    var fullscreenTag = document.getElementById('fluid_video_wrapper_' + self.videoPlayerId);
                    var requestFullscreenFunctionNames = self.checkFullscreenSupport('fluid_video_wrapper_' + self.videoPlayerId);
                    var fullscreenButton = videoPlayerTag.parentNode.getElementsByClassName('fluid_control_fullscreen');
                    var menuOptionFullscreen = document.getElementById(self.videoPlayerId + 'context_option_fullscreen'); // Disable Theatre mode if it's on while we toggle fullscreen

                    if (self.theatreMode) {
                        self.theatreToggle();
                    }

                    var functionNameToExecute;

                    if (requestFullscreenFunctionNames) {
                        // iOS fullscreen elements are different and so need to be treated separately
                        if (requestFullscreenFunctionNames.goFullscreen === 'webkitEnterFullscreen') {
                            if (!videoPlayerTag[requestFullscreenFunctionNames.isFullscreen]) {
                                functionNameToExecute = 'videoPlayerTag.' + requestFullscreenFunctionNames.goFullscreen + '();';
                                self.fullscreenOn(fullscreenButton, menuOptionFullscreen);
                                new Function('videoPlayerTag', functionNameToExecute)(videoPlayerTag);
                            }
                        } else {
                            if (document[requestFullscreenFunctionNames.isFullscreen] === null) {
                                //Go fullscreen
                                functionNameToExecute = 'videoPlayerTag.' + requestFullscreenFunctionNames.goFullscreen + '();';
                                self.fullscreenOn(fullscreenButton, menuOptionFullscreen);
                            } else {
                                //Exit fullscreen
                                functionNameToExecute = 'document.' + requestFullscreenFunctionNames.exitFullscreen + '();';
                                self.fullscreenOff(fullscreenButton, menuOptionFullscreen);
                            }

                            new Function('videoPlayerTag', functionNameToExecute)(fullscreenTag);
                        }
                    } else {
                        //The browser does not support the Fullscreen API, so a pseudo-fullscreen implementation is used
                        if (fullscreenTag.className.search(/\bpseudo_fullscreen\b/g) !== -1) {
                            fullscreenTag.className = fullscreenTag.className.replace(/\bpseudo_fullscreen\b/g, '');
                            self.fullscreenOff(fullscreenButton, menuOptionFullscreen);
                        } else {
                            fullscreenTag.className += ' pseudo_fullscreen';
                            self.fullscreenOn(fullscreenButton, menuOptionFullscreen);
                        }
                    }

                    self.resizeVpaidAuto();
                };

                self.findClosestParent = function (el, selector) {
                    var matchesFn = null; // find vendor prefix

                    ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
                        if (typeof document.body[fn] == 'function') {
                            matchesFn = fn;
                            return true;
                        }

                        return false;
                    });
                    var parent; // Check if the current element matches the selector

                    if (el[matchesFn](selector)) {
                        return el;
                    } // traverse parents


                    while (el) {
                        parent = el.parentElement;

                        if (parent && parent[matchesFn](selector)) {
                            return parent;
                        }

                        el = parent;
                    }

                    return null;
                };

                self.getTranslateX = function (el) {
                    var coordinates = null;

                    try {
                        var results = el.style.transform.match(/translate3d\((-?\d+px,\s?){2}-?\d+px\)/);

                        if (results && results.length) {
                            coordinates = results[0].replace('translate3d(', '').replace(')', '').replace(/\s/g, '').replace(/px/g, '').split(',');
                        }
                    } catch (e) {
                        coordinates = null;
                    }

                    return coordinates && coordinates.length === 3 ? parseInt(coordinates[0]) : 0;
                };

                self.getEventOffsetX = function (evt, el) {
                    var x = 0;
                    var translateX = 0;

                    while (el && !isNaN(el.offsetLeft)) {
                        translateX = self.getTranslateX(el);

                        if (el.tagName === 'BODY') {
                            x += el.offsetLeft + el.clientLeft + translateX - (el.scrollLeft || document.documentElement.scrollLeft);
                        } else {
                            x += el.offsetLeft + el.clientLeft + translateX - el.scrollLeft;
                        }

                        el = el.offsetParent;
                    }

                    var eventX;

                    if (typeof evt.touches !== 'undefined' && typeof evt.touches[0] !== 'undefined') {
                        eventX = evt.touches[0].clientX;
                    } else {
                        eventX = evt.clientX;
                    }

                    return eventX - x;
                };

                self.getEventOffsetY = function (evt, el) {
                    var fullscreenMultiplier = 1;
                    var videoWrapper = self.findClosestParent(el, 'div[id^="fluid_video_wrapper_"]');

                    if (videoWrapper) {
                        var videoPlayerId = videoWrapper.id.replace('fluid_video_wrapper_', '');
                        var requestFullscreenFunctionNames = self.checkFullscreenSupport('fluid_video_wrapper_' + videoPlayerId);

                        if (requestFullscreenFunctionNames && document[requestFullscreenFunctionNames.isFullscreen]) {
                            fullscreenMultiplier = 0;
                        }
                    }

                    var y = 0;

                    while (el && !isNaN(el.offsetTop)) {
                        if (el.tagName === 'BODY') {
                            y += el.offsetTop - (el.scrollTop || document.documentElement.scrollTop) * fullscreenMultiplier;
                        } else {
                            y += el.offsetTop - el.scrollTop * fullscreenMultiplier;
                        }

                        el = el.offsetParent;
                    }

                    return evt.clientY - y;
                };

                self.onProgressbarMouseDown = function (event) {
                    self.displayOptions.layoutControls.playPauseAnimation = false; // we need an initial position for touchstart events, as mouse up has no offset x for iOS

                    var initialPosition;

                    if (self.displayOptions.layoutControls.showCardBoardView) {
                        initialPosition = self.getEventOffsetX(event, event.target.parentNode);
                    } else {
                        initialPosition = self.getEventOffsetX(event, document.getElementById(self.videoPlayerId + '_fluid_controls_progress_container'));
                    }

                    if (self.isCurrentlyPlayingAd) {
                        return;
                    }

                    self.fluidPseudoPause = true;
                    var initiallyPaused = self.domRef.player.paused;

                    if (!initiallyPaused) {
                        self.domRef.player.pause();
                    }

                    var shiftTime = function shiftTime(timeBarX) {
                        var totalWidth = document.getElementById(self.videoPlayerId + '_fluid_controls_progress_container').clientWidth;

                        if (totalWidth) {
                            self.domRef.player.currentTime = self.currentVideoDuration * timeBarX / totalWidth;
                        }
                    };

                    var onProgressbarMouseMove = function onProgressbarMouseMove(event) {
                        var currentX = self.getEventOffsetX(event, event.target.parentNode);
                        initialPosition = NaN; // mouse up will fire after the move, we don't want to trigger the initial position in the event of iOS

                        shiftTime(currentX);
                        self.contolProgressbarUpdate(self.videoPlayerId);
                        self.controlDurationUpdate(self.videoPlayerId);
                    };

                    var onProgressbarMouseUp = function onProgressbarMouseUp(event) {
                        document.removeEventListener('mousemove', onProgressbarMouseMove);
                        document.removeEventListener('touchmove', onProgressbarMouseMove);
                        document.removeEventListener('mouseup', onProgressbarMouseUp);
                        document.removeEventListener('touchend', onProgressbarMouseUp);
                        var clickedX = self.getEventOffsetX(event, event.target.parentNode);

                        if (isNaN(clickedX) && !isNaN(initialPosition)) {
                            clickedX = initialPosition;
                        }

                        if (!isNaN(clickedX)) {
                            shiftTime(clickedX);
                        }

                        if (!initiallyPaused) {
                            self.play();
                        } // Wait till video played then re-enable the animations


                        if (self.initialAnimationSet) {
                            setTimeout(function () {
                                self.displayOptions.layoutControls.playPauseAnimation = self.initialAnimationSet;
                            }, 200);
                        }

                        self.fluidPseudoPause = false;
                    };

                    document.addEventListener('mouseup', onProgressbarMouseUp);
                    document.addEventListener('touchend', onProgressbarMouseUp);
                    document.addEventListener('mousemove', onProgressbarMouseMove);
                    document.addEventListener('touchmove', onProgressbarMouseMove);
                };

                self.onVolumeBarMouseDown = function () {
                    var shiftVolume = function shiftVolume(volumeBarX) {
                        var totalWidth = self.domRef.controls.volumeContainer.clientWidth;

                        if (totalWidth) {
                            var newVolume = volumeBarX / totalWidth;

                            if (newVolume < 0.05) {
                                newVolume = 0;
                                self.domRef.player.muted = true;
                            } else if (newVolume > 0.95) {
                                newVolume = 1;
                            }

                            if (self.domRef.player.muted && newVolume > 0) {
                                self.domRef.player.muted = false;
                            }

                            self.setVolume(newVolume);
                        }
                    };

                    var onVolumeBarMouseMove = function onVolumeBarMouseMove(event) {
                        var currentX = self.getEventOffsetX(event, self.domRef.controls.volumeContainer);
                        shiftVolume(currentX);
                    };

                    var onVolumeBarMouseUp = function onVolumeBarMouseUp(event) {
                        document.removeEventListener('mousemove', onVolumeBarMouseMove);
                        document.removeEventListener('touchmove', onVolumeBarMouseMove);
                        document.removeEventListener('mouseup', onVolumeBarMouseUp);
                        document.removeEventListener('touchend', onVolumeBarMouseUp);
                        var currentX = self.getEventOffsetX(event, self.domRef.controls.volumeContainer);

                        if (!isNaN(currentX)) {
                            shiftVolume(currentX);
                        }
                    };

                    document.addEventListener('mouseup', onVolumeBarMouseUp);
                    document.addEventListener('touchend', onVolumeBarMouseUp);
                    document.addEventListener('mousemove', onVolumeBarMouseMove);
                    document.addEventListener('touchmove', onVolumeBarMouseMove);
                };

                self.findRoll = function (roll) {
                    var ids = [];
                    ids.length = 0;

                    if (!roll || !self.hasOwnProperty('adList')) {
                        return;
                    }

                    for (var key in self.adList) {
                        if (!self.adList.hasOwnProperty(key)) {
                            continue;
                        }

                        if (self.adList[key].roll === roll) {
                            ids.push(key);
                        }
                    }

                    return ids;
                };

                self.onKeyboardVolumeChange = function (direction) {
                    var volume = self.domRef.player.volume;

                    if ('asc' === direction) {
                        volume += 0.05;
                    } else if ('desc' === direction) {
                        volume -= 0.05;
                    }

                    if (volume < 0.05) {
                        volume = 0;
                    } else if (volume > 0.95) {
                        volume = 1;
                    }

                    self.setVolume(volume);
                };

                self.onKeyboardSeekPosition = function (keyCode) {
                    if (self.isCurrentlyPlayingAd) {
                        return;
                    }

                    self.domRef.player.currentTime = self.getNewCurrentTimeValueByKeyCode(keyCode, self.domRef.player.currentTime, self.domRef.player.duration);
                };

                self.getNewCurrentTimeValueByKeyCode = function (keyCode, currentTime, duration) {
                    var newCurrentTime = currentTime;

                    switch (keyCode) {
                        case 37:
                            //left arrow
                            newCurrentTime -= 5;
                            newCurrentTime = newCurrentTime < 5 ? 0 : newCurrentTime;
                            break;

                        case 39:
                            //right arrow
                            newCurrentTime += 5;
                            newCurrentTime = newCurrentTime > duration - 5 ? duration : newCurrentTime;
                            break;

                        case 35:
                            //End
                            newCurrentTime = duration;
                            break;

                        case 36:
                            //Home
                            newCurrentTime = 0;
                            break;

                        case 48: //0

                        case 49: //1

                        case 50: //2

                        case 51: //3

                        case 52: //4

                        case 53: //5

                        case 54: //6

                        case 55: //7

                        case 56: //8

                        case 57:
                            //9
                            if (keyCode < 58 && keyCode > 47) {
                                var percent = (keyCode - 48) * 10;
                                newCurrentTime = duration * percent / 100;
                            }

                            break;
                    }

                    return newCurrentTime;
                };

                self.handleMouseleave = function (event) {
                    if (typeof event.clientX !== 'undefined' && self.domRef.wrapper.contains(document.elementFromPoint(event.clientX, event.clientY))) {
                        //false positive; we didn't actually leave the player
                        return;
                    }

                    self.hideControlBar();
                    self.hideTitle();
                };

                self.handleMouseenterForKeyboard = function () {
                    if (self.captureKey) {
                        return;
                    }

                    self.captureKey = function (event) {
                        event.stopPropagation();
                        var keyCode = event.keyCode;

                        switch (keyCode) {
                            case 70:
                                //f
                                self.fullscreenToggle();
                                event.preventDefault();
                                break;

                            case 13: //Enter

                            case 32:
                                //Space
                                self.playPauseToggle();
                                event.preventDefault();
                                break;

                            case 77:
                                //m
                                self.muteToggle();
                                event.preventDefault();
                                break;

                            case 38:
                                //up arrow
                                self.onKeyboardVolumeChange('asc');
                                event.preventDefault();
                                break;

                            case 40:
                                //down arrow
                                self.onKeyboardVolumeChange('desc');
                                event.preventDefault();
                                break;

                            case 37: //left arrow

                            case 39: //right arrow

                            case 35: //End

                            case 36: //Home

                            case 48: //0

                            case 49: //1

                            case 50: //2

                            case 51: //3

                            case 52: //4

                            case 53: //5

                            case 54: //6

                            case 55: //7

                            case 56: //8

                            case 57:
                                //9
                                self.onKeyboardSeekPosition(keyCode);
                                event.preventDefault();
                                break;
                        }

                        return false;
                    };

                    document.addEventListener('keydown', self.captureKey, true);
                };

                self.keyboardControl = function () {
                    self.domRef.wrapper.addEventListener('click', self.handleMouseenterForKeyboard, false); // When we click outside player, we stop registering keyboard events

                    var clickHandler = self.handleWindowClick.bind(self);
                    self.destructors.push(function () {
                        window.removeEventListener('click', clickHandler);
                    });
                    window.addEventListener('click', clickHandler);
                };

                self.handleWindowClick = function (e) {
                    if (!self.domRef.wrapper) {
                        console.warn('Dangling click event listener should be collected for unknown wrapper ' + self.videoPlayerId + '. Did you forget to call destroy on player instance?');
                        return;
                    }

                    var inScopeClick = self.domRef.wrapper.contains(e.target) || e.target.id === 'skipHref_' + self.videoPlayerId;

                    if (inScopeClick) {
                        return;
                    }

                    document.removeEventListener('keydown', self.captureKey, true);
                    delete self['captureKey'];

                    if (self.theatreMode && !self.theatreModeAdvanced) {
                        self.theatreToggle();
                    }
                };

                self.initialPlay = function () {
                    self.domRef.player.addEventListener('playing', function () {
                        self.toggleLoader(false);
                    });
                    self.domRef.player.addEventListener('timeupdate', function () {
                        // some places we are manually displaying toggleLoader
                        // user experience toggleLoader being displayed even when content is playing in background
                        self.toggleLoader(false);
                    });
                    self.domRef.player.addEventListener('waiting', function () {
                        self.toggleLoader(true);
                    });

                    if (!self.displayOptions.layoutControls.playButtonShowing) {
                        // Controls always showing until the video is first played
                        var initialControlsDisplay = document.getElementById(self.videoPlayerId + '_fluid_controls_container');
                        initialControlsDisplay.classList.remove('initial_controls_show'); // The logo shows before playing but may need to be removed

                        var fpPlayer = document.getElementById(self.videoPlayerId + '_logo');

                        if (fpPlayer) {
                            fpPlayer.classList.remove('initial_controls_show');
                        }
                    }

                    if (!self.firstPlayLaunched) {
                        self.playPauseToggle();
                        self.domRef.player.removeEventListener('play', self.initialPlay);
                    }
                };

                self.playPauseToggle = function () {
                    var isFirstStart = !self.firstPlayLaunched;
                    var preRolls = self.findRoll('preRoll');

                    if (!isFirstStart || preRolls.length === 0) {
                        if (isFirstStart && preRolls.length === 0) {
                            self.firstPlayLaunched = true;
                            self.displayOptions.vastOptions.vastAdvanced.noVastVideoCallback();
                        }

                        if (self.domRef.player.paused) {
                            if (self.isCurrentlyPlayingAd && self.vastOptions !== null && self.vastOptions.vpaid) {
                                // resume the vpaid linear ad
                                self.resumeVpaidAd();
                            } else {
                                // resume the regular linear vast or content video player
                                if (self.dashPlayer) {
                                    self.dashPlayer.play();
                                } else {
                                    self.domRef.player.play();
                                }
                            }

                            self.playPauseAnimationToggle(true);
                        } else if (!isFirstStart) {
                            if (self.isCurrentlyPlayingAd && self.vastOptions !== null && self.vastOptions.vpaid) {
                                // pause the vpaid linear ad
                                self.pauseVpaidAd();
                            } else {
                                // pause the regular linear vast or content video player
                                self.domRef.player.pause();
                            }

                            self.playPauseAnimationToggle(false);
                        }

                        self.toggleOnPauseAd();
                    } else {
                        self.isCurrentlyPlayingAd = true; // Workaround for Safari or Mobile Chrome - otherwise it blocks the subsequent
                        // play() command, because it considers it not being triggered by the user.
                        // The URL is hardcoded here to cover widest possible use cases.
                        // If you know of an alternative workaround for this issue - let us know!

                        var browserVersion = self.getBrowserVersion();
                        var isChromeAndroid = self.mobileInfo.userOs !== false && self.mobileInfo.userOs === 'Android' && browserVersion.browserName === 'Google Chrome';

                        if ('Safari' === browserVersion.browserName || isChromeAndroid) {
                            self.domRef.player.src = 'https://cdn.fluidplayer.com/static/blank.mp4';
                            self.domRef.player.play();
                            self.playPauseAnimationToggle(true);
                        }

                        self.firstPlayLaunched = true; //trigger the loading of the VAST Tag

                        self.prepareVast('preRoll');
                        self.preRollAdPodsLength = preRolls.length;
                    }

                    var prepareVastAdsThatKnowDuration = function prepareVastAdsThatKnowDuration() {
                        self.prepareVast('onPauseRoll');
                        self.prepareVast('postRoll');
                        self.prepareVast('midRoll');
                    };

                    if (isFirstStart) {
                        // Remove the div that was placed as a fix for poster image and DASH streaming, if it exists
                        var pseudoPoster = document.getElementById(self.videoPlayerId + '_fluid_pseudo_poster');

                        if (pseudoPoster) {
                            pseudoPoster.parentNode.removeChild(pseudoPoster);
                        }

                        if (self.mainVideoDuration > 0) {
                            prepareVastAdsThatKnowDuration();
                        } else {
                            self.domRef.player.addEventListener('mainVideoDurationSet', prepareVastAdsThatKnowDuration);
                        }
                    }

                    self.adTimer();
                    var blockOnPause = document.getElementById(self.videoPlayerId + '_fluid_html_on_pause');

                    if (blockOnPause && !self.isCurrentlyPlayingAd) {
                        if (self.domRef.player.paused) {
                            blockOnPause.style.display = 'flex';
                        } else {
                            blockOnPause.style.display = 'none';
                        }
                    }
                };

                self.setCustomControls = function () {
                    //Set the Play/Pause behaviour
                    self.trackEvent(self.domRef.player.parentNode, 'click', '.fluid_control_playpause', function () {
                        if (!self.firstPlayLaunched) {
                            self.domRef.player.removeEventListener('play', self.initialPlay);
                        }

                        self.playPauseToggle();
                    }, false);
                    self.domRef.player.addEventListener('play', function () {
                        self.controlPlayPauseToggle();
                        self.contolVolumebarUpdate();
                    }, false);
                    self.domRef.player.addEventListener('fluidplayerpause', function () {
                        self.controlPlayPauseToggle();
                    }, false); //Set the progressbar

                    self.domRef.player.addEventListener('timeupdate', function () {
                        self.contolProgressbarUpdate();
                        self.controlDurationUpdate();
                    });
                    var isMobileChecks = self.getMobileOs();
                    var eventOn = isMobileChecks.userOs ? 'touchstart' : 'mousedown';

                    if (self.displayOptions.layoutControls.showCardBoardView) {
                        self.trackEvent(self.domRef.player.parentNode, eventOn, '.fluid_controls_progress_container', function (event) {
                            return self.onProgressbarMouseDown(event);
                        }, false);
                    } else {
                        document.getElementById(self.videoPlayerId + '_fluid_controls_progress_container').addEventListener(eventOn, function (event) {
                            return self.onProgressbarMouseDown(event);
                        }, false);
                    } //Set the volume controls


                    document.getElementById(self.videoPlayerId + '_fluid_control_volume_container').addEventListener(eventOn, function (event) {
                        return self.onVolumeBarMouseDown();
                    }, false);
                    self.domRef.player.addEventListener('volumechange', function () {
                        return self.contolVolumebarUpdate();
                    });
                    self.trackEvent(self.domRef.player.parentNode, 'click', '.fluid_control_mute', function () {
                        return self.muteToggle();
                    });
                    self.setBuffering(); //Set the fullscreen control

                    self.trackEvent(self.domRef.player.parentNode, 'click', '.fluid_control_fullscreen', function () {
                        return self.fullscreenToggle();
                    }); // Theatre mode

                    if (self.displayOptions.layoutControls.allowTheatre && !self.isInIframe) {
                        document.getElementById(self.videoPlayerId + '_fluid_control_theatre').style.display = 'inline-block';
                        self.trackEvent(self.domRef.player.parentNode, 'click', '.fluid_control_theatre', function () {
                            return self.theatreToggle();
                        });
                    } else {
                        document.getElementById(self.videoPlayerId + '_fluid_control_theatre').style.display = 'none';
                    }

                    self.domRef.player.addEventListener('ratechange', function () {
                        if (self.isCurrentlyPlayingAd) {
                            self.playbackRate = 1;
                        }
                    });
                }; // Create the time position preview only if the vtt previews aren't enabled


                self.createTimePositionPreview = function () {
                    if (!self.showTimeOnHover) {
                        return;
                    }

                    var progressContainer = document.getElementById(self.videoPlayerId + '_fluid_controls_progress_container');
                    var previewContainer = document.createElement('div');
                    previewContainer.id = self.videoPlayerId + '_fluid_timeline_preview';
                    previewContainer.className = 'fluid_timeline_preview';
                    previewContainer.style.display = 'none';
                    previewContainer.style.position = 'absolute';
                    progressContainer.appendChild(previewContainer); // Set up hover for time position preview display

                    document.getElementById(self.videoPlayerId + '_fluid_controls_progress_container').addEventListener('mousemove', function (event) {
                        var progressContainer = document.getElementById(self.videoPlayerId + '_fluid_controls_progress_container');
                        var totalWidth = progressContainer.clientWidth;
                        var hoverTimeItem = document.getElementById(self.videoPlayerId + '_fluid_timeline_preview');
                        var hoverQ = self.getEventOffsetX(event, progressContainer);
                        var hoverSecondQ = self.currentVideoDuration * hoverQ / totalWidth;
                        hoverTimeItem.innerText = self.formatTime(hoverSecondQ);
                        hoverTimeItem.style.display = 'block';
                        hoverTimeItem.style.left = hoverSecondQ / self.domRef.player.duration * 100 + "%";
                    }, false); // Hide timeline preview on mouseout

                    document.getElementById(self.videoPlayerId + '_fluid_controls_progress_container').addEventListener('mouseout', function () {
                        var hoverTimeItem = document.getElementById(self.videoPlayerId + '_fluid_timeline_preview');
                        hoverTimeItem.style.display = 'none';
                    }, false);
                };

                self.setCustomContextMenu = function () {
                    var playerWrapper = self.domRef.wrapper;
                    var showDefaultControls = self.displayOptions.layoutControls.contextMenu.controls;
                    var extraLinks = self.displayOptions.layoutControls.contextMenu.links; //Create own context menu

                    var divContextMenu = document.createElement('div');
                    divContextMenu.id = self.videoPlayerId + '_fluid_context_menu';
                    divContextMenu.className = 'fluid_context_menu';
                    divContextMenu.style.display = 'none';
                    divContextMenu.style.position = 'absolute';
                    var contextMenuList = document.createElement('ul');
                    divContextMenu.appendChild(contextMenuList);

                    if (!!extraLinks) {
                        var _iterator3 = _createForOfIteratorHelper(extraLinks),
                            _step3;

                        try {
                            var _loop = function _loop() {
                                var link = _step3.value;
                                var linkItem = document.createElement('li');
                                linkItem.id = self.videoPlayerId + 'context_option_play';
                                linkItem.innerHTML = link.label;
                                linkItem.addEventListener('click', function () {
                                    return window.open(link.href, '_blank');
                                }, false);
                                contextMenuList.appendChild(linkItem);
                            };

                            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                                _loop();
                            }
                        } catch (err) {
                            _iterator3.e(err);
                        } finally {
                            _iterator3.f();
                        }
                    }

                    if (showDefaultControls) {
                        var menuItemPlay = document.createElement('li');
                        menuItemPlay.id = self.videoPlayerId + 'context_option_play';
                        menuItemPlay.innerHTML = self.displayOptions.captions.play;
                        menuItemPlay.addEventListener('click', function () {
                            return self.playPauseToggle();
                        }, false);
                        contextMenuList.appendChild(menuItemPlay);
                        var menuItemMute = document.createElement('li');
                        menuItemMute.id = self.videoPlayerId + 'context_option_mute';
                        menuItemMute.innerHTML = self.displayOptions.captions.mute;
                        menuItemMute.addEventListener('click', function () {
                            return self.muteToggle();
                        }, false);
                        contextMenuList.appendChild(menuItemMute);
                        var menuItemFullscreen = document.createElement('li');
                        menuItemFullscreen.id = self.videoPlayerId + 'context_option_fullscreen';
                        menuItemFullscreen.innerHTML = self.displayOptions.captions.fullscreen;
                        menuItemFullscreen.addEventListener('click', function () {
                            return self.fullscreenToggle();
                        }, false);
                        contextMenuList.appendChild(menuItemFullscreen);
                    }

                    var menuItemVersion = document.createElement('li');
                    menuItemVersion.id = self.videoPlayerId + 'context_option_homepage';
                    menuItemVersion.innerHTML = 'Fluid Player ' + self.version;
                    menuItemVersion.addEventListener('click', function () {
                        return window.open(self.homepage, '_blank');
                    }, false);
                    contextMenuList.appendChild(menuItemVersion);
                    self.domRef.player.parentNode.insertBefore(divContextMenu, self.domRef.player.nextSibling); //Disable the default context menu

                    playerWrapper.addEventListener('contextmenu', function (e) {
                        e.preventDefault();
                        divContextMenu.style.left = self.getEventOffsetX(e, self.domRef.player) + 'px';
                        divContextMenu.style.top = self.getEventOffsetY(e, self.domRef.player) + 'px';
                        divContextMenu.style.display = 'block';
                    }, false); //Hide the context menu on clicking elsewhere

                    document.addEventListener('click', function (e) {
                        if (e.target !== self.domRef.player || e.button !== 2) {
                            divContextMenu.style.display = 'none';
                        }
                    }, false);
                };

                self.setDefaultLayout = function () {
                    self.domRef.wrapper.className += ' fluid_player_layout_' + self.displayOptions.layoutControls.layout;
                    self.setCustomContextMenu();
                    var controls = self.generateCustomControlTags({
                        displayVolumeBar: self.checkShouldDisplayVolumeBar(),
                        primaryColor: self.displayOptions.layoutControls.primaryColor ? self.displayOptions.layoutControls.primaryColor : 'red',
                        controlForwardBackward: !!self.displayOptions.layoutControls.controlForwardBackward.show
                    }); // Remove the default controls

                    self.domRef.player.removeAttribute('controls'); // Insert custom controls and append loader

                    self.domRef.player.parentNode.insertBefore(controls.root, self.domRef.player.nextSibling);
                    self.domRef.player.parentNode.insertBefore(controls.loader, self.domRef.player.nextSibling); // Register controls locally

                    self.domRef.controls = controls;
                    /**
                     * Set the volumebar after its elements are properly rendered.
                     */

                    var remainingAttemptsToInitiateVolumeBar = 100;

                    var initiateVolumebar = function initiateVolumebar() {
                        if (!remainingAttemptsToInitiateVolumeBar) {
                            clearInterval(initiateVolumebarTimerId);
                        } else if (self.checkIfVolumebarIsRendered()) {
                            clearInterval(initiateVolumebarTimerId);
                            self.contolVolumebarUpdate(self.videoPlayerId);
                        } else {
                            remainingAttemptsToInitiateVolumeBar--;
                        }
                    };

                    var initiateVolumebarTimerId = setInterval(initiateVolumebar, 100);

                    if (self.displayOptions.layoutControls.doubleclickFullscreen) {
                        self.domRef.player.addEventListener('dblclick', self.fullscreenToggle);
                    }

                    self.initHtmlOnPauseBlock();
                    self.setCustomControls();
                    self.setupThumbnailPreview();
                    self.createTimePositionPreview();
                    self.posterImage();
                    self.initPlayButton();
                    self.setVideoPreload();
                    self.createPlaybackList();
                    self.createDownload();

                    if (!!self.displayOptions.layoutControls.controlForwardBackward.show) {
                        self.initSkipControls();
                    }
                };

                self.initSkipControls = function () {
                    var skipFunction = function skipFunction(period) {
                        if (self.isCurrentlyPlayingAd) {
                            return;
                        }

                        var skipTo = self.domRef.player.currentTime + period;

                        if (skipTo < 0) {
                            skipTo = 0;
                        }

                        self.domRef.player.currentTime = skipTo;
                    };

                    self.domRef.controls.skipBack.addEventListener('click', skipFunction.bind(_this, -10));
                    self.domRef.controls.skipForward.addEventListener('click', skipFunction.bind(_this, 10));
                };
                /**
                 * Checks if the volumebar is rendered and the styling applied by comparing
                 * the width of 2 elements that should look different.
                 *
                 * @returns Boolean
                 */


                self.checkIfVolumebarIsRendered = function () {
                    var volumeposTag = document.getElementById(self.videoPlayerId + '_fluid_control_volume_currentpos');
                    var volumebarTotalWidth = document.getElementById(self.videoPlayerId + '_fluid_control_volume').clientWidth;
                    var volumeposTagWidth = volumeposTag.clientWidth;
                    return volumeposTagWidth !== volumebarTotalWidth;
                };

                self.setLayout = function () {
                    //All other browsers
                    var listenTo = self.isTouchDevice() ? 'touchend' : 'click';
                    self.domRef.player.addEventListener(listenTo, function () {
                        return self.playPauseToggle();
                    }, false); //Mobile Safari - because it does not emit a click event on initial click of the video

                    self.domRef.player.addEventListener('play', self.initialPlay, false);
                    self.setDefaultLayout();
                };

                self.handleFullscreen = function () {
                    if (typeof document.vastFullsreenChangeEventListenersAdded !== 'undefined') {
                        return;
                    }

                    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'msfullscreenchange'].forEach(function (eventType) {
                        if (fluidplayer_typeof(document['on' + eventType]) === 'object') {
                            document.addEventListener(eventType, function (ev) {
                                self.recalculateAdDimensions();
                            }, false);
                        }
                    });
                    document.vastFullsreenChangeEventListenersAdded = true;
                };

                self.setupPlayerWrapper = function () {
                    var wrapper = document.createElement('div');
                    wrapper.id = 'fluid_video_wrapper_' + self.videoPlayerId;
                    wrapper.className = self.isTouchDevice() ? 'fluid_video_wrapper mobile' : 'fluid_video_wrapper'; //Assign the height/width dimensions to the wrapper

                    if (self.displayOptions.layoutControls.fillToContainer) {
                        wrapper.style.width = '100%';
                        wrapper.style.height = '100%';
                    } else {
                        wrapper.style.height = self.domRef.player.clientHeight + 'px';
                        wrapper.style.width = self.domRef.player.clientWidth + 'px';
                    }

                    self.domRef.player.style.height = '100%';
                    self.domRef.player.style.width = '100%';
                    self.domRef.player.parentNode.insertBefore(wrapper, self.domRef.player);
                    wrapper.appendChild(self.domRef.player);
                    return wrapper;
                };

                self.onErrorDetection = function () {
                    if (self.domRef.player.networkState === self.domRef.player.NETWORK_NO_SOURCE && self.isCurrentlyPlayingAd) {
                        //Probably the video ad file was not loaded successfully
                        self.playMainVideoWhenVastFails(401);
                    }
                };

                self.createVideoSourceSwitch = function () {
                    var sources = [];
                    var sourcesList = self.domRef.player.querySelectorAll('source');
                    [].forEach.call(sourcesList, function (source) {
                        if (source.title && source.src) {
                            sources.push({
                                'title': source.title,
                                'url': source.src,
                                'isHD': source.getAttribute('data-fluid-hd') != null
                            });
                        }
                    });
                    self.videoSources = sources;

                    if (self.videoSources.length <= 1) {
                        return;
                    }

                    var sourceChangeButton = document.getElementById(self.videoPlayerId + '_fluid_control_video_source');
                    sourceChangeButton.style.display = 'inline-block';
                    var appendSourceChange = false;
                    var sourceChangeList = document.createElement('div');
                    sourceChangeList.id = self.videoPlayerId + '_fluid_control_video_source_list';
                    sourceChangeList.className = 'fluid_video_sources_list';
                    sourceChangeList.style.display = 'none';
                    var firstSource = true;

                    var _iterator4 = _createForOfIteratorHelper(self.videoSources),
                        _step4;

                    try {
                        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                            var source = _step4.value;
                            // Fix for issues occurring on iOS with mkv files
                            var getTheType = source.url.split(".").pop();

                            if (self.mobileInfo.userOs === 'iOS' && getTheType === 'mkv') {
                                continue;
                            }

                            var sourceSelected = firstSource ? "source_selected" : "";
                            var hdElement = source.isHD ? '<sup style="color:' + self.displayOptions.layoutControls.primaryColor + '" class="fp_hd_source"></sup>' : '';
                            firstSource = false;
                            var sourceChangeDiv = document.createElement('div');
                            sourceChangeDiv.id = 'source_' + self.videoPlayerId + '_' + source.title;
                            sourceChangeDiv.className = 'fluid_video_source_list_item';
                            sourceChangeDiv.innerHTML = '<span class="source_button_icon ' + sourceSelected + '"></span>' + source.title + hdElement;
                            sourceChangeDiv.addEventListener('click', function (event) {
                                event.stopPropagation(); // While changing source the player size can flash, we want to set the pixel dimensions then back to 100% afterwards

                                self.domRef.player.style.width = self.domRef.player.clientWidth + 'px';
                                self.domRef.player.style.height = self.domRef.player.clientHeight + 'px';
                                var videoChangedTo = this;
                                var sourceIcons = document.getElementsByClassName('source_button_icon');

                                for (var i = 0; i < sourceIcons.length; i++) {
                                    sourceIcons[i].className = sourceIcons[i].className.replace('source_selected', '');
                                }

                                videoChangedTo.firstChild.className += ' source_selected';
                                self.videoSources.forEach(function (source) {
                                    if (source.title === videoChangedTo.innerText.replace(/(\r\n\t|\n|\r\t)/gm, '')) {
                                        self.setBuffering();
                                        self.setVideoSource(source.url);
                                        self.fluidStorage.fluidQuality = source.title;
                                    }
                                });
                                self.openCloseVideoSourceSwitch();
                            });
                            sourceChangeList.appendChild(sourceChangeDiv);
                            appendSourceChange = true;
                        }
                    } catch (err) {
                        _iterator4.e(err);
                    } finally {
                        _iterator4.f();
                    }

                    if (appendSourceChange) {
                        sourceChangeButton.appendChild(sourceChangeList);
                        sourceChangeButton.addEventListener('click', function () {
                            self.openCloseVideoSourceSwitch();
                        });
                    } else {
                        // Didn't give any source options
                        document.getElementById(self.videoPlayerId + '_fluid_control_video_source').style.display = 'none';
                    }
                };

                self.openCloseVideoSourceSwitch = function () {
                    var sourceChangeList = document.getElementById(self.videoPlayerId + '_fluid_control_video_source_list');

                    if (self.isCurrentlyPlayingAd) {
                        sourceChangeList.style.display = 'none';
                        return;
                    }

                    if (sourceChangeList.style.display !== 'none') {
                        sourceChangeList.style.display = 'none';
                        return;
                    }

                    sourceChangeList.style.display = 'block';

                    var mouseOut = function mouseOut() {
                        sourceChangeList.removeEventListener('mouseleave', mouseOut);
                        sourceChangeList.style.display = 'none';
                    };

                    sourceChangeList.addEventListener('mouseleave', mouseOut);
                };

                self.setVideoSource = function (url) {
                    if (self.mobileInfo.userOs === 'iOS' && url.indexOf('.mkv') > 0) {
                        console.log('[FP_ERROR] .mkv files not supported by iOS devices.');
                        return false;
                    }

                    if (self.isCurrentlyPlayingAd) {
                        self.originalSrc = url;
                        return;
                    }

                    self.isSwitchingSource = true;
                    var play = false;

                    if (!self.domRef.player.paused) {
                        self.domRef.player.pause();
                        play = true;
                    }

                    var currentTime = self.domRef.player.currentTime;
                    self.setCurrentTimeAndPlay(currentTime, play);
                    self.domRef.player.src = url;
                    self.originalSrc = url;
                    self.displayOptions.layoutControls.mediaType = self.getCurrentSrcType();
                    self.initialiseStreamers();
                };

                self.setCurrentTimeAndPlay = function (newCurrentTime, shouldPlay) {
                    var loadedMetadata = function loadedMetadata() {
                        self.domRef.player.currentTime = newCurrentTime;
                        self.domRef.player.removeEventListener('loadedmetadata', loadedMetadata); // Safari ios and mac fix to set currentTime

                        if (self.mobileInfo.userOs === 'iOS' || self.getBrowserVersion().browserName.toLowerCase() === 'safari') {
                            self.domRef.player.addEventListener('playing', videoPlayStart);
                        }

                        if (shouldPlay) {
                            self.domRef.player.play();
                        } else {
                            self.domRef.player.pause();
                            self.controlPlayPauseToggle(self.videoPlayerId);
                        }

                        self.isSwitchingSource = false;
                        self.domRef.player.style.width = '100%';
                        self.domRef.player.style.height = '100%';
                    };

                    var videoPlayStart = function videoPlayStart() {
                        self.currentTime = newCurrentTime;
                        self.domRef.player.removeEventListener('playing', videoPlayStart);
                    };

                    self.domRef.player.addEventListener('loadedmetadata', loadedMetadata, false);
                    self.domRef.player.load();
                };

                self.initTitle = function () {
                    if (!self.displayOptions.layoutControls.title) {
                        return;
                    }

                    var titleHolder = document.createElement('div');
                    titleHolder.id = self.videoPlayerId + '_title';
                    self.domRef.player.parentNode.insertBefore(titleHolder, null);
                    titleHolder.innerHTML += self.displayOptions.layoutControls.title;
                    titleHolder.classList.add('fp_title');
                };

                self.hasTitle = function () {
                    var title = document.getElementById(self.videoPlayerId + '_title');
                    var titleOption = self.displayOptions.layoutControls.title;
                    return title && titleOption != null;
                };

                self.hideTitle = function () {
                    var titleHolder = document.getElementById(self.videoPlayerId + '_title');

                    if (!self.hasTitle()) {
                        return;
                    }

                    titleHolder.classList.add('fade_out');
                };

                self.showTitle = function () {
                    var titleHolder = document.getElementById(self.videoPlayerId + '_title');

                    if (!self.hasTitle()) {
                        return;
                    }

                    titleHolder.classList.remove('fade_out');
                };

                self.initLogo = function () {
                    if (!self.displayOptions.layoutControls.logo.imageUrl) {
                        return;
                    } // Container div for the logo
                    // This is to allow for fade in and out logo_maintain_display


                    var logoHolder = document.createElement('div');
                    logoHolder.id = self.videoPlayerId + '_logo';
                    var hideClass = 'logo_maintain_display';

                    if (self.displayOptions.layoutControls.logo.hideWithControls) {
                        hideClass = 'initial_controls_show';
                    }

                    logoHolder.classList.add(hideClass, 'fp_logo'); // The logo itself

                    var logoImage = document.createElement('img');
                    logoImage.id = self.videoPlayerId + '_logo_image';

                    if (self.displayOptions.layoutControls.logo.imageUrl) {
                        logoImage.src = self.displayOptions.layoutControls.logo.imageUrl;
                    }

                    logoImage.style.position = 'absolute';
                    logoImage.style.margin = self.displayOptions.layoutControls.logo.imageMargin;
                    var logoPosition = self.displayOptions.layoutControls.logo.position.toLowerCase();

                    if (logoPosition.indexOf('bottom') !== -1) {
                        logoImage.style.bottom = 0;
                    } else {
                        logoImage.style.top = 0;
                    }

                    if (logoPosition.indexOf('right') !== -1) {
                        logoImage.style.right = 0;
                    } else {
                        logoImage.style.left = 0;
                    }

                    if (self.displayOptions.layoutControls.logo.opacity) {
                        logoImage.style.opacity = self.displayOptions.layoutControls.logo.opacity;
                    }

                    if (self.displayOptions.layoutControls.logo.clickUrl !== null) {
                        logoImage.style.cursor = 'pointer';
                        logoImage.addEventListener('click', function () {
                            var win = window.open(self.displayOptions.layoutControls.logo.clickUrl, '_blank');
                            win.focus();
                        });
                    } // If a mouseOverImage is provided then we must set up the listeners for it


                    if (self.displayOptions.layoutControls.logo.mouseOverImageUrl) {
                        logoImage.addEventListener('mouseover', function () {
                            logoImage.src = self.displayOptions.layoutControls.logo.mouseOverImageUrl;
                        }, false);
                        logoImage.addEventListener('mouseout', function () {
                            logoImage.src = self.displayOptions.layoutControls.logo.imageUrl;
                        }, false);
                    }

                    self.domRef.player.parentNode.insertBefore(logoHolder, null);
                    logoHolder.appendChild(logoImage, null);
                };

                self.initHtmlOnPauseBlock = function () {
                    //If onPauseRoll is defined than HtmlOnPauseBlock won't be shown
                    if (self.hasValidOnPauseAd()) {
                        return;
                    }

                    if (!self.displayOptions.layoutControls.htmlOnPauseBlock.html) {
                        return;
                    }

                    var containerDiv = document.createElement('div');
                    containerDiv.id = self.videoPlayerId + '_fluid_html_on_pause';
                    containerDiv.className = 'fluid_html_on_pause';
                    containerDiv.style.display = 'none';
                    containerDiv.innerHTML = self.displayOptions.layoutControls.htmlOnPauseBlock.html;

                    containerDiv.onclick = function (event) {
                        self.playPauseToggle();
                    };

                    if (self.displayOptions.layoutControls.htmlOnPauseBlock.width) {
                        containerDiv.style.width = self.displayOptions.layoutControls.htmlOnPauseBlock.width + 'px';
                    }

                    if (self.displayOptions.layoutControls.htmlOnPauseBlock.height) {
                        containerDiv.style.height = self.displayOptions.layoutControls.htmlOnPauseBlock.height + 'px';
                    }

                    self.domRef.player.parentNode.insertBefore(containerDiv, null);
                };
                /**
                 * Play button in the middle when the video loads
                 */


                self.initPlayButton = function () {
                    // Create the html fpr the play button
                    var containerDiv = document.createElement('div');
                    containerDiv.id = self.videoPlayerId + '_fluid_initial_play_button';
                    containerDiv.className = 'fluid_html_on_pause';
                    var backgroundColor = self.displayOptions.layoutControls.primaryColor ? self.displayOptions.layoutControls.primaryColor : "#333333";
                    containerDiv.innerHTML = '<div id="' + self.videoPlayerId + '_fluid_initial_play" class="fluid_initial_play" style="background-color:' + backgroundColor + '"><div id="' + self.videoPlayerId + '_fluid_state_button" class="fluid_initial_play_button"></div></div>';

                    var initPlayFunction = function initPlayFunction() {
                        self.playPauseToggle();
                        containerDiv.removeEventListener('click', initPlayFunction);
                    };

                    containerDiv.addEventListener('click', initPlayFunction); // If the user has chosen to not show the play button we'll make it invisible
                    // We don't hide altogether because animations might still be used

                    if (!self.displayOptions.layoutControls.playButtonShowing) {
                        var initialControlsDisplay = document.getElementById(self.videoPlayerId + '_fluid_controls_container');
                        initialControlsDisplay.classList.add('initial_controls_show');
                        containerDiv.style.opacity = '0';
                    }

                    self.domRef.player.parentNode.insertBefore(containerDiv, null);
                };
                /**
                 * Set the mainVideoDuration property one the video is loaded
                 */


                self.mainVideoReady = function () {
                    if (!(self.mainVideoDuration === 0 && !self.isCurrentlyPlayingAd && self.mainVideoReadyState === false)) {
                        return;
                    }

                    var event = new CustomEvent('mainVideoDurationSet');
                    self.mainVideoDuration = self.domRef.player.duration;
                    self.mainVideoReadyState = true;
                    self.domRef.player.dispatchEvent(event);
                    self.domRef.player.removeEventListener('loadedmetadata', self.mainVideoReady);
                };

                self.userActivityChecker = function () {
                    var videoPlayer = self.domRef.wrapper;
                    self.newActivity = null;
                    var isMouseStillDown = false;

                    var activity = function activity(event) {
                        if (event.type === 'touchstart' || event.type === 'mousedown') {
                            isMouseStillDown = true;
                        }

                        if (event.type === 'touchend' || event.type === 'mouseup') {
                            isMouseStillDown = false;
                        }

                        self.newActivity = true;
                    };

                    setInterval(function () {
                        if (self.newActivity !== true) {
                            return;
                        }

                        if (!isMouseStillDown && !self.isLoading) {
                            self.newActivity = false;
                        }

                        if (self.isUserActive === false || !self.isControlBarVisible()) {
                            var event = new CustomEvent('userActive');
                            self.domRef.player.dispatchEvent(event);
                            self.isUserActive = true;
                        }

                        clearTimeout(self.inactivityTimeout);
                        self.inactivityTimeout = setTimeout(function () {
                            if (self.newActivity === true) {
                                clearTimeout(self.inactivityTimeout);
                                return;
                            }

                            self.isUserActive = false;
                            var event = new CustomEvent('userInactive');
                            self.domRef.player.dispatchEvent(event);
                        }, self.displayOptions.layoutControls.controlBar.autoHideTimeout * 1000);
                    }, 300);
                    var listenTo = self.isTouchDevice() ? ['touchstart', 'touchmove', 'touchend'] : ['mousemove', 'mousedown', 'mouseup'];

                    for (var i = 0; i < listenTo.length; i++) {
                        videoPlayer.addEventListener(listenTo[i], activity);
                    }
                };

                self.hasControlBar = function () {
                    return !!document.getElementById(self.videoPlayerId + '_fluid_controls_container');
                };

                self.isControlBarVisible = function () {
                    if (self.hasControlBar() === false) {
                        return false;
                    }

                    var controlBar = document.getElementById(self.videoPlayerId + '_fluid_controls_container');
                    var style = window.getComputedStyle(controlBar, null);
                    return !(style.opacity === 0 || style.visibility === 'hidden');
                };

                self.setVideoPreload = function () {
                    self.domRef.player.setAttribute('preload', self.displayOptions.layoutControls.preload);
                };

                self.hideControlBar = function () {
                    if (self.isCurrentlyPlayingAd && !self.domRef.player.paused) {
                        self.toggleAdCountdown(true);
                    }

                    self.domRef.player.style.cursor = 'none'; // handles both VR and Normal condition

                    if (!self.hasControlBar()) {
                        return;
                    }

                    var divVastControls = self.domRef.player.parentNode.getElementsByClassName('fluid_controls_container');
                    var fpLogo = self.domRef.player.parentNode.getElementsByClassName('fp_logo');

                    for (var i = 0; i < divVastControls.length; i++) {
                        if (self.displayOptions.layoutControls.controlBar.animated) {
                            divVastControls[i].classList.remove('fade_in');
                            divVastControls[i].classList.add('fade_out');
                        } else {
                            divVastControls[i].style.display = 'none';
                        }
                    }

                    for (var _i5 = 0; _i5 < fpLogo.length; _i5++) {
                        if (self.displayOptions.layoutControls.controlBar.animated) {
                            if (fpLogo[_i5]) {
                                fpLogo[_i5].classList.remove('fade_in');

                                fpLogo[_i5].classList.add('fade_out');
                            }
                        } else {
                            if (fpLogo[_i5]) {
                                fpLogo[_i5].style.display = 'none';
                            }
                        }
                    }
                };

                self.showControlBar = function () {
                    if (self.isCurrentlyPlayingAd && !self.domRef.player.paused) {
                        self.toggleAdCountdown(false);
                    }

                    if (!self.isTouchDevice()) {
                        self.domRef.player.style.cursor = 'default';
                    }

                    if (!self.hasControlBar()) {
                        return;
                    }

                    var divVastControls = self.domRef.player.parentNode.getElementsByClassName('fluid_controls_container');
                    var fpLogo = self.domRef.player.parentNode.getElementsByClassName('fp_logo');

                    for (var i = 0; i < divVastControls.length; i++) {
                        if (self.displayOptions.layoutControls.controlBar.animated) {
                            divVastControls[i].classList.remove('fade_out');
                            divVastControls[i].classList.add('fade_in');
                        } else {
                            divVastControls[i].style.display = 'block';
                        }
                    }

                    for (var _i6 = 0; _i6 < fpLogo.length; _i6++) {
                        if (self.displayOptions.layoutControls.controlBar.animated) {
                            if (fpLogo[_i6]) {
                                fpLogo[_i6].classList.remove('fade_out');

                                fpLogo[_i6].classList.add('fade_in');
                            }
                        } else {
                            if (fpLogo[_i6]) {
                                fpLogo[_i6].style.display = 'block';
                            }
                        }
                    }
                };

                self.linkControlBarUserActivity = function () {
                    self.domRef.player.addEventListener('userInactive', self.hideControlBar);
                    self.domRef.player.addEventListener('userInactive', self.hideTitle);
                    self.domRef.player.addEventListener('userActive', self.showControlBar);
                    self.domRef.player.addEventListener('userActive', self.showTitle);
                };

                self.initMute = function () {
                    if (self.displayOptions.layoutControls.mute !== true) {
                        return;
                    }

                    self.domRef.player.volume = 0;
                };

                self.initLoop = function () {
                    self.domRef.player.loop = !!self.displayOptions.layoutControls.loop;
                };

                self.setBuffering = function () {
                    var progressInterval;
                    var bufferBar = self.domRef.player.parentNode.getElementsByClassName('fluid_controls_buffered');

                    for (var j = 0; j < bufferBar.length; j++) {
                        bufferBar[j].style.width = 0;
                    } // Buffering


                    var logProgress = function logProgress() {
                        var duration = self.domRef.player.duration;

                        if (duration <= 0) {
                            return;
                        }

                        for (var i = 0; i < self.domRef.player.buffered.length; i++) {
                            if (self.domRef.player.buffered.start(self.domRef.player.buffered.length - 1 - i) >= self.domRef.player.currentTime) {
                                continue;
                            }

                            var newBufferLength = self.domRef.player.buffered.end(self.domRef.player.buffered.length - 1 - i) / duration * 100 + "%";

                            for (var _j = 0; _j < bufferBar.length; _j++) {
                                bufferBar[_j].style.width = newBufferLength;
                            } // Stop checking for buffering if the video is fully buffered


                            if (!!progressInterval && 1 === self.domRef.player.buffered.end(self.domRef.player.buffered.length - 1 - i) / duration) {
                                clearInterval(progressInterval);
                            }

                            break;
                        }
                    };

                    progressInterval = setInterval(logProgress, 500);
                };

                self.createPlaybackList = function () {
                    var playbackRates = ['x2', 'x1.5', 'x1', 'x0.5'];

                    if (!self.displayOptions.layoutControls.playbackRateEnabled) {
                        return;
                    }

                    document.getElementById(self.videoPlayerId + '_fluid_control_playback_rate').style.display = 'inline-block';
                    var sourceChangeButton = document.getElementById(self.videoPlayerId + '_fluid_control_playback_rate');
                    var sourceChangeList = document.createElement('div');
                    sourceChangeList.id = self.videoPlayerId + '_fluid_control_video_playback_rate';
                    sourceChangeList.className = 'fluid_video_playback_rates';
                    sourceChangeList.style.display = 'none';
                    playbackRates.forEach(function (rate) {
                        var sourceChangeDiv = document.createElement('div');
                        sourceChangeDiv.className = 'fluid_video_playback_rates_item';
                        sourceChangeDiv.innerText = rate;
                        sourceChangeDiv.addEventListener('click', function (event) {
                            event.stopPropagation();
                            var playbackRate = this.innerText.replace('x', '');
                            self.setPlaybackSpeed(playbackRate);
                            self.openCloseVideoPlaybackRate();
                        });
                        sourceChangeList.appendChild(sourceChangeDiv);
                    });
                    sourceChangeButton.appendChild(sourceChangeList);
                    sourceChangeButton.addEventListener('click', function () {
                        self.openCloseVideoPlaybackRate();
                    });
                };

                self.openCloseVideoPlaybackRate = function () {
                    var sourceChangeList = document.getElementById(self.videoPlayerId + '_fluid_control_video_playback_rate');

                    if (self.isCurrentlyPlayingAd || 'none' !== sourceChangeList.style.display) {
                        sourceChangeList.style.display = 'none';
                        return;
                    }

                    sourceChangeList.style.display = 'block';

                    var mouseOut = function mouseOut() {
                        sourceChangeList.removeEventListener('mouseleave', mouseOut);
                        sourceChangeList.style.display = 'none';
                    };

                    sourceChangeList.addEventListener('mouseleave', mouseOut);
                };

                self.createDownload = function () {
                    var downloadOption = document.getElementById(self.videoPlayerId + '_fluid_control_download');

                    if (!self.displayOptions.layoutControls.allowDownload) {
                        return;
                    }

                    downloadOption.style.display = 'inline-block';
                    var downloadClick = document.createElement('a');
                    downloadClick.id = self.videoPlayerId + '_download';

                    downloadClick.onclick = function (e) {
                        var linkItem = this;

                        if (typeof e.stopImmediatePropagation !== 'undefined') {
                            e.stopImmediatePropagation();
                        }

                        setInterval(function () {
                            linkItem.download = '';
                            linkItem.href = '';
                        }, 100);
                    };

                    downloadOption.appendChild(downloadClick);
                    downloadOption.addEventListener('click', function () {
                        var downloadItem = document.getElementById(self.videoPlayerId + '_download');
                        downloadItem.download = self.originalSrc;
                        downloadItem.href = self.originalSrc;
                        downloadClick.click();
                    });
                };

                self.theatreToggle = function () {
                    if (self.isInIframe) {
                        return;
                    } // Theatre and fullscreen, it's only one or the other


                    if (self.fullscreenMode) {
                        self.fullscreenToggle();
                    } // Advanced Theatre mode if specified


                    if (self.displayOptions.layoutControls.theatreAdvanced) {
                        var elementForTheatre = document.getElementById(self.displayOptions.layoutControls.theatreAdvanced.theatreElement);
                        var theatreClassToApply = self.displayOptions.layoutControls.theatreAdvanced.classToApply;

                        if (elementForTheatre != null && theatreClassToApply != null) {
                            if (!self.theatreMode) {
                                elementForTheatre.classList.add(theatreClassToApply);
                            } else {
                                elementForTheatre.classList.remove(theatreClassToApply);
                            }

                            self.theatreModeAdvanced = !self.theatreModeAdvanced;
                        } else {
                            console.log('[FP_ERROR] Theatre mode elements could not be found, defaulting behaviour.'); // Default overlay behaviour

                            self.defaultTheatre();
                        }
                    } else {
                        // Default overlay behaviour
                        self.defaultTheatre();
                    } // Set correct variables


                    self.theatreMode = !self.theatreMode;
                    self.fluidStorage.fluidTheatre = self.theatreMode; // Trigger theatre event

                    var theatreEvent = self.theatreMode ? 'theatreModeOn' : 'theatreModeOff';
                    var event = document.createEvent('CustomEvent');
                    event.initEvent(theatreEvent, false, true);
                    self.domRef.player.dispatchEvent(event);
                    self.resizeVpaidAuto();
                };

                self.defaultTheatre = function () {
                    var videoWrapper = document.getElementById('fluid_video_wrapper_' + self.videoPlayerId);

                    if (self.theatreMode) {
                        videoWrapper.classList.remove('fluid_theatre_mode');
                        videoWrapper.style.maxHeight = '';
                        videoWrapper.style.marginTop = '';
                        videoWrapper.style.left = '';
                        videoWrapper.style.right = '';
                        videoWrapper.style.position = '';

                        if (!self.displayOptions.layoutControls.fillToContainer) {
                            videoWrapper.style.width = self.originalWidth + 'px';
                            videoWrapper.style.height = self.originalHeight + 'px';
                        } else {
                            videoWrapper.style.width = '100%';
                            videoWrapper.style.height = '100%';
                        }

                        return;
                    }

                    videoWrapper.classList.add('fluid_theatre_mode');
                    var workingWidth = self.displayOptions.layoutControls.theatreSettings.width;
                    var defaultHorizontalMargin = '10px';
                    videoWrapper.style.width = workingWidth;
                    videoWrapper.style.height = self.displayOptions.layoutControls.theatreSettings.height;
                    videoWrapper.style.maxHeight = screen.height + "px";
                    videoWrapper.style.marginTop = self.displayOptions.layoutControls.theatreSettings.marginTop + 'px';

                    switch (self.displayOptions.layoutControls.theatreSettings.horizontalAlign) {
                        case 'center':
                            // We must calculate the margin differently based on whether they passed % or px
                            if (typeof workingWidth == 'string' && workingWidth.substr(workingWidth.length - 1) === "%") {
                                // A margin of half the remaining space
                                defaultHorizontalMargin = (100 - parseInt(workingWidth.substring(0, workingWidth.length - 1))) / 2 + "%";
                            } else if (typeof workingWidth == 'string' && workingWidth.substr(workingWidth.length - 2) === "px") {
                                // Half the (Remaining width / fullwidth)
                                defaultHorizontalMargin = (screen.width - parseInt(workingWidth.substring(0, workingWidth.length - 2))) / screen.width * 100 / 2 + "%";
                            } else {
                                console.log('[FP_ERROR] Theatre width specified invalid.');
                            }

                            videoWrapper.style.left = defaultHorizontalMargin;
                            break;

                        case 'right':
                            videoWrapper.style.right = defaultHorizontalMargin;
                            break;

                        case 'left':
                        default:
                            videoWrapper.style.left = defaultHorizontalMargin;
                            break;
                    }
                }; // Set the poster for the video, taken from custom params
                // Cannot use the standard video tag poster image as it can be removed by the persistent settings


                self.posterImage = function () {
                    if (!self.displayOptions.layoutControls.posterImage) {
                        return;
                    }

                    var containerDiv = document.createElement('div');
                    containerDiv.id = self.videoPlayerId + '_fluid_pseudo_poster';
                    containerDiv.className = 'fluid_pseudo_poster';

                    if (['auto', 'contain', 'cover'].indexOf(self.displayOptions.layoutControls.posterImageSize) === -1) {
                        console.log('[FP_ERROR] Not allowed value in posterImageSize');
                        return;
                    }

                    containerDiv.style.background = "url('" + self.displayOptions.layoutControls.posterImage + "') center center / " + self.displayOptions.layoutControls.posterImageSize + " no-repeat black";
                    self.domRef.player.parentNode.insertBefore(containerDiv, null);
                }; // This is called when a media type is unsupported. We'll find the current source and try set the next source if it exists


                self.nextSource = function () {
                    var sources = self.domRef.player.getElementsByTagName('source');

                    if (!sources.length) {
                        return null;
                    }

                    for (var i = 0; i < sources.length - 1; i++) {
                        if (sources[i].getAttribute('src') === self.originalSrc && sources[i + 1].getAttribute('src')) {
                            self.setVideoSource(sources[i + 1].getAttribute('src'));
                            return;
                        }
                    }
                };

                self.inIframe = function () {
                    try {
                        return window.self !== window.top;
                    } catch (e) {
                        return true;
                    }
                };

                self.setPersistentSettings = function () {
                    if (!(typeof Storage !== 'undefined' && typeof localStorage !== 'undefined')) {
                        return;
                    } // See https://github.com/fluid-player/fluid-player/issues/271


                    var testKey = '_fp_storage_enabled',
                        storage = localStorage;

                    try {
                        storage.setItem(testKey, '1');
                        storage.removeItem(testKey);
                    } catch (error) {
                        return false;
                    }

                    self.fluidStorage = localStorage;

                    if (typeof self.fluidStorage.fluidVolume !== 'undefined' && self.displayOptions.layoutControls.persistentSettings.volume) {
                        self.setVolume(self.fluidStorage.fluidVolume);

                        if (typeof self.fluidStorage.fluidMute !== 'undefined' && self.fluidStorage.fluidMute === 'true') {
                            self.muteToggle();
                        }
                    }

                    if (typeof self.fluidStorage.fluidQuality !== 'undefined' && self.displayOptions.layoutControls.persistentSettings.quality) {
                        var sourceOption = document.getElementById('source_' + self.videoPlayerId + '_' + self.fluidStorage.fluidQuality);
                        var sourceChangeButton = document.getElementById(self.videoPlayerId + '_fluid_control_video_source');

                        if (sourceOption) {
                            sourceOption.click();
                            sourceChangeButton.click();
                        }
                    }

                    if (typeof self.fluidStorage.fluidSpeed !== 'undefined' && self.displayOptions.layoutControls.persistentSettings.speed) {
                        self.setPlaybackSpeed(self.fluidStorage.fluidSpeed);
                    }

                    if (typeof self.fluidStorage.fluidTheatre !== 'undefined' && self.fluidStorage.fluidTheatre === 'true' && self.displayOptions.layoutControls.persistentSettings.theatre) {
                        self.theatreToggle();
                    }
                }; // "API" Functions


                self.play = function () {
                    if (!self.domRef.player.paused) {
                        return;
                    }

                    self.playPauseToggle();
                    return true;
                };

                self.pause = function () {
                    if (!self.domRef.player.paused) {
                        self.playPauseToggle();
                    }

                    return true;
                };

                self.skipTo = function (time) {
                    self.domRef.player.currentTime = time;
                };

                self.setPlaybackSpeed = function (speed) {
                    if (self.isCurrentlyPlayingAd) {
                        return;
                    }

                    self.domRef.player.playbackRate = speed;
                    self.fluidStorage.fluidSpeed = speed;
                };

                self.setVolume = function (passedVolume) {
                    self.domRef.player.volume = passedVolume; // If user scrolls to volume 0, we should not store 0 as
                    // latest volume - there is a property called "muted" already
                    // and storing 0 will break the toggle.
                    // In case user scrolls to 0 we assume last volume to be 1
                    // for toggle.

                    var latestVolume = 0 === passedVolume ? 1 : passedVolume;
                    self.latestVolume = latestVolume;
                    self.fluidStorage.fluidVolume = latestVolume;
                };

                self.isCurrentlyPlayingVideo = function (instance) {
                    return instance && instance.currentTime > 0 && !instance.paused && !instance.ended && instance.readyState > 2;
                };

                self.setHtmlOnPauseBlock = function (passedHtml) {
                    if (fluidplayer_typeof(passedHtml) != 'object' || typeof passedHtml.html == 'undefined') {
                        return false;
                    }

                    var htmlBlock = document.getElementById(self.videoPlayerId + '_fluid_html_on_pause'); // We create the HTML block from scratch if it doesn't already exist

                    if (!htmlBlock) {
                        var containerDiv = document.createElement('div');
                        containerDiv.id = self.videoPlayerId + '_fluid_html_on_pause';
                        containerDiv.className = 'fluid_html_on_pause';
                        containerDiv.style.display = 'none';
                        containerDiv.innerHTML = passedHtml.html;

                        containerDiv.onclick = function () {
                            self.playPauseToggle();
                        };

                        if (passedHtml.width) {
                            containerDiv.style.width = passedHtml.width + 'px';
                        }

                        if (passedHtml.height) {
                            containerDiv.style.height = passedHtml.height + 'px';
                        }

                        self.domRef.player.parentNode.insertBefore(containerDiv, null);
                        return;
                    }

                    htmlBlock.innerHTML = passedHtml.html;

                    if (passedHtml.width) {
                        htmlBlock.style.width = passedHtml.width + 'px';
                    }

                    if (passedHtml.height) {
                        htmlBlock.style.height = passedHtml.height + 'px';
                    }
                };

                self.toggleControlBar = function (show) {
                    var controlBar = document.getElementById(self.videoPlayerId + 'fluid_controls_container');

                    if (show) {
                        controlBar.className += ' initial_controls_show';
                        return;
                    }

                    controlBar.className = controlBar.className.replace(' initial_controls_show', '');
                };

                self.on = function (eventCall, functionCall) {
                    switch (eventCall) {
                        case 'play':
                            self.domRef.player.onplay = functionCall;
                            break;

                        case 'seeked':
                            self.domRef.player.onseeked = functionCall;
                            break;

                        case 'ended':
                            self.domRef.player.onended = functionCall;
                            break;

                        case 'pause':
                            self.domRef.player.addEventListener('pause', function () {
                                if (!self.fluidPseudoPause) {
                                    functionCall();
                                }
                            });
                            break;

                        case 'playing':
                            self.domRef.player.addEventListener('playing', functionCall);
                            break;

                        case 'theatreModeOn':
                            self.domRef.player.addEventListener('theatreModeOn', functionCall);
                            break;

                        case 'theatreModeOff':
                            self.domRef.player.addEventListener('theatreModeOff', functionCall);
                            break;

                        case 'timeupdate':
                            self.domRef.player.addEventListener('timeupdate', function () {
                                functionCall(self.getCurrentTime());
                            });
                            break;

                        default:
                            console.log('[FP_ERROR] Event not recognised');
                            break;
                    }
                };

                self.toggleLogo = function (logo) {
                    if (fluidplayer_typeof(logo) != 'object' || !logo.imageUrl) {
                        return false;
                    }

                    var logoBlock = document.getElementById(self.videoPlayerId + "_logo"); // We create the logo from scratch if it doesn't already exist, they might not give everything correctly so we

                    self.displayOptions.layoutControls.logo.imageUrl = logo.imageUrl ? logo.imageUrl : null;
                    self.displayOptions.layoutControls.logo.position = logo.position ? logo.position : 'top left';
                    self.displayOptions.layoutControls.logo.clickUrl = logo.clickUrl ? logo.clickUrl : null;
                    self.displayOptions.layoutControls.logo.opacity = logo.opacity ? logo.opacity : 1;
                    self.displayOptions.layoutControls.logo.mouseOverImageUrl = logo.mouseOverImageUrl ? logo.mouseOverImageUrl : null;
                    self.displayOptions.layoutControls.logo.imageMargin = logo.imageMargin ? logo.imageMargin : '2px';
                    self.displayOptions.layoutControls.logo.hideWithControls = logo.hideWithControls ? logo.hideWithControls : false;
                    self.displayOptions.layoutControls.logo.showOverAds = logo.showOverAds ? logo.showOverAds : false;

                    if (logoBlock) {
                        logoBlock.remove();
                    }

                    self.initLogo();
                }; // this functions helps in adding event listeners for future dynamic elements
                // trackEvent(document, "click", ".some_elem", callBackFunction);


                self.trackEvent = function (el, evt, sel, handler) {
                    if (typeof self.events[sel] === 'undefined') {
                        self.events[sel] = {};
                    }

                    if (typeof self.events[sel][evt] === 'undefined') {
                        self.events[sel][evt] = [];
                    }

                    self.events[sel][evt].push(handler);
                    self.registerListener(el, evt, sel, handler);
                };

                self.registerListener = function (el, evt, sel, handler) {
                    var currentElements = el.querySelectorAll(sel);

                    for (var i = 0; i < currentElements.length; i++) {
                        currentElements[i].addEventListener(evt, handler);
                    }
                };

                self.copyEvents = function (topLevelEl) {
                    for (var sel in self.events) {
                        if (!self.events.hasOwnProperty(sel)) {
                            continue;
                        }

                        for (var evt in self.events[sel]) {
                            if (!self.events[sel].hasOwnProperty(evt)) {
                                continue;
                            }

                            for (var i = 0; i < self.events[sel][evt].length; i++) {
                                self.registerListener(topLevelEl, evt, sel, self.events[sel][evt][i]);
                            }
                        }
                    }
                };

                self.destroy = function () {
                    var numDestructors = self.destructors.length;

                    if (0 === numDestructors) {
                        return;
                    }

                    for (var i = 0; i < numDestructors; ++i) {
                        self.destructors[i].bind(_this)();
                    }

                    var container = document.getElementById('fluid_video_wrapper_' + self.videoPlayerId);

                    if (!container) {
                        console.warn('Unable to remove wrapper element for Fluid Player instance - element not found ' + self.videoPlayerId);
                        return;
                    }

                    if ('function' === typeof container.remove) {
                        container.remove();
                        return;
                    }

                    if (container.parentNode) {
                        container.parentNode.removeChild(container);
                        return;
                    }

                    console.error('Unable to remove wrapper element for Fluid Player instance - no parent' + self.videoPlayerId);
                };
            };
            /**
             * Public Fluid Player API interface
             * @param instance
             */


            var fluidPlayerInterface = function fluidPlayerInterface(instance) {
                this.play = function () {
                    return instance.play();
                };

                this.pause = function () {
                    return instance.pause();
                };

                this.skipTo = function (position) {
                    return instance.skipTo(position);
                };

                this.setPlaybackSpeed = function (speed) {
                    return instance.setPlaybackSpeed(speed);
                };

                this.setVolume = function (volume) {
                    return instance.setVolume(volume);
                };

                this.setHtmlOnPauseBlock = function (options) {
                    return instance.setHtmlOnPauseBlock(options);
                };

                this.toggleControlBar = function (state) {
                    return instance.toggleControlBar(state);
                };

                this.toggleFullScreen = function (state) {
                    return instance.fullscreenToggle(state);
                };

                this.destroy = function () {
                    return instance.destroy();
                };

                this.dashInstance = function () {
                    return !!instance.dashPlayer ? instance.dashPlayer : null;
                };

                this.hlsInstance = function () {
                    return !!instance.hlsPlayer ? instance.hlsPlayer : null;
                };

                this.on = function (event, callback) {
                    return instance.on(event, callback);
                };
            };
            /**
             * Initialize and attach Fluid Player to instance of HTMLVideoElement
             *
             * @param target ID of HTMLVideoElement or reference to HTMLVideoElement
             * @param options Fluid Player configuration options
             * @returns {fluidPlayerInterface}
             */


            var fluidPlayerInitializer = function fluidPlayerInitializer(target, options) {
                var instance = new fluidPlayerClass();

                if (!options) {
                    options = {};
                }

                instance.init(target, options);
                var publicInstance = new fluidPlayerInterface(instance);

                if (window && FP_DEVELOPMENT_MODE) {
                    var debugApi = {
                        id: target,
                        options: options,
                        instance: publicInstance,
                        internals: instance
                    };

                    if (typeof window.fluidPlayerDebug === 'undefined') {
                        window.fluidPlayerDebug = [];
                    }

                    window.fluidPlayerDebug.push(debugApi);
                    console.log('Created instance of Fluid Player. ' + 'Debug API available at window.fluidPlayerDebug[' + (window.fluidPlayerDebug.length - 1) + '].', debugApi);
                }

                return publicInstance;
            };

            if (FP_DEVELOPMENT_MODE) {
                console.log('Fluid Player - Development Build' + (FP_RUNTIME_DEBUG ? ' (in debug mode)' : ''));
            }

            /* harmony default export */ var fluidplayer = (fluidPlayerInitializer);
// CONCATENATED MODULE: ./src/index.js


            if (false) {}

            if (false) {}

            if (false) { var isLocalhost; }

            if (false) {}



            /* harmony default export */ var src = (fluidplayer);
// EXTERNAL MODULE: ./src/css/fluidplayer.css
            var css_fluidplayer = __webpack_require__(3);

// CONCATENATED MODULE: ./src/browser.js
            /**
             * Build entry point for CDN builds.
             * You SHOULD NOT import this file except if you plan to build browser distribution of Fluid Player.
             */
                // Import CSS automatically in browser builds.


            var fluidPlayer = src;
            /* harmony default export */ var browser = __webpack_exports__["default"] = (fluidPlayer);

            /***/ })
        /******/ ]);