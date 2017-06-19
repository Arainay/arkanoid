import { canvas, ctx, canvasWidth } from '../constants/';
import board from '../components/board';
import grenade from '../components/grenade';

let rect = canvas.getBoundingClientRect();
let mouseX = 0;
let renderStart = false;

export function mouseMoveHandler(e) {
	mouseX = e.clientX - rect.left - board.width / 2;
	stabilizeMousePos();
	!renderStart && render();
}

export function mouseClickHandler() {
	if (grenade.onBoard) grenade.onBoard = false;
}

function render() {
	ctx.clearRect(0, 0, canvasWidth, ctx.canvas.clientHeight);
	board.move(mouseX);
	grenade.move(mouseX + board.width / 2);
	renderStart = true;
	hitBack();
	window.requestAnimationFrame(render);
}

function stabilizeMousePos() {
	if (mouseX < 0) {
		mouseX += Math.abs(mouseX);
	} else if (mouseX > canvasWidth - board.width) {
		mouseX -= mouseX - (canvasWidth - board.width);
	}
}

function hitBack() {
	if (
		(grenade.posY >= ctx.canvas.clientHeight - 20)
			&& (grenade.posX <= (mouseX + board.width) && grenade.posX >= mouseX)) {
		grenade.vy *= -1;
	}
}

export default mouseX;