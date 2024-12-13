import { Sprite, Assets } from "pixi.js";
import SymbolTemplate from "./SymbolTemplate";

export default class ReelTemplate extends Sprite {
	public symbol: SymbolTemplate[] = [];
	private HEIGHT_GAP: number = 200;

	constructor() {
		super();
		this.anchor.set(0.5);
		this.pivot.set(0.5);

		this.init();
	}

	init() {
		let i: number = 0;

		for (i = 0; i < 3; i++) {
			this.symbol[i] = this.addChild(new SymbolTemplate());
			this.symbol[i].anchor.set(0.5);
			this.symbol[i].pivot.set(0.5);
			this.symbol[i].position.set(0, -this.HEIGHT_GAP + i * this.HEIGHT_GAP);
		}
	}
}
