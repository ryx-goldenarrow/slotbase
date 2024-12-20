import { Sprite, Assets } from "pixi.js";
import SpineObject from "../../view/components/SpineObject";
import { gsap, Sine, Elastic, Power0, Back } from "gsap";

export default class SymbolTemplate extends Sprite {
	public base: Sprite;
	public spine: SpineObject;
	public sparkle: SpineObject;
	public symboldID: number = 0;
	public symbolNames: string[] = [
		"symbol_n1", //0 - a
		"symbol_n2", //1 - k
		"symbol_n3", //2 - q
		"symbol_n4", //3 - j
		"symbol_h1", //4 -dragon
		"symbol_h2", //5 - phoenix
		"symbol_h3", //6 - tiger
		"symbol_h4", //7 - turtle
		"symbol_scatter", //8 dragon hand
		"symbol_wild", //9 wild
	];

	public symbolTexture: string[] = [
		"N1", //0 - a
		"N2", //1 - k
		"N3", //2 - q
		"N4", //3 - j
		"H1", //4 - dragon
		"H2", //5 - tiger
		"H3", //6 - phoenix
		"H4", //7 - turtle
		"Scatter", //8 dragon hand
		"Wild", //9 wild
	];

	constructor(id: number) {
		super();
		this.anchor.set(0.5);
		this.pivot.set(0.5);
		this.cullable = true;

		this.base = this.addChild(Sprite.from(Assets.get(this.symbolNames[id])));
		this.spine = this.addChild(new SpineObject("symbol"));
		this.sparkle = this.addChild(new SpineObject("change"));
		this.init();
	}

	init() {
		this.base.anchor.set(0.5);
		this.base.pivot.set(0.5);
		this.spine.scale.set(0.65);
		this.reset();
	}

	play() {
		this.spine.visible = true;
		this.spine.animate(
			0,
			this.symbolTexture[this.symboldID] + "_play_win",
			false
		);
	}

	changeSymbol(id: number) {
		this.symboldID = id;
		this.base.texture = Assets.get(this.symbolNames[id]);
	}

	changeWinSymbol(id: number) {
		this.sparkle.animate(0, "animation", false);
		this.symboldID = id;

		gsap.to(this, 0.1, {
			startAt: { alpha: 0 },
			alpha: 1,
			delay: 0.8,
			onCompete: () => {
				this.base.texture = Assets.get(this.symbolNames[id]);
			},
		});
	}

	animateChange() {
		this.sparkle.animate(0, "animation", false);
	}

	reset() {
		this.spine.stop();
		this.spine.visible = false;
	}
}
