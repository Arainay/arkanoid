import { ctx } from '../constants/';

export default class Coal {
	constructor(posX, posY) {
		this.posX = posX;
		this.posY = posY;
		this.color = '#0d00ff';
		this.create();
	}

	create() {
		if (!this.posX && !this.posY) return;
		ctx.save();
		ctx.fillStyle = this.color;
		ctx.fillRect(this.posX, this.posY, 10, 10);
		ctx.restore();
	}

	destroy() {
		this.posX = false;
		this.posY = false;
	}
}