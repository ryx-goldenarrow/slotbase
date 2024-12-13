import { Sprite, Assets, Graphics, Container } from "pixi.js";
import ReelTemplate from "./ReelTemplate";
import { gsap, Power0 } from "gsap";

export default class SlotTemplate extends Sprite {
	private background: Sprite;
	private reelContainer: Container;
	public reel: ReelTemplate[] = [];
	private reelmask: Graphics;

	private WIDTH_GAP: number = 210;
	public SLOT_SPEED: number = 0.25;

	constructor() {
		super();

		this.anchor.set(0.5);
		this.pivot.set(0.5);

		this.background = new Sprite();
		this.reelmask = new Graphics();
		this.reelContainer = new Container();

		this.init();
	}

	init() {
		this.background = new Sprite(Assets.get("bg_main_game"));
		this.background.anchor.set(0.5);
		this.background.pivot.set(0.5);
		this.addChild(this.background);

		this.reelmask.rect(-500, -300, 1000, 600);
		this.reelmask.fill("#ffffff");
		this.addChild(this.reelmask);

		this.addChild(this.reelContainer);
		//this.reelContainer.mask = this.reelmask;

		let i: number = 0;

		for (i = 0; i < 5; i++) {
			//mid reel (id 0 to 4)
			this.reel[i] = new ReelTemplate();
			this.reelContainer.addChild(this.reel[i]);
			this.reel[i].position.set(-this.WIDTH_GAP * 2 + this.WIDTH_GAP * i, 0);

			//upper reel (id 5 to 9)
			this.reel[i + 5] = new ReelTemplate();
			this.reelContainer.addChild(this.reel[i + 5]);
			this.reel[i + 5].position.set( -this.WIDTH_GAP * 2 + this.WIDTH_GAP * i, -590); // prettier-ignore

			//lower reel (id 5 to 9)
			this.reel[i + 10] = new ReelTemplate();
			this.reelContainer.addChild(this.reel[i + 10]);
			this.reel[i + 10].position.set( -this.WIDTH_GAP * 2 + this.WIDTH_GAP * i, 590); // prettier-ignore
		}

		this.animateReels();
	}

	spin() {}

	animateReels() {
		let i: number = 0;

		gsap.to(this, 1, {
			repeat: -1,
			onUpdate: () => {
				for (i = 0; i < 5; i++) {
					this.reel[i].y += 10;
					if (this.reel[i].y > 590) {
						this.reel[i].y = -590;
					}
				}
			},
		});

		/*for (i = 0; i < 5; i++) {
			gsap.to(this.reel[i], this.SLOT_SPEED, {
				y: 0,
				delay: i * 0.2,
				ease: Power0.easeOut,
				repeat: 2,
			});

			gsap.to(this.reel[i + 5], this.SLOT_SPEED, {
				y: 0,
				delay: i * 0.2,
				ease: Power0.easeOut,
				repeat: 2,
			});
		}*/
	}
}
