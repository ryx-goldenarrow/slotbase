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

	private labelSpin: Sprite;
	private labelAuto: Sprite;

	constructor() {
		super();
		this.anchor.set(0.5);
		this.pivot.set(0.5);

		this.background = this.addChild(new Sprite(Assets.get("bg_hud")));
		this.btnAuto = this.addChild(new Sprite(Assets.get("btn_auto_enable")));
		this.btnAuto.anchor.set(0.5);
		this.btnSpin = this.addChild(new Sprite(Assets.get("btn_spin")));
		this.btnSpin.anchor.set(0.5);
		this.btnInfo = this.addChild(new Sprite(Assets.get("btn_info")));
		this.btnBet = this.addChild(new BetButtonTemplate());
		this.totalWinBar = this.addChild(new TotalWinTemplate());
		this.btnInfo.anchor.set(0.5);

		//labels
		this.labelSpin = this.btnSpin.addChild(
			new Sprite(Assets.get("spin_enabled"))
		);
		this.labelSpin.anchor.set(0.5);

		this.labelAuto = this.btnAuto.addChild(new Sprite(Assets.get("auto")));
		this.labelAuto.anchor.set(0.5);

		this.init();
		this.resize();
	}

	updateWinText() {
		this.totalWinBar.updateText();
	}

	init() {
		this.background.anchor.set(0.5);
		this.background.pivot.set(0.5);
	}

	resize() {
		if (isLandscape()) {
			this.totalWinBar.position.set(20, 20);
			this.background.position.set(0, 0);
			this.btnBet.position.set(-410, 50);
			this.btnInfo.position.set(-680, 50);
			this.btnAuto.position.set(380, 45);
			this.btnSpin.position.set(600, 40);
		} else {
			//-
		}
	}
}
