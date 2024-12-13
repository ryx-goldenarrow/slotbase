import { Sprite, Assets, Application } from "pixi.js";
import SpineObject from "../../view/components/SpineObject";
import { isPortrait } from "../../utils/Utils";

export default class Background extends Sprite {
	public background: Sprite;
	private app: Application;

	public dragon: SpineObject;

	constructor(app: Application) {
		super();
		this.anchor.set(0.5);
		this.pivot.set(0.5);
		this.background = new Sprite();
		this.dragon = new SpineObject("chr");
		this.app = app;
		this.init();
		this.resize();
	}

	init() {
		this.background = this.addChild(new Sprite(Assets.get("bg")));
		this.background.anchor.set(0.5);
		this.background.pivot.set(0.5);
		this.dragon.animate(0, "idle");
		this.addChild(this.dragon);
	}

	resize() {
		if (isPortrait()) {
			//portrait
			this.dragon.position.set(-540, 180);
			this.dragon.scale.set(0.75);
		} else {
			this.dragon.position.set(-680, 180);
			this.dragon.scale.set(0.75);
		}
	}
}
