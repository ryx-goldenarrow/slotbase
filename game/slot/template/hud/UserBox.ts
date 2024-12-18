import "pixi.js/text-bitmap";
import { Sprite, Assets, Text } from "pixi.js";
import { isLandscape, nFormatter } from "../../utils/Utils";

export default class UserBox extends Sprite {
	private background: Sprite;
	private textBetLabel: Text;

	constructor() {
		super();

		this.anchor.set(0.5);
		this.pivot.set(0.5);

		this.background = this.addChild(new Sprite(Assets.get("bg_user")));
		this.background.anchor.set(0.5);
		this.background.pivot.set(0.5);

		this.textBetLabel = this.addChild(
			new Text({
				text: "",
				style: {
					fontFamily: "Arial",
					fontSize: 35,
					align: "center",
					fill: 0xdddd00,
				},
			})
		);
		this.textBetLabel.anchor.set(0.5);

		this.updateText(10);
		this.resize();
	}

	resize() {
		if (isLandscape()) {
			//--
		} else {
			//--
		}
	}

	updateText(bet: number) {
		this.textBetLabel.text = nFormatter(bet);
	}
}
