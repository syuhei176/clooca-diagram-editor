/*! Version= 2.0.0 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("CloocaDiagramEditor", [], factory);
	else if(typeof exports === 'object')
		exports["CloocaDiagramEditor"] = factory();
	else
		root["CloocaDiagramEditor"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Element {

  constructor(el) {
    this.el = el;
  }

  getEl() {
    return this.el;
  }

  appendChild(el) {
    this.el.appendChild(el.getEl());
  }

  removeChild(el) {
    this.el.removeChild(el.getEl());
  }

  attr(options) {
    this.setAttr(options);
  }

  setAttr(options) {
    //el.setAttributeNS(null, 'transform', 'translate('+0+','+0+')')
    Object.keys(options).forEach(key => {
      this.el.setAttributeNS(null, key, options[key]);
    });
    return this;
  }

  setStyle(options) {
    this.el.style = options;
  }

  className(className) {
    this.el.setAttributeNS(null, 'class', className);
  }

  transform(translate) {
    this.el.setAttributeNS(null, 'transform', translate);
  }

  click(onClick) {
    this.el.addEventListener('click', e => {
      onClick(e);
    });
  }
}

class DraggableElement extends Element {

  drag(onDragging, onStart, onEnd) {
    //dammy dragging elementが必要？
    window.addEventListener('mousemove', e => {
      const x = e.clientX;
      const y = e.clientY;
      if (this.isDragging) {
        const transform = this.el.getAttributeNS(null, 'transform');
        onDragging(x - this.draggingX, y - this.draggingY, x, y, e);
      }
    }, false);
    /*
    this.el.addEventListener('mouseout', (e) => {
      if(this.isDragging) {
        this.isDragging = false
        onEnd()
      }
    })
    */
    window.addEventListener('mouseup', e => {
      if (this.isDragging) {
        this.isDragging = false;
        onEnd();
      }
    }, false);
    this.el.addEventListener('mousedown', e => {
      this.isDragging = true;
      this.draggingX = e.clientX;
      this.draggingY = e.clientY;
      onStart(this.draggingX, this.draggingY);
    }, false);
  }

}

const createElement = function (type, options, style) {
  const el = window.document.createElementNS('http://www.w3.org/2000/svg', type);
  //el.setAttributeNS(null, 'transform', 'translate('+0+','+0+')')
  Object.keys(options).forEach(key => {
    el.setAttributeNS(null, key, options[key]);
  });
  if (style) {
    //el.style = style
  }
  return new Element(el);
};

const createDraggableElement = function (type, options, style) {
  const el = window.document.createElementNS('http://www.w3.org/2000/svg', type);
  //el.setAttributeNS(null, 'transform', 'translate('+0+','+0+')')
  Object.keys(options).forEach(key => {
    el.setAttributeNS(null, key, options[key]);
  });
  if (style) {
    el.style = style;
  }
  return new DraggableElement(el);
};

const SVGUtil = {
  Element,
  DraggableElement,
  createElement,
  createDraggableElement
};

/* harmony default export */ __webpack_exports__["a"] = (SVGUtil);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__edge__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_svg_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_events__);





class Diagram extends __WEBPACK_IMPORTED_MODULE_3_events__["EventEmitter"] {

  constructor(rootElement) {
    super();
    this.base = __WEBPACK_IMPORTED_MODULE_2__ui_svg_util__["a" /* default */].createElement('g', {});
    rootElement.appendChild(this.base.getEl());
    this.nodes = {};
    this.connections = {};
  }

  getGroup() {
    return this.base;
  }

  addNode(id, type, bound) {

    var node = new __WEBPACK_IMPORTED_MODULE_0__node__["a" /* default */](id, this, bound, type);
    node.on('click', () => {
      this.emit("nodeClicked", { node: node });
    });
    this.nodes[id] = node;
    return node;
  }

  removeNode(id) {
    delete this.nodes[id];
  }

