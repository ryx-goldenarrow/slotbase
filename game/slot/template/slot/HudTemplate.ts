import { Sprite, Assets } from "pixi.js";
import { generateRandom, isLandscape } from "../../utils/Utils";
import BetButtonTemplate from "./BetButtonTemplate";
import TotalWinTemplate from "./TotalWinTemplate";

export default class HudTemplate extends Sprite {
	public background: Sprite;

	public btnBet: BetButtonTemplate;
	public totalWinBar: TotalWinTemplate;

	public btnAuto: Sprite;
	public btnSpin: Sprite;
	public btnInfo: Sprite;

	constructor() {
		super();
		this.anchor.set(0.5);
		this.pivot.set(0.5);

		this.background = this.addChild(new Sprite(Assets.get("bg_hud")));

		this.btnAuto = this.addChild(new Sprite(Assets.get("btn_auto_enable")));
		this.btnSpin = this.addChild(new Sprite(Assets.get("btn_spin")));

		this.btnInfo = this.addChild(new Sprite(Assets.get("btn_info")));
		this.btnInfo.anchor.set(0.5);

		this.btnBet = this.addChild(new BetButtonTemplate());
		this.totalWinBar = this.addChild(new TotalWinTemplate());

		this.init();
		this.resize();
	}

	init() {
		this.background.anchor.set(0.5);
		this.background.pivot.set(0.5);
	}

	resize() {
		if (isLandscape()) {
			this.totalWinBar.position.set(40, 20);
			this.background.position.set(0, 0);
			this.btnBet.position.set(-380, 50);
			this.btnInfo.position.set(-650, 50);
			this.btnAuto.position.set(310, 5);
			this.btnSpin.position.set(450, -15);
		} else {
			//-
		}
	}
}
