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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rect = _constants.canvas.getBoundingClientRect();
var mouseX = 0;
var renderStart = false;

function mouseMoveHandler(e) {
	mouseX = e.clientX - rect.left - _board2.default.width / 2;
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

/*function render() {
	mouseInCanvas && window.requestAnimationFrame(render);
	ctx.clearRect(0, 0, canvasWidth, ctx.canvas.clientHeight);
	board.move();

	if (!fire) {
		moveGrenade(mouseX + boardWidth / 2, 880, 'red');
	} else {
		//moveGrenade(, , 'red');
	}

	mouseInCanvas = false;
}

function moveBoard() {
	ctx.save();
	ctx.fillRect(mouseX, 890, boardWidth, 10);
	ctx.restore();
}

function stabilizeMousePos() {
	if (mouseX < 0) {
		mouseX += Math.abs(mouseX);
	} else if (mouseX > canvasWidth - boardWidth) {
		mouseX -= mouseX - (canvasWidth - boardWidth);
	}
}

function moveGrenade(posX, posY, color) {
	ctx.save();
	ctx.fillStyle = color;
	ctx.fillRect(posX, posY, 10, 10);
	ctx.restore();
}*/

var coals = [];

/***/ })
/******/ ]);