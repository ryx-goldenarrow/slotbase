import { Sprite, Assets } from "pixi.js";
import { generateRandom } from "../../utils/Utils";
import SpineObject from "../../view/components/SpineObject";

export default class SymbolTemplate extends Sprite {
	public base: Sprite;
	public spine: SpineObject;

	public symbolNames: string[] = [
		"symbol_n1", //0 - j
		"symbol_n2", //1 - q
		"symbol_n3", //2 - k
		"symbol_n4", //3 - a
		"symbol_h1", //4 -
		"symbol_h2", //5 - phoenix
		"symbol_h3", //6 - tiger
		"symbol_h4", //7 - turtle
		"symbol_wild", //8 wild
		"symbol_scatter", //9 dragon hand
	];

	constructor(id: number) {
		super();
		this.anchor.set(0.5);
		this.pivot.set(0.5);
		this.base = this.addChild(new Sprite(Assets.get(this.symbolNames[id])));
		this.spine = this.addChild(new SpineObject("symbol"));

		this.init();
	}

	init() {
		this.base.anchor.set(0.5);
		this.base.pivot.set(0.5);
		this.spine.scale.set(0.65);
		this.reset();
	}

	play(sybol_id: string) {
		this.spine.visible = true;
		this.spine.animate(0, sybol_id + "_play_win", false);
	}

	changeSymbol(id: number) {
		this.base.texture = Assets.get(this.symbolNames[id]);
	}

	reset() {
		this.spine.visible = false;
	}
}
