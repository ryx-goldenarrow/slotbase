import API from "../../api/API";
import { addKeyboardEvent, isLandscape, isPortrait } from "../utils/Utils";
import MainGame from "../view/Screens/MainGame";
import { User } from "../../type";
import { GAMEDATA } from "../../api/GAMEDATA";
import Preloader from "../view/Screens/Preloader";

export default class MainControl {
	constructor(preloader: Preloader, game: MainGame, api: API) {
		preloader.on("preloadComplete", () => {
			console.log("preloader complete");
		});

		//
		addKeyboardEvent(87, () => {
			//
		});

		//spin - space
		addKeyboardEvent(32, () => {
			//api.spinRequest();
		});

		//spin - q
		addKeyboardEvent(81, () => {
			api.spinRequest((resData: any) => {
				console.log("received", resData);
				GAMEDATA.REEL_STOP = resData.board.totems;
				game.slot.updateSymbolAssets(GAMEDATA.REEL_STOP);
				game.slot.stopSpin();
			});
			game.slot.startSpin();
		});

		//spin - r
		addKeyboardEvent(82, () => {
			console.log("aaa", GAMEDATA.REEL_STOP);
		});
	}
}

/*
//-----------------------
keyboard shortcuts
//---------------------
space - 32
r = 82


*/
