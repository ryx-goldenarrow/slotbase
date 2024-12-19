import API from "../../api/API";
import {
	addKeyboardEvent,
	isLandscape,
	isPortrait,
	setFullscreen,
} from "../utils/Utils";
import MainGame from "../view/Screens/MainGame";
import { User } from "../../type";
import { GAMEDATA } from "../../api/GAMEDATA";
import Preloader from "../view/Screens/Preloader";

export default class MainControl {
	constructor(preloader: Preloader, game: MainGame, api: API) {
		//spin - q
		addKeyboardEvent(81, () => {
			this.resetSlot(api, game);
			api.spinRequest((resData: any) => {
				game.slot.updateSymbolAssets(GAMEDATA.REEL_STOP);
				game.slot.stopSpin();
			});
			game.slot.startSpin();
		});

		game.slot.on("spinEndEvent", () => {
			console.log("spin end called");
			game.jackpotbar.updateText();
			game.hud.updateWinText();
		});

		//spin - r
		addKeyboardEvent(82, () => {
			setFullscreen(true);
		});
	}

	resetSlot(api: API, game: MainGame) {
		api.resetData();
		game.slot.resetSymbols();
		game.hud.updateWinText();
	}
}

/*
//-----------------------
keyboard shortcuts
//---------------------
space - 32
r = 82


*/
