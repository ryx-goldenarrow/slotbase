import { Sprite, Assets } from "pixi.js";
import { generateRandom } from "../../utils/Utils";

export default class SymbolTemplate extends Sprite {
	public background: Sprite;
	public symbolNames: string[] = [
		"symbol_h1",
		"symbol_h2",
		"symbol_h3",
		"symbol_h4",
		"symbol_n1",
		"symbol_n2",
		"symbol_n3",
		"symbol_n4",
		"symbol_scatter",
		"symbol_wild",
	];

	constructor() {
		super();
		this.anchor.set(0.5);
		this.pivot.set(0.5);
		this.background = new Sprite();

		this.init();
	}

	init() {
		let id: number = generateRandom(10);

		this.background = this.addChild(
			new Sprite(Assets.get(this.symbolNames[id]))
		);
		this.background.anchor.set(0.5);
		this.background.pivot.set(0.5);
	}
}