  updateNode(id, bound) {
    var self = this;
    this.nodes[id].setPos(bound.x, bound.y);
    this.nodes[id].setSize(bound.w, bound.h);
  }

  addConnection(id, start, end) {

    var con = new __WEBPACK_IMPORTED_MODULE_1__edge__["a" /* default */](id, this.snap, this, start, end);
    con.onclick(() => {
      this.connection_selector.setTarget(con);
    });
    this.connections[id] = con;
  }

  updateConnection(id, start, end) {
    var self = this;
    this.connections[id].setStartPos(start.x, start.y);
    this.connections[id].setEndPos(end.x, end.y);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Diagram;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__svg_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__icon_css__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__icon_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__icon_css__);




const CursorRange = 6;
const CursorOffset = 10;

class Selector extends __WEBPACK_IMPORTED_MODULE_0_events__["EventEmitter"] {
	constructor() {
		super();
		this.pos = {
			x: 0,
			y: 0
		};
		this.target = null;
		this.listeners = {
			changed: [],
			removed: []
		};
		const start = () => {};
		const end = () => {
			this.emit('change', this.target);
			this.setTarget(this.target);
		};

		this.group = __WEBPACK_IMPORTED_MODULE_1__svg_util__["a" /* default */].createElement('g', {});
		const baseAttrs = {
			fill: "#3030ff",
			stroke: "#fff",
			strokeWidth: 3,
			r: CursorRange
		};
		this.cursor = {
			n: __WEBPACK_IMPORTED_MODULE_1__svg_util__["a" /* default */].createDraggableElement('circle', Object.assign(baseAttrs, { x: 50, y: 0 })),
			s: __WEBPACK_IMPORTED_MODULE_1__svg_util__["a" /* default */].createDraggableElement('circle', Object.assign(baseAttrs, { x: 50, y: 100 })),
			w: __WEBPACK_IMPORTED_MODULE_1__svg_util__["a" /* default */].createDraggableElement('circle', Object.assign(baseAttrs, { x: 0, y: 50 })),
			e: __WEBPACK_IMPORTED_MODULE_1__svg_util__["a" /* default */].createDraggableElement('circle', Object.assign(baseAttrs, { x: 100, y: 50 })),
			nw: __WEBPACK_IMPORTED_MODULE_1__svg_util__["a" /* default */].createDraggableElement('circle', Object.assign(baseAttrs, { x: 0, y: 0 })),
			ne: __WEBPACK_IMPORTED_MODULE_1__svg_util__["a" /* default */].createDraggableElement('circle', Object.assign(baseAttrs, { x: 100, y: 0 })),
			sw: __WEBPACK_IMPORTED_MODULE_1__svg_util__["a" /* default */].createDraggableElement('circle', Object.assign(baseAttrs, { x: 0, y: 100 })),
			se: __WEBPACK_IMPORTED_MODULE_1__svg_util__["a" /* default */].createDraggableElement('circle', Object.assign(baseAttrs, { x: 100, y: 100 })),
			remove: __WEBPACK_IMPORTED_MODULE_1__svg_util__["a" /* default */].createDraggableElement('g', Object.assign(baseAttrs, { x: 120, y: 50 }))
		};

		const foreignObject = __WEBPACK_IMPORTED_MODULE_1__svg_util__["a" /* default */].createElement('foreignObject', {
			x: 10,
			y: -40,
			width: 20,
			height: 20
		});
		const div = document.createElement('div');
		foreignObject.el.appendChild(div);
		div.classList.add(__WEBPACK_IMPORTED_MODULE_2__icon_css___default.a['removeIcon']);
		this.cursor.remove.appendChild(foreignObject);

		for (var key in this.cursor) {
			this.group.appendChild(this.cursor[key]);
		}

		this.cursor["n"].drag((dx, dy, x, y, e) => {
			this.target.setPos(this.target_bound.x, this.target_bound.y + dy);
			this.target.setSize(this.target_bound.w, this.target_bound.h - dy);
			this.refresh();
		}, start, end);
		this.cursor["s"].drag((dx, dy, x, y, e) => {
			this.target.setSize(this.target_bound.w, this.target_bound.h + dy);
			this.refresh();
		}, start, end);
		this.cursor["w"].drag((dx, dy, x, y, e) => {
			this.target.setPos(this.target_bound.x + dx, this.target_bound.y);
			this.target.setSize(this.target_bound.w - dx, this.target_bound.h);
			this.refresh();
		}, start, end);
		this.cursor["e"].drag((dx, dy, x, y, e) => {
			this.target.setSize(this.target_bound.w + dx, this.target_bound.h);
			this.refresh();
		}, start, end);
		this.cursor["nw"].drag((dx, dy, x, y, e) => {
			this.target.setPos(this.target_bound.x + dx, this.target_bound.y + dy);
			this.target.setSize(this.target_bound.w - dx, this.target_bound.h - dy);
			this.refresh();
		}, start, end);
		this.cursor["ne"].drag((dx, dy, x, y, e) => {
			this.target.setPos(this.target_bound.x, this.target_bound.y + dy);
			this.target.setSize(this.target_bound.w + dx, this.target_bound.h - dy);
			this.refresh();
		}, start, end);
		this.cursor["sw"].drag((dx, dy, x, y, e) => {
			this.target.setPos(this.target_bound.x + dx, this.target_bound.y);
			this.target.setSize(this.target_bound.w - dx, this.target_bound.h + dy);
			this.refresh();
		}, start, end);
		this.cursor["se"].drag((dx, dy, x, y, e) => {
			this.target.setSize(this.target_bound.w + dx, this.target_bound.h + dy);
			this.refresh();
		}, start, end);
		this.cursor["remove"].click(() => {
			this.onRemove();
			this.clear();
		}, start, end);

		this.clear();
	}

