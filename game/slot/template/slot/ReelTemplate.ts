import { Sprite, BlurFilter } from "pixi.js";
import SymbolTemplate from "./SymbolTemplate";

export default class ReelTemplate extends Sprite {
	public symbol: SymbolTemplate[] = [];
	private HEIGHT_GAP: number = 200;

	private blurFilter = new BlurFilter({
		strengthY: 4,
		strengthX: 1,
		quality: 4,
		resolution: 1,
		kernelSize: 5,
	});

	constructor(symbol_id: number[]) {
		super();
		this.anchor.set(0.5);
		this.pivot.set(0.5);
		this.init(symbol_id);
	}

	init(symbol_id: number[]) {
		let i: number = 0;
		for (i = 0; i < 3; i++) {
			this.symbol[i] = this.addChild(new SymbolTemplate(symbol_id[i]));
			this.symbol[i].anchor.set(0.5);
			this.symbol[i].pivot.set(0.5);
			this.symbol[i].position.set(0, -this.HEIGHT_GAP + i * this.HEIGHT_GAP);
		}
	}

	updateSymbolTexture(texture_id: number[]) {
		let i: number = 0;
		for (i = 0; i < 3; i++) {
			this.symbol[i].changeSymbol(texture_id[i]);
		}
	}

	animateSymbolTexture(symbol_id: number, texture_id: number) {
		this.symbol[symbol_id].play();
	}

	changeSymbolTexture(symbol_id: number, texture_id: number) {
		this.symbol[symbol_id].reset();
		this.symbol[symbol_id].changeWinSymbol(texture_id);
	}

	applyBlur() {
		this.filters = [this.blurFilter];
	}

	removeFilter() {
		this.filters = [];
	}

	resetSymbols() {
		let i: number = 0;
		for (i = 0; i < 3; i++) {
			this.symbol[i].reset();
		}
	}
}
