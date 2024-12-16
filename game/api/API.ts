import { json } from "body-parser";
import { SLOTDATA } from "./SLOTDATA";

type LaunchRequest = {
	username: string;
	gameId: string;
	amount: string;
	langx: string;
	currency: string;
	category: string;
};

export default class API {
	constructor() {}

	private dummyLaunchReq: LaunchRequest = {
		username: "user0003",
		gameId: "6",
		amount: "100",
		langx: "en-us",
		currency: "IDR",
		category: "0",
	};

	private LOGIN_URL: string = "https://aberuncators.com:9443/v1/ais/login"; //prettier-ignore
	private LAUNCH_GAME_URL: string = "https://aberuncators.com:9443/v1/ais/launch-game"; //prettier-ignore
	private TOKEN_LOGIN_URL:string = 'https://aberuncators.com:20443/v1/ragnarok/loginByToken' //prettier-ignore
	private INFO_URL:string = 'https://aberuncators.com:20443/v1/ragnarok/info' //prettier-ignore

	private SPIN_REQUEST_URL:string = 'https://aberuncators.com:20443/v1/ragnarok/acquire' //prettier-ignore

	//TEMPLATE REQUEST
	send(url: string, method: string, body: any, action: Function) {
		fetch(url, {
			method: method,
			body: JSON.stringify(body),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				Authorization: SLOTDATA.getToken(),
			},
		}).then((response) => {
			console.log("response", response);
			action(response);
		});
	}

	//LOGIN REQUEST
	login(username: string, password: string) {
		this.send(
			this.LOGIN_URL,
			"POST",
			{ username: username, password: password },
			(response: any) => {
				//get token from login
				response.json().then((resData: any) => {
					SLOTDATA.setToken(resData.data["accessToken"]);
					this.launchGame();
				});
			}
		);
	}

	launchGame() {
		this.send(
			this.LAUNCH_GAME_URL,
			"POST",
			this.dummyLaunchReq,
			(response: any) => {
				this.loginByToken();
				console.log("test123");
			}
		);
	}

	loginByToken() {
		this.send(
			this.TOKEN_LOGIN_URL,
			"POST",
			{ token: SLOTDATA.getToken() },
			() => {
				console.log("test123");
				this.infoRequest();
			}
		);
	}

	infoRequest() {
		this.send(
			this.INFO_URL,
			"POST",
			{ bet: 0, category: 6, coinType: 1, userId: 0 },
			() => {
				console.log("test123");
			}
		);
	}

	spinRequest() {
		this.send(
			this.SPIN_REQUEST_URL,
			"POST",
			{ category: 7, coinType: 1, userId: 0, machineId: 0, bet: 500 },
			() => {
				console.log("test123");
			}
		);
	}
}
