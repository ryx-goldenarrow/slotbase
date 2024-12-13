import { Sprite, Assets } from "pixi.js";
import { Spine } from "@esotericsoftware/spine-pixi-v8";

export default class SpineObject extends Sprite {
	public spine: Spine;

	constructor(spineName: string) {
		super();

		this.anchor.set(0.5);
		this.pivot.set(0.5);

		this.spine = Spine.from({
			skeleton: spineName + "_skel",
			atlas: spineName + "_atlas",
		});

		this.addChild(this.spine);
	}

	animate(trackIndex: number, animationID: string, loop: boolean = true) {
		this.spine.state.setAnimation(trackIndex, animationID, loop);
	}
}
