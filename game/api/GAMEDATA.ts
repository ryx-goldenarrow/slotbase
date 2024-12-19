import { Board, FreeGameInfo, WinLines } from "../type";

export type GameDataType = {
	BET: number;
	TOKEN: string;
	REEL_STOP: number[];
	CATEGORY: string;
	COINT_TYPE: number;
	USER_ID: string;
	GAME_ID: string;
	MACHINE_ID: string;
	CURRENCY: string;
	USER_NAME: string;
	AMOUNT: string;
	LANGUAGE: string;
	CREDIT: number;
	BUY_FREE_GAME: number;
	BUY_FREE_GAME_ENABLE: boolean;

	//
	BETS_IDR: number[];
	BETS_INR: number[];
	BETS_MYR: number[];
	BETS_PHP: number[];
	BETS_THB: number[];
	BETS_TWD: number[];
	BETS_USD: number[];
	BETS_VND: number[];
	//

	GOLD: string;
	PLATINUM: string;
	SILVER: string;

	JP: number;
	JP_PRIZE: number;
	TOTAL_WIN: number;
	WIN_LINES_POS: number[];
	WIN_LINES: WinLines[];

	FREE_GAME_INFO: FreeGameInfo;
	BOARD: Board;

	setToken(token: string): void;
	getToken(): string;
	initGameData(): void;
	//setReelStop(number: [][]): void;
	//getReelStop(): number[][];
};

export const GAMEDATA: GameDataType = {
	BET: 0,
	TOKEN: "",
	REEL_STOP: [],
	CATEGORY: "6", //static
	COINT_TYPE: 1,
	USER_ID: "0",
	GAME_ID: "6",
	MACHINE_ID: "0",
	CURRENCY: "IDR",
	USER_NAME: "user0003",
	AMOUNT: "100",
	LANGUAGE: "en-us",
	CREDIT: 0,
	BUY_FREE_GAME: 0,
	BUY_FREE_GAME_ENABLE: false,

	BETS_IDR: [],
	BETS_INR: [],
	BETS_MYR: [],
	BETS_PHP: [],
	BETS_THB: [],
	BETS_TWD: [],
	BETS_USD: [],
	BETS_VND: [],

	GOLD: "0",
	PLATINUM: "0",
	SILVER: "0",

	JP: -1,
	JP_PRIZE: -1,
	TOTAL_WIN: 0,
	WIN_LINES: [],
	WIN_LINES_POS: [0],

	FREE_GAME_INFO: {
		bet: 0,
		bonusGameRounds: 0,
		category: 0,
		coinType: 0,
		gameSerial: "",
		machineId: 0,
		maxTotalWinScore: 0,
		results: [],
		type: 0,
		userId: 0,
	},

	BOARD: {
		gameSerial: "",
		scatterPos: [],
		totems: [],
		winLines: [],
	},

	//-------------------------------
	getToken(): string {
		return this.TOKEN;
	},

	setToken(token: string) {
		this.TOKEN = token;
	},

	initGameData() {
		this.BET = this.BETS_IDR[0];
	},
};
