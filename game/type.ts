export type User = {
	name: string;
	password: string;
};

type loginData = {
	accessToken: string;
};

export type LoginReceiveData = {
	respCode: string;
	status: string;
	data: loginData;
};

//request
export type LaunchRequestData = {
	username: string;
	gameId: string;
	amount: string;
	langx: string;
	currency: string;
	category: string;
};

type LaunchData = {
	launchGameUrl: string;
	username: string;
	userid: string;
	userToken: string;
};

export type LaunchReceiveData = {
	respCode: string;
	status: string;
	data: LaunchData;
};

export type LoginByTokenReceiveData = {
	resultCode: string;
	jwtToken: string;
	name: string;
	userId: string;
};

export type AcquireRequestData = {
	bet: number;
	category: string;
	coinType: number;
	machineId: string;
	userId: string;
};

export type StepRequestData = {
	category: number;
	coinType: number;
	machineId: number;
	userId: number;
	step: number;
	score: number;
	timestamp: number;
	gameSerial: string;
};

export type AcquireReceiveData = {
	resultCode: string;
	jp: number;
	jpPrize: number;
	board: Board;
	freegameInfo: FreeGameInfo;
	credit: number;
	totalWin: number;
};

export type FreeGameInfo = {
	bet: number;
	bonusGameRounds: number;
	category: number;
	coinType: number;
	gameSerial: string;
	machineId: number;
	maxTotalWinScore: number;
	results: [];
	type: number;
	userId: number;
};

export type Board = {
	gameSerial: string;
	scatterPos: number[];
	totems: number[];
	winLines: WinLines[];
};

export type WinLines = {
	winScore: number;
	winningTotemId: number;
	posArray: number[];
	afterTotemIDArray: number[];
};

export type SettleRequestData = AcquireRequestData;

export type InfoRequestData = {
	bet: number;
	category: string;
	coinType: number;
	userId: string;
};

export type SettleReceiveData = {
	bet: number;
	category: number;
	coinType: number;
	userId: string;
	gameSerial: string;
	jp: number;
	jpPrize: number;
	machineId: number;
};

export type InfoReceiveData = {
	betsIdr: number[];
	betsInr: number[];
	betsMyr: number[];
	betsPhp: number[];
	betsThb: number[];
	betsTwd: number[];
	betsUsd: number[];
	betsVnd: number[];
	buyFreeGame: number;
	buyFreeGameEnable: boolean;
	credit: number;
	gold: string;
	platinum: string;
	resultCode: string;
	silver: string;
};