	clear() {
		this.target = null;
		this.group.attr({
			visibility: "hidden"
		});
	}

	setTarget(node) {
		console.log('setTarget', node);

		this.group.attr({
			visibility: "visible"
		});
		if (this.target) this.target.removeListener("move", this.refresh.bind(this));
		this.target = node;
		this.target_bound = {
			x: this.target.getBound().x,
			y: this.target.getBound().y,
			w: this.target.getBound().w,
			h: this.target.getBound().h
		};
		this.pos.x = node.getX();
		this.pos.y = node.getY();
		this.refresh();
		this.target.on('move', this.refresh.bind(this));
	}

	getEl() {
		return this.group.getEl();
	}

	refresh() {

		if (!this.target) return;
		this.group.transform("translate(" + this.target.getBound().x + "," + this.target.getBound().y + ")");
		this.cursor.n.attr({
			cx: this.target.getBound().w / 2,
			cy: -CursorOffset
		});
		this.cursor.s.attr({
			cx: this.target.getBound().w / 2,
			cy: this.target.getBound().h + CursorOffset
		});
		this.cursor.w.attr({
			cx: -CursorOffset,
			cy: this.target.getBound().h / 2
		});
		this.cursor.e.attr({
			cx: this.target.getBound().w + CursorOffset,
			cy: this.target.getBound().h / 2
		});
		this.cursor.nw.attr({
			cx: -CursorOffset,
			cy: -CursorOffset
		});
		this.cursor.ne.attr({
			cx: this.target.getBound().w + CursorOffset,
			cy: -CursorOffset
		});
		this.cursor.sw.attr({
			cx: -CursorOffset,
			cy: this.target.getBound().h + CursorOffset
		});
		this.cursor.se.attr({
			cx: this.target.getBound().w + CursorOffset,
			cy: this.target.getBound().h + CursorOffset
		});
	}

