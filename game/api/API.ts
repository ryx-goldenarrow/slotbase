import { GAMEDATA } from "./GAMEDATA";
import { EventEmitter } from "pixi.js";
import {
	User,
	LaunchReceiveData,
	LaunchRequestData,
	LoginByTokenReceiveData,
	LoginReceiveData,
	AcquireRequestData,
	AcquireReceiveData,
	SettleReceiveData,
	InfoReceiveData,
	SettleRequestData,
	InfoRequestData,
	StepRequestData,
} from "../type";
import { Event } from "../enums";

export default class API {
	public event: EventEmitter = new EventEmitter();

	constructor() {}

	private LOGIN_URL: string = 'https://aberuncators.com:9443/v1/ais/login'; //prettier-ignore
	private LAUNCH_GAME_URL: string = 'https://aberuncators.com:9443/v1/ais/launch-game'; //prettier-ignore
	private TOKEN_LOGIN_URL:string = 'https://aberuncators.com:20443/v1/ragnarok/loginByToken' //prettier-ignore
	private INFO_URL:string = 'https://aberuncators.com:20443/v1/ragnarok/info' //prettier-ignore
	private SPIN_REQUEST_URL:string = 'https://aberuncators.com:20443/v1/ragnarok/acquire' //prettier-ignore
	private SETTLE_REQUEST_URL: string = "https://aberuncators.com:20443/v1/ragnarok/settle"; //prettier-ignore
	private STEP_REQUEST_URL: string = "https://aberuncators.com:20443/v1/ragnarok/step"; //prettier-ignore

