import {Sprite,	Assets,	Graphics,Container,	Ticker} from "pixi.js"; //prettier-ignore
import ReelTemplate from "./ReelTemplate";
import { gsap, Power0, Elastic, Back } from "gsap";
import { generateRandom } from "../../utils/Utils";

export default class SlotTemplate extends Sprite {
	//initial stop when loading the game
	private placeholderstop: number[][] = [
		[7, 4, 7, 0, 1, 1, 2, 5, 7, 4, 5, 2, 1, 7, 3],
		[5, 6, 7, 2, 3, 3, 0, 1, 3, 4, 4, 0, 6, 0, 5],
		[4, 4, 5, 0, 0, 3, 2, 7, 1, 5, 1, 5, 1, 5, 0],
		[7, 5, 7, 1, 2, 3, 2, 4, 0, 2, 1, 2, 2, 7, 6],
		[7, 5, 4, 1, 1, 1, 6, 7, 5, 2, 2, 1, 1, 2, 3],
		[1, 2, 0, 4, 1, 7, 3, 7, 3, 7, 2, 1, 6, 8, 5],
	];

	private spinningAssets: number[][] = [
		[9, 4, 7, 9, 1, 1, 9, 5, 7, 9, 5, 2, 9, 7, 3],
	];

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
			this.reel[i] = new ReelTemplate([0, 0, 0]);
			this.reelContainer[i].addChild(this.reel[i]);
			this.reel[i].position.set(-this.WIDTH_GAP * 2 + this.WIDTH_GAP * i, 0);

			//upper reel (id 5 to 9)
			this.reel[i + 5] = new ReelTemplate([0, 0, 0]);
			this.reelContainer[i].addChild(this.reel[i + 5]);
			this.reel[i + 5].position.set( -this.WIDTH_GAP * 2 + this.WIDTH_GAP * i, -590); // prettier-ignore

			//lower reel (id 5 to 9)
			this.reel[i + 10] = new ReelTemplate([0, 0, 0]);
			this.reelContainer[i].addChild(this.reel[i + 10]);
			this.reel[i + 10].position.set( -this.WIDTH_GAP * 2 + this.WIDTH_GAP * i, 590); // prettier-ignore
		}

		this.updateSymbolAssets(this.placeholderstop[generateRandom(3, 0)]);
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
		this.updateSymbolAssets(this.spinningAssets[0]);
		this.REEL_STOP = [false, false, false, false, false];
		this.SLOT_SPINNING = true;

		let i: number = 0;
		for (i = 0; i < 5; i++) {
			this.reel[i].applyBlur();
			this.reel[i + 5].applyBlur();
			this.reel[i + 10].applyBlur();
		}
	}

	// prettier-ignore
	generateReelStopId(reelStop:number[]=[]) { 
		let i:number = 0;
		let k:number = 0;
		let id:number = 0;
		let reelStopId:number[][] = []

		for(k=0; k<5;k++){
			let reels:number[] = []
			for(i=0; i<3; i++){
				reels.push(reelStop[id]);
				id+=1;
			}
			reelStopId.push(reels);
		}
		return reelStopId;
	}

	updateSymbolAssets(reelAssetsId: number[]) {
		let i: number = 0;
		let assetsId: number[][] = this.generateReelStopId(reelAssetsId);
		let otherReelIdTop: number[][] = this.generateReelStopId(
			this.placeholderstop[generateRandom(5, 0)]
		);

		let otherReelIdBottom: number[][] = this.generateReelStopId(
			this.placeholderstop[generateRandom(5, 0)]
		);

		for (i = 0; i < 5; i++) {
			//mid reel (id 0 to 4)// final reel output
			this.reel[i].updateSymbolTexture(assetsId[i]);
			//upper reel (id 5 to 9)
			this.reel[i + 5].updateSymbolTexture(otherReelIdTop[i]);
			//lower reel (id 5 to 9)
			this.reel[i + 10].updateSymbolTexture(otherReelIdBottom[i]);
		}
	}

	stopSpin(forceStop: boolean = false) {
		let i: number = 0;
		let SLOT_STOP_SPEED: number = this.SLOT_SPEED * 0.005;
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
					this.reel[reelID].removeFilter();
					if (reelID == 4) {
						this.SLOT_SPINNING = false;
						//this.reel[i].removeFilter();
						//this.reel[i + 5].removeFilter();
						//this.reel[i + 10].removeFilter();
					}
				},
			});
		}
	}
}
