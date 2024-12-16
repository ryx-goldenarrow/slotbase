import { Application, Assets, Container, Sprite, TexturePool } from "pixi.js";
import Preloader from "../game/slot/view/Screens/Preloader";
import MainGame from "./slot/view/Screens/MainGame";
import MainControl from "./slot/control/MainControl";
import API from "./api/API";

const cssstyle = require("../game/slot/template/css/game.css");

(async () => {
	//PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

	//TexturePool.textureOptions.scaleMode = "linear";

	const app: Application = new Application();

	await app.init({ background: "#303030", resizeTo: window });
	app.canvas.style.position = "relative";
	document.body.appendChild(app.canvas);

	// Create and add a container to the stage-----------------------------
	const gameContainer = new Sprite();
	app.stage.addChild(gameContainer);
	//center container
	gameContainer.anchor.set(0.5);
	gameContainer.position.set(app.canvas.width * 0.5, app.canvas.height * 0.5);

	//draw preloader
	let preloader: Preloader = new Preloader();
	gameContainer.addChild(preloader);

	//now we load the assets
	await Assets.loadBundle("images", (e: number) => {
		preloader.showProgress(e);
	});

	let mainGame = new MainGame(app);
	gameContainer.addChild(mainGame);

	let api: API = new API();
	let mainControl: MainControl = new MainControl(mainGame, api);

	//Add all game controls-----------------------------
	//let controller: Controller = new Controller(gamePage);
})();