	//-----------------------------------------------------------------------------------
	// data request //-------------------------------------------------------------------
	//TEMPLATE REQUEST
	send(url: string, method: string, body: any, action: Function) {
		fetch(url, {
			method: method,
			body: JSON.stringify(body),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				Authorization: GAMEDATA.getToken(),
			},
		}).then((response) => {
			action(response);
		});
	}

	//LOGIN REQUEST
	login(user: User) {
		this.send(
			this.LOGIN_URL,
			"POST",
			{ username: user.name, password: user.password },
			(response: any) => {
				//get token from login using accessToken
				response.json().then((resData: LoginReceiveData) => {
					GAMEDATA.setToken(resData.data.accessToken);
					this.launchGame();
				});
			}
		);
	}

	//LAUNCH REQUEST
	launchGame() {
		this.send(
			this.LAUNCH_GAME_URL,
			"POST",
			this.getLaunchData(),
			(response: any) => {
				response.json().then((resData: LaunchReceiveData) => {
					this.copyLaunchData(resData);
					this.loginByToken();
				});
			}
		);
	}

	//LOGIN BY TOKEN REQUEST
	loginByToken() {
		this.send(
			this.TOKEN_LOGIN_URL,
			"POST",
			{ token: GAMEDATA.getToken() },
			(response: any) => {
				response.json().then((resData: LoginByTokenReceiveData) => {
					this.copyLoginByTokenData(resData);
					this.infoRequest();
				});
			}
		);
	}

	//INFO REQUEST
	infoRequest() {
		this.send(
			this.INFO_URL,
			"POST",
			this.getInfoRequestData(),
			(response: any) => {
				response.json().then((resData: InfoReceiveData) => {
					this.copyInfoData(resData);
					this.event.emit(Event.INFO_RECEIVE_EVENT);
				});
			}
		);
	}

	//SPIN REQUEST
	acquireRequest(action: Function) {
		this.send(
			this.SPIN_REQUEST_URL,
			"POST",
			this.getAcquireData(),
			(response: any) => {
				response.json().then((resData: AcquireReceiveData) => {
					this.copyAcquireData(resData);
					this.event.emit(Event.ACQUIRE_RECEIVE_EVENT);
					action(resData);
				});
			}
		);
	}

	//SETTLE REQUEST
	settleRequest() {
		this.send(
			this.SETTLE_REQUEST_URL,
			"POST",
			this.getSettleRequestData(),
			(response: any) => {
				response.json().then((resData: SettleReceiveData) => {
					this.infoRequest();
				});
			}
		);
	}

	// data management //-----------------------------------------------------------------------------------
	getAcquireData(): AcquireRequestData {
		return {
			bet: (GAMEDATA.BET = GAMEDATA.BETS_IDR[0]),
			category: GAMEDATA.CATEGORY,
			coinType: GAMEDATA.COINT_TYPE,
			machineId: GAMEDATA.MACHINE_ID,
			userId: GAMEDATA.USER_ID,
		};
	}

	getLaunchData(): LaunchRequestData {
		return {
			amount: GAMEDATA.AMOUNT,
			category: GAMEDATA.CATEGORY,
			currency: GAMEDATA.CURRENCY,
			gameId: GAMEDATA.GAME_ID,
			langx: GAMEDATA.LANGUAGE,
			username: GAMEDATA.USER_NAME,
		};
	}

	getInfoRequestData(): InfoRequestData {
		return {
			bet: GAMEDATA.BET,
			category: GAMEDATA.CATEGORY,
			coinType: GAMEDATA.COINT_TYPE,
			userId: GAMEDATA.USER_ID,
		};
	}

	getSettleRequestData(): SettleRequestData {
		return {
			category: GAMEDATA.CATEGORY,
			coinType: GAMEDATA.COINT_TYPE,
			userId: GAMEDATA.USER_ID,
			machineId: GAMEDATA.MACHINE_ID,
			bet: GAMEDATA.BET,
		};
	}

	getStepRequestData(): StepRequestData {
		return {
			category: parseInt(GAMEDATA.CATEGORY),
			coinType: GAMEDATA.COINT_TYPE,
			machineId: parseInt(GAMEDATA.MACHINE_ID),
			userId: parseInt(GAMEDATA.USER_ID),
			step: GAMEDATA.STEP,
			score: GAMEDATA.SCORE,
			timestamp: parseInt(GAMEDATA.TIME_STAMP),
			gameSerial: GAMEDATA.GAME_SERIAL,
		};
	}

	//save data to GAMEDATA----------------------------------------------
	copyLaunchData(launchData: LaunchReceiveData) {
		GAMEDATA.TOKEN = launchData.data.userToken;
		GAMEDATA.USER_ID = launchData.data.userid;
		GAMEDATA.USER_NAME = launchData.data.username;
	}

	copyLoginByTokenData(LoginToken: LoginByTokenReceiveData) {
		GAMEDATA.TOKEN = LoginToken.jwtToken;
		GAMEDATA.USER_ID = LoginToken.userId;
		GAMEDATA.USER_NAME = LoginToken.name;
	}

	copyInfoData(InfoData: InfoReceiveData) {
		GAMEDATA.CREDIT = InfoData.credit;
		GAMEDATA.BUY_FREE_GAME_ENABLE = InfoData.buyFreeGameEnable;
		GAMEDATA.BUY_FREE_GAME = InfoData.buyFreeGame;
		GAMEDATA.GOLD = InfoData.gold;
		GAMEDATA.SILVER = InfoData.silver;
		GAMEDATA.PLATINUM = InfoData.platinum;
		GAMEDATA.BETS_IDR = InfoData.betsIdr;
		GAMEDATA.BETS_INR = InfoData.betsInr;
		GAMEDATA.BETS_MYR = InfoData.betsMyr;
		GAMEDATA.BETS_PHP = InfoData.betsPhp;
		GAMEDATA.BETS_THB = InfoData.betsThb;
		GAMEDATA.BETS_TWD = InfoData.betsTwd;
		GAMEDATA.BETS_USD = InfoData.betsUsd;
		GAMEDATA.BETS_VND = InfoData.betsVnd;
	}

	copyAcquireData(acquireData: AcquireReceiveData) {
		//GAMEDATA.REEL_STOP = [5, 5, 4, 2, 8, 1, 5, 4, 1, 0, 0, 3, 7, 1, 7]; //acquireData.board.totems;
		GAMEDATA.CREDIT = acquireData.credit;
		GAMEDATA.JP = acquireData.jp;
		GAMEDATA.JP_PRIZE = acquireData.jpPrize;
		GAMEDATA.TOTAL_WIN = acquireData.totalWin;
		GAMEDATA.FREE_GAME_INFO = acquireData.freegameInfo;
		GAMEDATA.BOARD = acquireData.board;
		GAMEDATA.REEL_STOP = GAMEDATA.BOARD.totems;
		GAMEDATA.WIN_LINES = GAMEDATA.BOARD.winLines;
		GAMEDATA.GAME_SERIAL = GAMEDATA.BOARD.gameSerial;
	}

	//TODO
	validateResponse() {
		//------------
	}

	resetData() {
		GAMEDATA.WIN_LINES = [];
		GAMEDATA.TOTAL_WIN = 0;
		GAMEDATA.REEL_STOP = [];
	}
}
