import { Sprite, Assets, Graphics, Container, Ticker } from "pixi.js";
import ReelTemplate from "./ReelTemplate";
import { gsap, Power0, Elastic, Back } from "gsap";
import { SLOTDATA } from "../../../api/SLOTDATA";
import { generateRandom } from "../../utils/Utils";

export default class SlotTemplate extends Sprite {
	private background: Sprite;
	private reelContainer: Container[] = [];
	private slotReelGroup: Container;
	public reel: ReelTemplate[] = [];

	private reelmask: Graphics;

	private WIDTH_GAP: number = 210;
	public SLOT_SPEED: number = 80;
	public REEL_STOP: boolean[] = [false, false, false, false, false];
	public SLOT_SPINNING: boolean = false;

	public REEL_STOP_ID: number[] = [];

	constructor() {
		super();

		this.anchor.set(0.5);
		this.pivot.set(0.5);

		this.background = this.background = new Sprite(Assets.get("bg_main_game"));
		this.reelmask = new Graphics();
		this.slotReelGroup = new Container();

		this.addChild(this.background, this.reelmask, this.slotReelGroup);

		this.init();
		this.addTicker();
	}

	init() {
		this.background.anchor.set(0.5);
		this.background.pivot.set(0.5);
		//add mask
		this.reelmask.rect(-500, -300, 1000, 600);
		this.reelmask.fill("#ffffff");
		this.slotReelGroup.mask = this.reelmask;

		let i: number = 0;
		let k: number = 0;
		for (i = 0; i < 5; i++) {
			this.reelContainer[i] = this.slotReelGroup.addChild(new Container());

			//mid reel (id 0 to 4)// final reel output
			this.reel[i] = new ReelTemplate(this.generateReelStopId(i, 1, true));
			this.reelContainer[i].addChild(this.reel[i]);
			this.reel[i].position.set(-this.WIDTH_GAP * 2 + this.WIDTH_GAP * i, 0);

			//upper reel (id 5 to 9)
			this.reel[i + 5] = new ReelTemplate(this.generateReelStopId(i, 7, true));
			this.reelContainer[i].addChild(this.reel[i + 5]);
			this.reel[i + 5].position.set( -this.WIDTH_GAP * 2 + this.WIDTH_GAP * i, -590); // prettier-ignore

			//lower reel (id 5 to 9)
			this.reel[i + 10] = new ReelTemplate(this.generateReelStopId(i, 7, true));
			this.reelContainer[i].addChild(this.reel[i + 10]);
			this.reel[i + 10].position.set( -this.WIDTH_GAP * 2 + this.WIDTH_GAP * i, 590); // prettier-ignore
		}
	}

	addTicker() {
		let i: number = 0;
		Ticker.shared.add((dt) => {
			if (this.SLOT_SPINNING) {
				for (i = 0; i < 5; i++) {
					if (this.REEL_STOP[i] == false) {
						this.reelContainer[i].y += this.SLOT_SPEED;
						if (this.reelContainer[i].y > 590) {
							this.reelContainer[i].y = -590;
						}
					}
				}
			}
		});
	}

	startSpin() {
		//toggle spin
		this.REEL_STOP = [false, false, false, false, false];
		this.SLOT_SPINNING = true;

		//fake stop call
		setTimeout(() => {
			this.updateSymbolAssets();
			this.stopSpin();
		}, 5500);
	}

	// prettier-ignore
	generateReelStopId(reel_id: number,stop_id: number = 0, fakeId: boolean = false) { 
		if (fakeId == true) {
			stop_id = generateRandom(12, 0);
		}

		let stopId: number[] = [
			SLOTDATA.REEL_ID[reel_id][stop_id + 0],
			SLOTDATA.REEL_ID[reel_id][stop_id + 1],
			SLOTDATA.REEL_ID[reel_id][stop_id + 2],
		];
		return stopId;
	}

	updateSymbolAssets() {
		let i: number = 0;

		for (i = 0; i < 5; i++) {
			//mid reel (id 0 to 4)// final reel output
			this.reel[i].updateSymbolTexture(this.generateReelStopId(i, 7, true));

			//upper reel (id 5 to 9)
			this.reel[i + 5].updateSymbolTexture(this.generateReelStopId(i, 7, true));

			//lower reel (id 5 to 9)
			this.reel[i + 10].updateSymbolTexture(
				this.generateReelStopId(i, 7, true)
			);
		}
	}

	stopSpin(forceStop: boolean = false) {
		let i: number = 0;
		let SLOT_STOP_SPEED: number = this.SLOT_SPEED * 0.01;
		let delay: number = SLOT_STOP_SPEED;

		for (i = 0; i < 5; i++) {
			let reelID: number = i;
			if (forceStop == false) {
				delay = SLOT_STOP_SPEED * reelID;
			}

			gsap.to(this.reelContainer[i], SLOT_STOP_SPEED * 0.5, {
				y: 0,
				ease: Back.easeOut,
				delay: delay,
				startAt: { y: -590 },
				onStart: () => {
					this.REEL_STOP[reelID] = true;
				},
				onComplete: () => {
					if (reelID == 4) {
						this.SLOT_SPINNING = false;
					}
				},
			});
		}
	}
}
