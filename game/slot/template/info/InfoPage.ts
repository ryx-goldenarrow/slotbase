import { Sprite, Assets, Container } from "pixi.js";
import { generateRandom } from "../../utils/Utils";
import SpineObject from "../../view/components/SpineObject";

export default class InfoPage extends Sprite {
	public base: Sprite;
	public preview: Sprite[] = [];
	public navigation: Sprite[] = [];
	public labels: Sprite[] = [];

	public pages: Container[] = [];

	public btn_close: Sprite;

	constructor() {
		super();
		this.anchor.set(0.5);
		this.pivot.set(0.5);

		this.base = this.addChild(new Sprite(Assets.get("g007_img_ru_1")));
		this.base.anchor.set(0.5);
		this.base.pivot.set(0.5);

		this.btn_close = this.base.addChild(new Sprite(Assets.get("btn_xclose")));
		this.btn_close.position.set(520, -330);
		this.btn_close.interactive = true;

		this.pages[0] = this.base.addChild(new Container());
		this.pages[1] = this.base.addChild(new Container());

		this.drawPage1();
		this.drawPage2();

		this.init();
	}

	drawPage1() {
		//draw page 1
		this.preview[0] = this.pages[0].addChild(
			new Sprite(Assets.get("g007_img_ru_2"))
		);
		this.preview[0].position.x = -260;
		this.preview[0].anchor.set(0.5);

		this.preview[1] = this.pages[0].addChild(
			new Sprite(Assets.get("g007_img_ru_3"))
		);
		this.preview[1].position.x = 260;
		this.preview[1].anchor.set(0.5);

		this.labels[0] = this.pages[0].addChild(
			new Sprite(Assets.get("free_game"))
		);
		this.labels[0].anchor.set(0.5);
		this.labels[0].position.y = -200;
	}

	drawPage2() {
		//draw page 2
	}

	init() {
		this.reset();
	}

	close() {
		this.visible = false;
	}

	open() {
		this.visible = true;
	}

	reset() {}
}
