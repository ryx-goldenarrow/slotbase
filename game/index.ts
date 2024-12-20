import {
	Application,
	Assets,
	Sprite,
	TexturePool,
	TextureStyle,
} from "pixi.js";
import Preloader from "../game/slot/view/Screens/Preloader";
import MainGame from "./slot/view/Screens/MainGame";
import MainControl from "./slot/control/MainControl";
import API from "./api/API";
import { User } from "./type";

const cssstyle = require("../game/slot/template/css/game.css");

(async () => {
	//initialize API
	let api: API = new API();
	let user: User = {
		name: "agent001",
		password: "1234567890",
	};
	api.login(user);
	//------------------------------------

	const app: Application = new Application();

	await app.init({
		background: "#303030",
		resizeTo: window,
		resolution: window.devicePixelRatio,
	});

	app.canvas.style.position = "relative";
	document.body.appendChild(app.canvas);

	// Create and add a container to the stage-----------------------------
	const gameContainer = new Sprite();
	gameContainer.anchor.set(0.5);
	app.stage.addChild(gameContainer);

	//temp size
	//console.log("sizes", app.renderer.width, app.renderer.width);
	gameContainer.scale.set(0.5);
	gameContainer.position.set(
		app.renderer.width * 0.5,
		app.renderer.height * 0.5
	);

	//draw preloader
	let preloader: Preloader = new Preloader();
	gameContainer.addChild(preloader);

	preloader.on("preloadComplete", () => {
		console.log("assets compete");
	});

	//load the assets
	await Assets.loadBundle("images", (e: number) => {
		preloader.showProgress(e);
	});

	let mainGame = new MainGame(app);
	gameContainer.addChild(mainGame);

	//Add all game controls-----------------------------
	let mainControl: MainControl = new MainControl(preloader, mainGame, api);
})();