	onRemove() {
		this.emit('remove', this.target);
		this.target.removeSelf();
	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Selector;


class ConnectionSelector extends __WEBPACK_IMPORTED_MODULE_0_events__["EventEmitter"] {
	constructor() {
		super();
		this.pos = {
			x: 0,
			y: 0
		};
		this.target = null;
		this.listeners = {
			changed: []
		};
		function onstart() {}
		const onend = () => {
			this.fireOnChanged(this.target);
			this.setTarget(this.target);
		};

		this.group = __WEBPACK_IMPORTED_MODULE_1__svg_util__["a" /* default */].createElement('g', {});
		const baseAttrs = {
			fill: "#3030ff",
			stroke: "#fff",
			strokeWidth: 3
		};
		this.cursor = {
			start: __WEBPACK_IMPORTED_MODULE_1__svg_util__["a" /* default */].createDraggableElement('circle', Object.assign(baseAttrs, { x: 50, y: 0, r: CursorRange })),
			end: __WEBPACK_IMPORTED_MODULE_1__svg_util__["a" /* default */].createDraggableElement('circle', Object.assign(baseAttrs, { x: 50, y: 100, r: CursorRange }))
		};
		for (var key in this.cursor) {
			this.group.appendChild(this.cursor[key]);
		}

		this.cursor["start"].drag((dx, dy, x, y, e) => {
			this.target.setStartPos(this.target_start.x + dx, this.target_start.y + dy);
			this.refresh();
		}, onstart, onend);
		this.cursor["end"].drag((dx, dy, x, y, e) => {
			this.target.setEndPos(this.target_end.x + dx, this.target_end.y + dy);
			this.refresh();
		}, onstart, onend);
		this.clear();
	}

	clear() {

		this.target = null;
		this.group.attr({
			visibility: "hidden"
		});
	}

	setTarget(connection) {

		this.group.attr({
			visibility: "visible"
		});
		if (this.target) this.target.off("onmove");
		this.target = connection;
		this.target_start = {
			x: this.target.getStartPos().x,
			y: this.target.getStartPos().y
		};
		this.target_end = {
			x: this.target.getEndPos().x,
			y: this.target.getEndPos().y
		};
		this.refresh();
		this.target.onmove(function () {
			this.refresh();
		});
	}

	refresh() {

		if (!this.target) return;
		this.cursor.start.attr({
			cx: this.target.getStartPos().x,
			cy: this.target.getStartPos().y
		});
		this.cursor.end.attr({
			cx: this.target.getEndPos().x,
			cy: this.target.getEndPos().y
		});
	}

}
/* harmony export (immutable) */ __webpack_exports__["b"] = ConnectionSelector;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__svg_util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon_css__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icon_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__icon_css__);



class ToolPalletUI {
  constructor() {
    this.el = __WEBPACK_IMPORTED_MODULE_0__svg_util__["a" /* default */].createElement('g', {
      transform: 'translate(' + 0 + ',' + 0 + ')'

    });
    const rect = __WEBPACK_IMPORTED_MODULE_0__svg_util__["a" /* default */].createElement('rect', {
      x: 0,
      y: 0,
      width: 240,
      height: 80,
      stroke: '#000',
      fill: '#fff'
    }, {
      'stroke-width': 1
    });
    this.el.appendChild(rect);
    this.length = 0;
    this.items = [];
  }

  addItem(name, className) {
    const group = __WEBPACK_IMPORTED_MODULE_0__svg_util__["a" /* default */].createElement('g', {});
    const rect = __WEBPACK_IMPORTED_MODULE_0__svg_util__["a" /* default */].createElement('foreignObject', {
      x: 0,
      y: 20,
      width: 60,
      height: 60
      //stroke: '#000',
      //fill: `url(${selectIcon})`
      //opacity: 0,
      //"background-image": `url(${selectIcon})`
    });
    const div = document.createElement('div');
    rect.el.appendChild(div);
    div.classList.add(__WEBPACK_IMPORTED_MODULE_1__icon_css___default.a[className || 'selectIcon']);
    /*
    const text = SVGUtil.createElement('text', {
      x: 0,
      y: 40,
      text: name
    })
    text.el.textContent = name
    */
    group.transform('translate(' + this.items.length * 42 + ',0)');
    group.appendChild(rect);
    //group.appendChild(text)
    this.el.appendChild(group);
    rect.click(() => {
      this.selectedToolName = name;
      this._select(div);
    });
    this.selectedToolName = name;
    this.items.push(div);
    this._select(div);
  }

