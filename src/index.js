import { canvas, ctx, canvasWidth } from './constants/';
import { mouseMoveHandler, mouseClickHandler } from './functions/';

canvas.addEventListener('mousemove', mouseMoveHandler);

canvas.addEventListener('click', mouseClickHandler);

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

let coals = [];