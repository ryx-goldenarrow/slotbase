import API from "../../api/API";
import { addKeyboardEvent, isLandscape, isPortrait } from "../utils/Utils";
import MainGame from "../view/Screens/MainGame";

interface User {
	name: string;
	age: string;
}

export default class MainControl {
	constructor(game: MainGame, api: API) {
		//
		addKeyboardEvent(32, () => {
			//game.spin();
			//this.login();
			api.login("agent001", "1234567890");
		});

		addKeyboardEvent(87, () => {
			//game.spin();
			//this.login();
			api.spinRequest();
		});
	}
}
