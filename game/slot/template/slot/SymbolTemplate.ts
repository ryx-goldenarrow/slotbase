import { Sprite, Assets } from "pixi.js";
import { generateRandom } from "../../utils/Utils";
import SpineObject from "../../view/components/SpineObject";

export default class SymbolTemplate extends Sprite {
	public base: Sprite;

	public spine: SpineObject;

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
		this.base = new Sprite();
		this.spine = new SpineObject("symbol");

		this.init();
	}

	init() {
		let id: number = generateRandom(10);

		this.base = this.addChild(new Sprite(Assets.get(this.symbolNames[id])));
		this.base.anchor.set(0.5);
		this.base.pivot.set(0.5);

		this.addChild(this.spine);

		this.spine.scale.set(0.65);

		this.play();
	}

	play(sybol_id: string = "H1") {
		this.spine.visible = true;
		this.spine.animate(0, sybol_id + "_play_win", false);
	}

	changeSymbol() {}

	reset() {
		this.spine.visible = false;
	}
}
