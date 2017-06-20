import { ctx } from '../constants/';

const board = {
	width: 100,
	move(mouseX) {
		
		ctx.save();
		ctx.fillRect(mouseX, 890, this.width, 10);
		ctx.restore();
	}
};

export default board;