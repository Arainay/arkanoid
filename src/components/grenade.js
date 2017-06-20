import { ctx } from '../constants/';

const greande = {
	vx: 1,
	vy: -1,
	posX: 0,
	posY: 880,
	onBoard: true,
	move(mouseX) {
		ctx.save();
		ctx.fillStyle = 'red';
		if (!this.onBoard) {
			this.posX += this.vx;
			this.posY += this.vy;
			if (this.posX > ctx.canvas.clientWidth - 10 || this.posX < 1) {
				this.vx *= -1;
			}
			if (this.posY < 1) {
				this.vy *= -1;
			}
			ctx.fillRect(this.posX, this.posY, 10, 10);
		} else {
			this.posX = mouseX;
			ctx.fillRect(mouseX, 880, 10, 10);
		}
		ctx.restore();
	}
};

export default greande;