import { Sprite, Assets } from "pixi.js";
import SymbolTemplate from "./SymbolTemplate";

export default class ReelTemplate extends Sprite {
	public symbol: SymbolTemplate[] = [];
	private HEIGHT_GAP: number = 200;

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
}
