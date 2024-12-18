import "pixi.js/text-bitmap";
import { Sprite, Assets, Text, HTMLText } from "pixi.js";
import { isLandscape, nFormatter } from "../../utils/Utils";
import { GAMEDATA } from "../../../api/GAMEDATA";

export default class JackpotTopBar extends Sprite {
	private background: Sprite[] = [];
	private imgLabel: Sprite[] = [];
	private textLabel: HTMLText[] = [];

	constructor() {
		super();

		this.anchor.set(0.5);
		this.pivot.set(0.5);

		let textures: string[] = ["platinum", "gold", "silver"];
		let i: number = 0;

		for (i = 0; i < 3; i++) {
			this.background[i] = this.addChild(new Sprite(Assets.get("bg_bar_top")));
			this.background[i].anchor.set(0.5);
			this.background[i].pivot.set(0.5);
			this.background[i].position.set(-365 + 365 * i, -15);

			this.imgLabel[i] = this.background[i].addChild(
				new Sprite(Assets.get(textures[i]))
			);
			this.imgLabel[i].anchor.set(0, 0.5);
			this.imgLabel[i].position.set(-180, 0);

			this.textLabel[i] = this.background[i].addChild(
				new HTMLText({
					text: "IDR 100.00",
					style: {
						fontFamily: "Arial",
						fontSize: 25,
						align: "left",
						fill: 0xffffff,
					},
				})
			);
			this.textLabel[i].anchor.set(0, 0.5);
			this.textLabel[i].position.set(-20, 0);
		}

		this.resize();
	}

	resize() {
		if (isLandscape()) {
			//this.textLabel.position.set(-20, 30);
		} else {
			//--
		}
	}

	updateText(silver: string, gold: string, platinum: string) {
		//this.textLabel.text = GAMEDATA.CURRENCY + " " + nFormatter(GAMEDATA.CREDIT);
	}
}
