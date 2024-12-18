import {
	Application,
	Assets,
	Container,
	Sprite,
	Text,
	isMobile,
} from "pixi.js";
import { Spine } from "@esotericsoftware/spine-pixi-v8";
import { gsap, Sine, Elastic, Power0, Back } from "gsap";
import Background from "../../template/background/Background";
import SlotTemplate from "../../template/slot/SlotTemplate";
import SpineObject from "../components/SpineObject";
import HudTemplate from "../../template/hud/HudTemplate";
import { isLandscape, isPortrait } from "../../utils/Utils";
import InfoPage from "../../template/info/InfoPage";
import UserBox from "../../template/hud/UserBox";
import JackpotTopBar from "../../template/hud/JackpotTopBar";

export default class MainGame extends Sprite {
	public app: Application;
	public background: Background;
	public slot: SlotTemplate;
	public hud: HudTemplate;
	public info: InfoPage;
	public userBox: UserBox;
	public jackpotbar: JackpotTopBar;

	constructor(app: Application) {
		super();
		this.anchor.set(0.5);
		this.pivot.set(0.5);
		this.app = app;

		this.background = new Background(app);
		this.slot = new SlotTemplate();
		this.hud = new HudTemplate();

		this.userBox = new UserBox();
		this.jackpotbar = new JackpotTopBar();

		this.info = new InfoPage();
		this.info.visible = false;

		this.init();
	}

	init() {
		//play ambient sounds
		//sound.play("sfx_ambient",{loop:true,volume:0.3});

		this.drawGameElements();

		//auto detect size based on the device screen
		this.checkScreenSize();
	}

	drawGameElements() {
		//add game background
		this.addChild(
			this.background,
			this.slot,
			this.hud,
			this.userBox,
			this.jackpotbar,
			this.info
		);
	}

	//conntrol settings---------------------------------

	spin() {
		this.slot.startSpin();
	}

	resetValues() {}

	//display settings---------------------------------

	checkScreenSize() {
		document.body.onresize = (e) => {
			//setTimeout(() => {
			console.log("test resize", e);
			this.resizeScreen();
			//}, 500);
			//});
		};

		gsap.delayedCall(0.1, () => {
			this.resizeScreen();
		});
	}
	resizeScreen() {
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
			this.userBox.position.set(-660, -340);
			this.jackpotbar.position.set(0, -340);
		}
	}
}
