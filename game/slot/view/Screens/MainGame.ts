import { Application, Assets, Container, Sprite, Text } from "pixi.js";
import { Spine } from "@esotericsoftware/spine-pixi-v8";
import { gsap, Sine, Elastic, Power0, Back } from "gsap";
import Background from "../../template/background/Background";
import SlotTemplate from "../../template/slot/SlotTemplate";
import SpineObject from "../components/SpineObject";
import HudTemplate from "../../template/hud/HudTemplate";
import { isLandscape, isPortrait } from "../../utils/Utils";

import { SLOTDATA } from "../../../api/Backend";

export default class MainGame extends Sprite {
	public app: Application;
	public background: Background;
	public slot: SlotTemplate;
	public hud: HudTemplate;

	constructor(app: Application) {
		super();
		this.anchor.set(0.5);
		this.pivot.set(0.5);
		this.app = app;

		this.background = new Background(app);
		this.slot = new SlotTemplate();
		this.hud = new HudTemplate();

		this.init();
	}

	init() {
		console.log("main game");
		//play ambient sounds
		//sound.play("sfx_ambient",{loop:true,volume:0.3});

		this.drawGameElements();

		//auto detect size based on the device screen
		this.checkScreenSize();
	}

	drawGameElements() {
		//add game background
		this.addChild(this.background, this.slot, this.hud);
	}

	checkScreenSize() {
		document.body.onresize = () => {
			gsap.delayedCall(0.1, () => {
				this.resizeScreen();
			});
		};
		gsap.delayedCall(0.1, () => {
			this.resizeScreen();
		});
	}

	resizeScreen() {
		console.log("resize");

		//this.x = this.app.renderer.width / 2;
		//this.y = this.app.renderer.height / 2;

		if (isPortrait()) {
			//portrait
			this.width = (this.app.canvas.width / 720) * 0.84;
			this.height = (this.app.canvas.height / 1280) * 0.84;

			this.slot.scale.set(0.75);
			this.slot.position.set(0, 0);
			this.hud.scale.set(0.25);
			this.hud.y = 100;
		} else {
			//landscape
			this.width = (this.app.canvas.width / 1280) * 0.84;
			this.height = (this.app.canvas.height / 720) * 0.84;

			this.slot.scale.set(1);
			this.hud.scale.set(1);
			this.hud.y = 340;
		}
	}
}
