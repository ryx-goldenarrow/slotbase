import { Sprite, Assets, HTMLText } from "pixi.js";
import { isLandscape, numberComma } from "../../utils/Utils";
import { GAMEDATA } from "../../../api/GAMEDATA";
import { CURRENCY } from "../../../enums";

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
					text: GAMEDATA.CURRENCY + " 0",
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

	updateText() {
		let i: number = 0;
		let data: string[] = [GAMEDATA.PLATINUM, GAMEDATA.GOLD, GAMEDATA.SILVER];
		for (i = 0; i < data.length; i++) {
			this.textLabel[i].text =
				GAMEDATA.CURRENCY + " " + numberComma(parseInt(data[i]));
		}
	}
}
