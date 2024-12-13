import * as PIXI from "pixi.js";
import { gsap } from "gsap";

export function generateRandom(_range: number, startAt: number = 0): number {
	let rdm: number = Math.floor(Math.random() * (startAt + _range));
	return rdm;
}

export function setFullscreen(_id: boolean): void {
	const docElmWithBrowsersFullScreenFunctions =
		document.documentElement as HTMLElement & {
			webkitRequestFullscreen(): Promise<void>;
		};

	const docWithBrowsersExitFunctions = document as Document & {
		webkitExitFullscreen(): Promise<void>;
	};

	if (_id == true) {
		try {
			docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
		} catch (err) {}
	} else {
		try {
			docWithBrowsersExitFunctions.webkitExitFullscreen();
		} catch (err) {}
	}
}

//
export function shuffleArray(arr: number[]): number[] {
	let i: number = 0;
	let temp: number = 0;
	let j: number = 0;

	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}

	return arr;
}

//degrees to radian
export function degToRad(angle: number): number {
	return angle * (Math.PI / 180);
}

//radius to degrees
export function radToDeg(radians: number) {
	return radians * (180 / Math.PI);
}

//check landscape
export function isLandscape() {
	return window.matchMedia("(orientation: landscape)").matches;
}

//check portrait
export function isPortrait() {
	return window.matchMedia("(orientation: portrait)").matches;
}

//change graphics color
export function changeGraphicsColor(
	gfx: PIXI.Graphics,
	color: string,
	duration: number = 1
) {
	gsap.to(gfx, { duration: duration, pixi: { lineColor: color } });
}

export function numberFormatter(number: number) {
	var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

	// what tier? (determines SI symbol)
	var tier = (Math.log10(Math.abs(number)) / 3) | 0;

	// if zero, we don't need a suffix
	if (tier == 0) return number;

	// get suffix and determine scale
	var suffix = SI_SYMBOL[tier];
	var scale = Math.pow(10, tier * 3);

	// scale the number
	var scaled: number = number / scale;

	// format number and add suffix
	return scaled.toFixed(2) + suffix;
}

export function nFormatter(num: number) {
	if (num >= 1000000000) {
		return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
	} else if (num >= 1000000) {
		return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
	} else if (num >= 1000) {
		return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
	} else if (num <= 10) {
		return (Math.round(num * 100) / 100).toFixed(2);
	}

	return num;
}