  _select(target) {
    this.items.forEach(item => {
      item.style['border'] = 'solid 1px #333';
    });
    target.style['border'] = 'solid 2px #55e';
  }

  getSelectedToolName() {
    return this.selectedToolName;
  }

  getEl() {
    return this.el.getEl();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ToolPalletUI;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

//     uuid.js
//
//     Copyright (c) 2010-2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

// Unique ID creation requires a high quality random # generator.  We feature
// detect to determine the best RNG source, normalizing to a function that
// returns 128-bits of randomness, since that's what's usually required
var _rng = __webpack_require__(16);

// Maps for number <-> hex string conversion
var _byteToHex = [];
var _hexToByte = {};
for (var i = 0; i < 256; i++) {
  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
  _hexToByte[_byteToHex[i]] = i;
}

// **`parse()` - Parse a UUID into it's component bytes**
function parse(s, buf, offset) {
  var i = (buf && offset) || 0, ii = 0;

  buf = buf || [];
  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
    if (ii < 16) { // Don't overflow!
      buf[i + ii++] = _hexToByte[oct];
    }
  });

  // Zero out remaining bytes if string was short
  while (ii < 16) {
    buf[i + ii++] = 0;
  }

  return buf;
}

// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
function unparse(buf, offset) {
  var i = offset || 0, bth = _byteToHex;
  return  bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = _rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [
  _seedBytes[0] | 0x01,
  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0, _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; n++) {
    b[i + n] = node[n];
  }

  return buf ? buf : unparse(b);
}

// **`v4()` - Generate random UUID**

// See https://github.com/broofa/node-uuid for API details
function v4(options, buf, offset) {
  // Deprecated - 'format' argument, as supported in v1.2
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || _rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ii++) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || unparse(rnds);
}

// Export public API
var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;
uuid.parse = parse;
uuid.unparse = unparse;

module.exports = uuid;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_svg_util__ = __webpack_require__(0);


function Connection(id, s, diagram, start, end) {
	var self = this;
	this.id = id;
	this.start = {};
	this.end = {};
	this.elem = __WEBPACK_IMPORTED_MODULE_0__ui_svg_util__["a" /* default */].createElement('path', {
		d: "M0 0L0 0",
		fill: "none",
		stroke: "#333",
		strokeWidth: 4
	});

	this.coll = __WEBPACK_IMPORTED_MODULE_0__ui_svg_util__["a" /* default */].createDraggableElement('path', {
		d: "M0 0L0 0",
		visibility: "hidden",
		"pointer-events": "stroke",
		strokeWidth: 20
	});

	this.coll.className("node");

	diagram.getGroup().appendChild(this.elem);
	diagram.getGroup().appendChild(this.coll);

	this.setStartPos(start.getX(), start.getY());
	this.setEndPos(end.getX(), end.getY());
	start.addConnection(this);
	end.addConnection(this);
	start.on('move', () => {
		this.setStartPos(start.getX(), start.getY());
		this.refresh();
	});
	end.on('move', () => {
		this.setEndPos(end.getX(), end.getY());
		this.refresh();
	});

	this.base_start = {};
	this.base_end = {};
	this.listeners = {
		onclick: null,
		onmove: null
	};
	this.coll.drag(function (dx, dy, x, y, e) {
		self.setStartPos(self.base_start.x + dx, self.base_start.y + dy);
		self.setEndPos(self.base_end.x + dx, self.base_end.y + dy);
		if (self.listeners.onmove) self.listeners.onmove();
	}, function (x, y) {
		self.base_start.x = self.start.x;
		self.base_start.y = self.start.y;
		self.base_end.x = self.end.x;
		self.base_end.y = self.end.y;
	}, function (e) {
		diagram.fireOnConUpdate(self);
	});
	this.coll.click(function () {
		if (self.listeners.onclick) self.listeners.onclick();
	});
}

Connection.prototype.onclick = function (onclick) {
	this.listeners.onclick = onclick;
};

Connection.prototype.onmove = function (onmove) {
	this.listeners.onmove = onmove;
};

Connection.prototype.off = function (event) {
	this.listeners[event] = null;
};

Connection.prototype.setStartPos = function (x, y) {
	this.start.x = x;
	this.start.y = y;
	this.refresh();
};

Connection.prototype.setEndPos = function (x, y) {
	this.end.x = x;
	this.end.y = y;
	this.refresh();
};

Connection.prototype.getStartPos = function () {
	return this.start;
};

Connection.prototype.getEndPos = function () {
	return this.end;
};

Connection.prototype.refresh = function () {
	this.elem.attr({
		d: "M" + this.start.x + " " + this.start.y + "L" + this.end.x + " " + this.end.y
	});
	this.coll.attr({
		d: "M" + this.start.x + " " + this.start.y + "L" + this.end.x + " " + this.end.y
	});
};

/* harmony default export */ __webpack_exports__["a"] = (Connection);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_svg_util__ = __webpack_require__(0);



class Node extends __WEBPACK_IMPORTED_MODULE_0_events__["EventEmitter"] {

