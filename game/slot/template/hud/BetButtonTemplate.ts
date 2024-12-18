import "pixi.js/text-bitmap";
import { Sprite, Assets, HTMLText } from "pixi.js";
import { isLandscape, nFormatter } from "../../utils/Utils";

export default class BetButtonTemplate extends Sprite {
	private background: Sprite;
	private btnBetAdd: Sprite;
	private btnBetMin: Sprite;
	private textBetLabel: HTMLText;

	constructor() {
		super();

		this.anchor.set(0.5);
		this.pivot.set(0.5);

		this.background = this.addChild(new Sprite(Assets.get("bg_bet")));
		this.background.anchor.set(0.5);
		this.background.pivot.set(0.5);

		this.btnBetAdd = this.addChild(new Sprite(Assets.get("btn_bet_add")));
		this.btnBetAdd.anchor.set(0.5);
		this.btnBetAdd.pivot.set(0.5);
		this.btnBetAdd.position.set(165, 0);

		this.btnBetMin = this.addChild(new Sprite(Assets.get("btn_bet_min")));
		this.btnBetMin.anchor.set(0.5);
		this.btnBetMin.pivot.set(0.5);
		this.btnBetMin.position.set(-165, 0);

		this.textBetLabel = this.addChild(
			new HTMLText({
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
		this.textBetLabel.roundPixels = false;

		this.updateText(500);
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
		this.textBetLabel.text = "IDR " + nFormatter(bet);
	}
}
