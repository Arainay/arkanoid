import { canvas, ctx, canvasWidth } from './constants/';
import { mouseMoveHandler, mouseClickHandler, createCoals } from './functions/';

canvas.addEventListener('mousemove', mouseMoveHandler);
canvas.addEventListener('click', mouseClickHandler);