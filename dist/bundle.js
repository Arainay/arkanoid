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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var canvas = exports.canvas = document.getElementById('field');
var ctx = exports.ctx = canvas.getContext('2d');
var canvasWidth = exports.canvasWidth = ctx.canvas.clientWidth;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.mouseMoveHandler = mouseMoveHandler;
exports.mouseClickHandler = mouseClickHandler;

var _constants = __webpack_require__(0);

var _board = __webpack_require__(2);

var _board2 = _interopRequireDefault(_board);

var _grenade = __webpack_require__(3);

var _grenade2 = _interopRequireDefault(_grenade);

var _coal = __webpack_require__(5);

var _coal2 = _interopRequireDefault(_coal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rect = _constants.canvas.getBoundingClientRect();
var mouseX = 0;
var renderStart = false;
var coals = createCoals();

// todo добавить управление движением с помощью ракетки

function mouseMoveHandler(e) {
	mouseX = e.clientX - rect.left - _board2.default.width / 2;
	var mod = mouseX % 10;
	if (mod !== 0 && mod < 5) {
		mouseX -= mod;
	} else if (mod !== 0 && mod >= 5) {
		mouseX += 10 - mod;
	}
	stabilizeMousePos();
	!renderStart && render();
}

function mouseClickHandler() {
	if (_grenade2.default.onBoard) _grenade2.default.onBoard = false;
}

function render() {
	_constants.ctx.clearRect(0, 0, _constants.canvasWidth, _constants.ctx.canvas.clientHeight);
	_board2.default.move(mouseX);
	_grenade2.default.move(mouseX + _board2.default.width / 2);
	renderStart = true;
	hitBack();
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = coals[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var coal = _step.value;

			var dx = coal.posX - _grenade2.default.posX;
			var dy = coal.posY - _grenade2.default.posY;
			var dist = Math.sqrt(dx * dx + dy * dy);
			if (dist < 10) {
				coal.destroy();
				if (dx < dy) {
					_grenade2.default.vx *= -1;
				} else {
					_grenade2.default.vy *= -1;
				}
			} else {
				coal.create();
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	window.requestAnimationFrame(render);
}

function stabilizeMousePos() {
	if (mouseX < 0) {
		mouseX += Math.abs(mouseX);
	} else if (mouseX > _constants.canvasWidth - _board2.default.width) {
		mouseX -= mouseX - (_constants.canvasWidth - _board2.default.width);
	}
}

function hitBack() {
	if (_grenade2.default.posY >= _constants.ctx.canvas.clientHeight - 20 && _grenade2.default.posX <= mouseX + _board2.default.width && _grenade2.default.posX >= mouseX) {
		_grenade2.default.vy *= -1;
	}
}

function createCoals() {
	var coals = [];
	var add = Math.random() < .5 ? .1 : 0;
	for (var i = 0; i < 1e2; i++) {
		var posX = Math.floor((Math.random() + add) * 10) * _constants.canvasWidth / 10;
		var posY = Math.floor((Math.random() + add) * 10) * _constants.canvasWidth / 10;
		coals.push(new _coal2.default(posX === _constants.canvasWidth ? _constants.canvasWidth - 10 : posX, posY));
	}

	return coals;
}

exports.default = mouseX;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _constants = __webpack_require__(0);

var board = {
	width: 100,
	move: function move(mouseX) {
		_constants.ctx.save();
		_constants.ctx.fillRect(mouseX, 890, this.width, 10);
		_constants.ctx.restore();
	}
};

exports.default = board;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _constants = __webpack_require__(0);

var greande = {
	vx: 1,
	vy: -1,
	posX: 0,
	posY: 880,
	onBoard: true,
	move: function move(mouseX) {
		_constants.ctx.save();
		_constants.ctx.fillStyle = 'red';
		if (!this.onBoard) {
			this.posX += this.vx;
			this.posY += this.vy;
			if (this.posX > _constants.ctx.canvas.clientWidth - 10 || this.posX < 1) {
				this.vx *= -1;
			}
			if (this.posY < 1) {
				this.vy *= -1;
			}

			// Game over
			if (this.posY > _constants.ctx.canvas.clientHeight) {
				console.log('Game over');
			}

			_constants.ctx.fillRect(this.posX, this.posY, 10, 10);
		} else {
			this.posX = mouseX;
			_constants.ctx.fillRect(mouseX, 880, 10, 10);
		}
		_constants.ctx.restore();
	}
};

exports.default = greande;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _constants = __webpack_require__(0);

var _functions = __webpack_require__(1);

_constants.canvas.addEventListener('mousemove', _functions.mouseMoveHandler);
_constants.canvas.addEventListener('click', _functions.mouseClickHandler);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Coal = function () {
	function Coal(posX, posY) {
		_classCallCheck(this, Coal);

		this.posX = posX;
		this.posY = posY;
		this.color = '#0d00ff';
		this.create();
	}

	_createClass(Coal, [{
		key: 'create',
		value: function create() {
			if (!this.posX && !this.posY) return;
			_constants.ctx.save();
			_constants.ctx.fillStyle = this.color;
			_constants.ctx.fillRect(this.posX, this.posY, 10, 10);
			_constants.ctx.restore();
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			this.posX = false;
			this.posY = false;
		}
	}]);

	return Coal;
}();

exports.default = Coal;

/***/ })
/******/ ]);