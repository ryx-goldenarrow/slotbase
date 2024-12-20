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
import { Event } from "../../enums";

export default class MainControl {
	constructor(preloader: Preloader, game: MainGame, api: API) {
		//api load event
		api.event.on(Event.INFO_RECEIVE_EVENT, () => {
			game.jackpotbar.updateText();
			game.userBox.updateBalanceText();
		});

		game.slot.on(Event.SPIN_END_EVENT, () => {
			game.jackpotbar.updateText();
			game.hud.updateWinText();
			game.userBox.updateBalanceText();
			this.roundAnimationComplete(api);
		});

		//spin - r
		addKeyboardEvent(82, () => {
			setFullscreen(true);
		});

		//spin - q
		addKeyboardEvent(81, () => {
			this.resetSlot(api, game);
			game.userBox.updateBalanceText(true);
			api.acquireRequest((resData: any) => {
				game.slot.updateSymbolAssets(GAMEDATA.REEL_STOP);
				game.slot.stopSpin();
			});
			game.slot.startSpin();
		});
	}

	resetSlot(api: API, game: MainGame) {
		api.resetData();
		game.resetValues();
	}

	roundAnimationComplete(api: API) {
		api.settleRequest();
	}

	openBuyFreeGame() {
		//
	}
}

/*
//-----------------------
keyboard shortcuts
//---------------------
space - 32
r = 82


*/
