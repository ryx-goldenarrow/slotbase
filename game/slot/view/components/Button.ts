import { Sprite, Assets } from "pixi.js";

export default class Button extends Sprite {
	private base: Sprite;

	constructor(baseTexture: string, disabledTexture: string = "") {
		super();
		this.anchor.set(0.5);
		this.pivot.set(0.5);
		this.base = new Sprite(new Sprite(Assets.get(baseTexture)));

		//this.init();
	}

	//init() {}
}
