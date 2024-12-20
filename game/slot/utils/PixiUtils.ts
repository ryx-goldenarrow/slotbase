//change graphics color

import { Graphics } from "pixi.js";

export function changeGraphicsColor(
	gfx: Graphics,
	color: string,
	duration: number = 1
) {
	gsap.to(gfx, { duration: duration, pixi: { lineColor: color } });
}
