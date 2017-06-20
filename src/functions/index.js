import { canvas, ctx, canvasWidth } from '../constants/';
import board from '../components/board';
import grenade from '../components/grenade';
import Coal from '../components/coal';

let rect = canvas.getBoundingClientRect();
let mouseX = 0;
let renderStart = false;
let coals = createCoals();

// todo добавить управление движением с помощью ракетки

export function mouseMoveHandler(e) {
	mouseX = e.clientX - rect.left - board.width / 2;
	let mod = mouseX % 10;
	if (mod !== 0 && mod < 5) {
		mouseX -= mod;
	} else if (mod !== 0 && mod >= 5) {
		mouseX += (10 - mod);
	}
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
	for (let coal of coals) {
		let dx = coal.posX - grenade.posX;
		let dy = coal.posY - grenade.posY;
		let dist = Math.sqrt(dx * dx + dy * dy);
		if (dist < 10) {
			coal.destroy();
			if (Math.abs(dx) >= Math.abs(dy)) {
				console.log('Change X');
				grenade.vx *= -1;
			} else {
				console.log('Change Y');
				grenade.vy *= -1;
			}
			console.log(`dx: ${dx}, dy: ${dy}`);
		} else {
			coal.create();
		}
	}
	if (grenade.posY > ctx.canvas.clientHeight) {
		gameOver();
	}
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

function createCoals() {
	let coals = [];
	let add = Math.random() < .5 ? .1 : 0;
	for (let i = 0; i < 1e2; i++) {
		/*let posX = Math.floor((Math.random() + add) * 10) * canvasWidth / 10;
		let posY = Math.floor((Math.random() + add) * 10) * canvasWidth / 10;*/

		let posX = i * 10;
		let posY = 200;

		if (posX >= canvasWidth) {
			posX -= canvasWidth;
			posY -= 10;
		}

		coals.push( new Coal(
			posX === canvasWidth ? canvasWidth - 10 : posX,
			posY
		));
	}

	return coals;
}

function gameOver() {
	board.width -= board.width / 10;
	grenade.posY = 880;
	grenade.posX = mouseX;
	grenade.onBoard = true;
}

export default mouseX;