	constructor(id, diagram, bound, type) {
		super();
		var self = this;
		this.id = id;
		this.diagram = diagram;
		if (typeof bound.w != "number" || bound.w <= 1) bound.w = 2;
		if (typeof bound.h != "number" || bound.h <= 1) bound.h = 2;
		this.bound = {
			x: bound.x,
			y: bound.y,
			w: bound.w,
			h: bound.h
		};
		this.color = "#fff";
		this.type = type;
		this.connections = [];
		this.elem = __WEBPACK_IMPORTED_MODULE_1__ui_svg_util__["a" /* default */].createDraggableElement('rect', {
			x: 0,
			y: 0,
			width: this.bound.w,
			height: this.bound.h
		});

		/*
  if(type == "rect") this.elem = s.rect(0, 0, this.bound.w, this.bound.h);
  else if(type == "ellipse") this.elem = s.ellipse(this.bound.w/2, this.bound.h/2, this.bound.w/2, this.bound.h/2);
  else if(type == "rectangle") this.elem = s.rect(0, 0, this.bound.w, this.bound.h, 5, 5);
  else this.elem = s.ellipse(0, 0, this.bound.w, this.bound.h);
  */
		diagram.getGroup().appendChild(this.elem);
		this.start_pos = {
			x: 0,
			y: 0
		};
		this.elem.drag((dx, dy, x, y, e) => {
			self.setPos(self.start_pos.x + dx, self.start_pos.y + dy);
			this.emit('move');
		}, function (x, y) {
			self.start_pos.x = self.bound.x;
			self.start_pos.y = self.bound.y;
		}, function (e) {
			diagram.emit('nodeupdate', self);
		});
		this.elem.click(() => {
			this.emit('click');
		});
		this.init();
	}

	init(onclick) {

		this.elem.attr({
			fill: this.color,
			stroke: "#000",
			strokeWidth: 1
		});
		this.elem.className("node");
		this.refresh();
	}

	removeSelf() {
		this.diagram.getGroup().removeChild(this.elem);
		this.diagram.removeNode(this.id);
	}

	setPos(x, y) {
		this.bound.x = x;
		this.bound.y = y;
		this.refresh();
	}

	getBound() {
		return this.bound;
	}

	getX() {
		return this.bound.x;
	}

	getY() {
		return this.bound.y;
	}

	setSize(w, h) {
		if (typeof w != "number" || w <= 1) w = 2;
		if (typeof h != "number" || h <= 1) h = 2;
		this.bound.w = w;
		this.bound.h = h;
		this.refresh();
	}

