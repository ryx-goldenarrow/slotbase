import "pixi.js/text-bitmap";
import { Sprite, Assets, Text, NineSliceSprite } from "pixi.js";

export default class TotalWinTemplate extends Sprite {
	private background: NineSliceSprite;
	private textTotalWinLabel: Text;
	private textTotalWinAmount: Text;

	constructor() {
		super();

		this.anchor.set(0.5);
		this.pivot.set(0.5);

		this.background = this.addChild(new NineSliceSprite(Assets.get("bg_bet")));
		this.background.position.set(-200, 0);
		this.background.scale.x = 1.75;
		this.background.pivot.set(0.5);

		this.textTotalWinLabel = this.addChild(
			new Text({
				text: "TOTAL WIN:",
				style: {
					fontFamily: "Arial",
					fontSize: 35,
					align: "center",
					fill: 0xffffff,
				},
			})
		);
		this.textTotalWinLabel.anchor.set(0.5);
		this.textTotalWinLabel.position.set(-70, 35);

		this.textTotalWinAmount = this.addChild(
			new Text({
				text: "1,000",
				style: {
					fontFamily: "Arial",
					fontSize: 35,
					align: "center",
					fill: 0xffcc00,
				},
			})
		);
		this.textTotalWinAmount.anchor.set(0.5);
		this.textTotalWinAmount.position.set(140, 35);
	}
}
