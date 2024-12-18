import "pixi.js/text-bitmap";
import { Sprite, Assets, Text, HTMLText } from "pixi.js";
import { isLandscape, nFormatter } from "../../utils/Utils";
import { GAMEDATA } from "../../../api/GAMEDATA";

export default class UserBox extends Sprite {
	private background: Sprite;
	private textCreditLabel: HTMLText;

	constructor() {
		super();

		this.anchor.set(0.5);
		this.pivot.set(0.5);

		this.background = this.addChild(new Sprite(Assets.get("bg_user")));
		this.background.anchor.set(0.5);
		this.background.pivot.set(0.5);

		this.textCreditLabel = this.addChild(
			new HTMLText({
				text: "IDR 100,000.00",
				style: {
					fontFamily: "Arial",
					fontSize: 20,
					align: "left",
					fill: 0xdddd00,
				},
			})
		);
		this.textCreditLabel.anchor.set(0, 0.5);
		this.textCreditLabel;

		this.resize();
	}

	resize() {
		if (isLandscape()) {
			this.textCreditLabel.position.set(-65, 35);
		} else {
			//--
		}
	}

	updateText() {
		this.textCreditLabel.text =
			GAMEDATA.CURRENCY + " " + nFormatter(GAMEDATA.CREDIT);
	}
}