	setW(w) {
		if (typeof w != "number" || w <= 1) w = 2;
		this.bound.w = w;
		this.refresh();
	}

	setH(h) {
		if (typeof h != "number" || h <= 1) h = 2;
		this.bound.h = h;
		this.refresh();
	}

	addConnection(c) {
		this.connections.push(c);
	}

	refresh() {
		this.elem.transform("translate(" + this.bound.x + "," + this.bound.y + ")");
		if (this.type == "rect" || this.type == "rectangle") {
			this.elem.attr({
				width: this.bound.w,
				height: this.bound.h
			});
		} else if (this.type == "ellipse") {
			this.elem.attr({
				cx: this.bound.w / 2,
				cy: this.bound.h / 2,
				rx: this.bound.w / 2,
				ry: this.bound.h / 2
			});
		} else {}
	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Node;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiagramEditor", function() { return DiagramEditor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__diagram_diagram__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_uuid__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_uuid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_events__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ui_toolpallet__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ui_selector__ = __webpack_require__(3);






class DiagramEditor extends __WEBPACK_IMPORTED_MODULE_2_events__["EventEmitter"] {
  constructor(el) {
    super();
    this.wrapper = window.document.getElementById(el);
    this.el = window.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.browserSize = {
      width: window.innerWidth || document.body.clientWidth,
      height: window.innerHeight || document.body.clientHeight
    };
    this.el.style.width = this.browserSize.width + 'px';
    this.el.style.height = this.browserSize.height + 'px';
    //this.el.setAttributeNS('http://www.w3.org/2000/svg', 'width', 500)
    //this.el.setAttributeNS('http://www.w3.org/2000/svg', 'height', 500)
    this.wrapper.appendChild(this.el);

    this.selector = new __WEBPACK_IMPORTED_MODULE_4__ui_selector__["a" /* Selector */]();
    this.connection_selector = new __WEBPACK_IMPORTED_MODULE_4__ui_selector__["b" /* ConnectionSelector */]();
    this.addGUILayer();

    this.diagram = new __WEBPACK_IMPORTED_MODULE_0__diagram_diagram__["a" /* default */](this.el);

    this.diagram.on('nodeClicked', e => {

      this.selector.setTarget(e.node);
    });
  }

  addGUILayer() {
    const layer = window.document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const layerClicker = window.document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    layer.setAttributeNS(null, 'transform', 'translate(' + 0 + ',' + 0 + ')');
    layerClicker.setAttributeNS(null, 'x', 0);
    layerClicker.setAttributeNS(null, 'y', 0);
    layerClicker.setAttributeNS(null, 'width', this.browserSize.width);
    layerClicker.setAttributeNS(null, 'height', this.browserSize.height);
    layerClicker.setAttributeNS(null, 'stroke', '#000');
    layerClicker.setAttributeNS(null, 'fill', '#fff');
    layerClicker.setAttributeNS(null, 'visibility', 'hidden');
    layerClicker.setAttributeNS(null, 'pointer-events', 'fill');
    /*
    base_rect.attr({
      visibility : "hidden",
      "pointer-events" : "fill"
    });
    */

    layer.appendChild(layerClicker);
    layer.appendChild(this.selector.getEl());
    layerClicker.addEventListener('click', e => {
      console.log(e);
      this.emit('click', {
        x: e.clientX,
        y: e.clientY
      });
      this.selector.clear();
      this.connection_selector.clear();
    }, false);
    this.el.appendChild(layer);

    this.selector.on("changed", node => {
      this.emit('nodeupdate', node);
    });
    this.selector.on("removed", function (node) {
      this.emit('noderemove', node);
    });
    this.connection_selector.on("changed", function (con) {
      this.emit('conupdate', con);
    });
    this.on('click', e => {
      let toolName = this.toolpallet.getSelectedToolName();
      if (toolName == "select") {} else {
        this.addNode({
          bound: {
            x: e.x,
            y: e.y,
            w: 100,
            h: 100
          }
        });
      }
    });
  }

  addNode(_options) {
    var options = _options || {};
    var id = options.id || __WEBPACK_IMPORTED_MODULE_1_uuid___default()();
    var bound = options.bound || { x: 0, y: 0, w: 100, h: 40 };
    var node = this.diagram.addNode(id, 'rectangle', bound);
    this.emit('addNode', { node: node });
    return node;
  }

  addConnection(src, target, _options) {
    var options = _options || {};
    var id = options.id || __WEBPACK_IMPORTED_MODULE_1_uuid___default()();
    this.diagram.addConnection(id, src, target);
  }

  createToolPallet(toolpallet) {
    this.toolpallet = new __WEBPACK_IMPORTED_MODULE_3__ui_toolpallet__["a" /* default */]();
    this.el.appendChild(this.toolpallet.getEl());
    //this.toolpallet.onSelect()
    return this.toolpallet;
  }
}



/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)(undefined);
// imports


// module
exports.push([module.i, ".dgF-o1ZUTv_AfRTOpLuNd {\n  width: 40;\n  height: 40;\n  background: url(" + __webpack_require__(15) + ");\n}\n\n\n._1VhS5DDjd6dVoTWmKHTcR0 {\n  width: 40;\n  height: 40;\n  background: url(" + __webpack_require__(14) + ");\n}\n\n._1ylgUu5npeNByBmH2B96uT {\n  width: 20;\n  height: 20;\n  background: url(" + __webpack_require__(18) + ");\n}\n", ""]);

// exports
exports.locals = {
	"selectIcon": "dgF-o1ZUTv_AfRTOpLuNd",
	"rectIcon": "_1VhS5DDjd6dVoTWmKHTcR0",
	"removeIcon": "_1ylgUu5npeNByBmH2B96uT"
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(12)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?modules!./icon.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?modules!./icon.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(13);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 13 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = "\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E %3Cg%3E %3Crect id='svg_1' height='48' width='56' y='6' x='2' stroke-width='1.5' stroke='%23000' fill='%23fff'/%3E %3C/g%3E %3C/svg%3E\""

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = "\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='2 2 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath stroke='%23000' transform='rotate%28-40.575660705566406 32.45265197753906,33.954856872558594%29' id='svg_1' d='m22.055768,33.904453l10.396884,-20.949598l10.396884,20.949598l-5.198442,0l0,21.050403l-10.396883,0l0,-21.050403l-5.198442,0z' stroke-width='1.5' fill='%23fff'/%3E%3C/g%3E%3C/svg%3E\""

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
var rng;

var crypto = global.crypto || global.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
  // Moderately fast, high quality
  var _rnds8 = new Uint8Array(16);
  rng = function whatwgRNG() {
    crypto.getRandomValues(_rnds8);
    return _rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var  _rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return _rnds;
  };
}

module.exports = rng;


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }),
/* 17 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E %3Cg%3E %3Cellipse ry='20' rx='20' id='svg_1' cy='20' cx='20' stroke-width='1.5' stroke='%23ff0000' fill='%23ff5656'/%3E %3Cellipse ry='93' id='svg_2' cy='93.75' cx='1.75' stroke-width='1.5' stroke='%23000' fill='%23fff'/%3E %3Cpath stroke='%23ff0000' id='svg_3' d='m7.914208,14.126632l5.514531,-6.039724l5.858,6.415853l5.858,-6.415853l5.514582,6.039724l-5.858002,6.415905l5.858002,6.415905l-5.514582,6.039781l-5.858,-6.415907l-5.858,6.415907l-5.514531,-6.039781l5.857952,-6.415905l-5.857952,-6.415905z' stroke-width='0' fill='%23ffffff'/%3E %3C/g%3E %3C/svg%3E\""

/***/ })
/******/ ]);
});