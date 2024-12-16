export const SLOTDATA = {
	REEL_ID: [
		[0, 1, 2, 3, 1, 5, 4, 6, 5, 4, 5, 1, 2, 8, 3, 8, 8, 4, 5, 6, 5, 2, 2, 5], // prettier-ignore
		[9, 9, 1, 2, 0, 3, 1, 5, 4, 6, 5, 4, 5, 1, 2, 8, 3, 8, 8, 4, 5, 6, 5, 2, 2, 5, 0], // prettier-ignore
		[0, 9, 1, 2, 3, 1, 5, 4, 6, 5, 4, 5, 8, 1, 2, 8, 3, 8, 0, 8, 4, 5, 6, 5, 2, 6, 2, 5,], // prettier-ignore
		[9, 9, 1, 2, 0, 3, 1, 5, 4, 6, 5, 4, 5, 1, 2, 8, 3, 8, 8, 4, 5, 6, 5, 2, 2, 5, 0], // prettier-ignore
		[9, 5, 3, 1, 8, 7, 7, 8, 6, 2, 9, 9, 9, 1, 2, 0, 3, 1, 5, 4, 6, 5, 4, 5, 1, 2, 8, 3, 8, 8, 4, 5, 6, 5, 2, 2, 5, 0,], // prettier-ignore
	],
	BET: [0],
	TOKEN: "",

	setToken(token: string) {
		this.TOKEN = token;
	},

	getToken() {
		return this.TOKEN;
	},
};
