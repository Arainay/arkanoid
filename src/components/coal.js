import { ctx } from '../constants/';

let greande = {
	posX: 0,
	posY: 0,
	create() {
		ctx.save();
		ctx.fillStyle = '#ff0000';
		ctx.fillRect(this.posX, this.posY, 10, 10);
		ctx.restore();
	},
	destroy() {
		ctx.clearRect(this.posX, this.posY, 10, 10);
	}
};

export default greande;