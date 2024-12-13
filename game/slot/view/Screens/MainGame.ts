import { Application, Assets, Container, Sprite, Text } from "pixi.js";
import { Spine } from "@esotericsoftware/spine-pixi-v8";
import { gsap, Sine, Elastic, Power0, Back } from "gsap";
import Background from "../../template/background/Background";
import SlotTemplate from "../../template/slot/SlotTemplate";
import SpineObject from "../components/SpineObject";
import HudTemplate from "../../template/slot/HudTemplate";
import { isLandscape, isPortrait } from "../../utils/Utils";

export default class MainGame extends Sprite {
	public app: Application;
	public background: Background;
	public slot: SlotTemplate;
	public hud: HudTemplate;

	//public spineDragon: Spine;

	//sample message in the announcement text
	private message_arr: string[] = [
		"Press Spin button to Play",
		"Good Luck!",
		"Play and Win up to 5,000 Jackpot!",
	];

	public win_announcement_text: Text = new Text({
		text: "Welcome!",
		style: {
			fontFamily: "roboto-c",
			fontSize: 25,
			fill: 0x0,
			align: "center",
			wordWrap: true,
			wordWrapWidth: 650,
		},
	});

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

	generateRandomMessage() {
		this.win_announcement_text.text =
			this.message_arr[Math.floor(Math.random() * 3)];
	}
}
