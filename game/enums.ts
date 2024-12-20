export enum STATUS_CODE {
	NotFound = 404,
	Success = 200,
	Accepted = 202,
	BadRequest = 400,
}

export enum CURRENCY {
	IDR = "IDR",
	USD = "USD",
	INR = "INR",
	MYR = "MYR",
	PHP = "PHP",
	THB = "THB",
	TWD = "TWD",
	VND = "VND",
}

export enum Event {
	SPIN_END_EVENT = "spinEnd",
	INFO_RECEIVE_EVENT = "infoReceive",
	ACQUIRE_RECEIVE_EVENT = "acquireReceive",
}
