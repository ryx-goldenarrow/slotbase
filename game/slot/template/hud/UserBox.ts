import "pixi.js/text-bitmap";
import { Sprite, Assets, Text, HTMLText } from "pixi.js";
import { isLandscape, nFormatter, numberComma } from "../../utils/Utils";
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
				text: "",
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

	updateBalanceText(deductBet: boolean = false) {
		let balance: number = GAMEDATA.CREDIT;
		let credit: number = GAMEDATA.CREDIT;
		let bet: number = (GAMEDATA.BET = GAMEDATA.BETS_IDR[0]);
		let balanceText: string = "";
		if (deductBet) {
			if (credit >= bet) {
				console.log("deduct balance", bet);
				balance = credit - bet;
			} else {
				console.log("insufficient balance");
			}
		}
		balanceText = numberComma(balance);
		this.textCreditLabel.text = GAMEDATA.CURRENCY + " " + balanceText;
	}
}
