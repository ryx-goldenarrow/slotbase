// //declare backend variables

// //functions to get data
// import { _decorator, log } from 'cc';
// import { GameHttp } from '../../script/game/GameHttp';
// import { StaticInfo } from '../../script/system/StaticInfo';
// export class Api {
//   public static async login(username: string, password: string) {
//     let request = {
//       username,
//       password,
//     };

//     return await GameHttp.requestMPO(
//       'https://aberuncators.com:9443/v1/ais/login',
//       request
//     );
//   }

//   public static async launchGame(request) {
//     return await GameHttp.requestMPO(
//       'https://aberuncators.com:9443/v1/ais/launch-game',
//       request
//     );
//   }

//   public static async loginByToken(token: string) {
//     let request = { token: token };
//     return await GameHttp.request(
//       'https://aberuncators.com:20443/v1/ragnarok/loginByToken',
//       request
//     );
//   }

//   public static async updateInfo() {
//     let request = {
//       bet: StaticInfo.bet,
//       category: 6, //7:mj slot
//       coinType: StaticInfo.coinType,
//       userId: StaticInfo.userId,
//     };

//     let result = await GameHttp.request(
//       'https://aberuncators.com:20443/v1/ragnarok/info',
//       request
//     );

//     StaticInfo.platinum = result['platinum'];
//     StaticInfo.gold = result['gold'];
//     StaticInfo.silver = result['silver'];
//     StaticInfo.buyFreeGame = result['buyFreeGame'];
//     StaticInfo.credit = result['credit'];

//     switch (StaticInfo.coinType) {
//       case 1:
//         StaticInfo.betArr = result['betsIdr'];
//         // str = 'IDR';
//         break;
//       case 2:
//         StaticInfo.betArr = result['betsTwd'];
//         // str = 'TWD';
//         break;
//       case 3:
//         StaticInfo.betArr = result['betsUsd'];
//         // str = 'USD';
//         break;
//       default:
//         return '';
//     }
//   }

//   public static async acquire() {
//     let request = {
//       category: 7, //7:mj slot
//       coinType: StaticInfo.coinType,
//       userId: StaticInfo.userId,
//       machineId: StaticInfo.machineId,
//       bet: StaticInfo.bet,
//     };
//     let result = await GameHttp.request(
//       'https://aberuncators.com:20443/v1/ragnarok/acquire',
//       request
//     );

//     // SystemController.getIns().jp = result['jp'];
//     // SystemController.getIns().jpPrize = result['jpPrize'];
//     // SystemController.getIns().gameSerial = result['gameSerial'];
//     // log('acquire gameSerial', SystemController.getIns().gameSerial);
//     return result;
//   }

//   public static async buyFreeGame(buyFreeGame: number) {
//     let request = {
//       category: 7, //7:mj slot
//       coinType: StaticInfo.coinType,
//       userId: StaticInfo.userId,
//       bet: StaticInfo.bet,
//       buyFreeGame,
//       machineId: StaticInfo.machineId,
//     };
//     return await GameHttp.request(
//       'https://aberuncators.com:20443/v1/ragnarok/buyfreegame',
//       request
//     );
//   }

//   public static async settle() {
//     let request = {
//       category: 7,
//       coinType: StaticInfo.coinType,
//       machineId: StaticInfo.machineId,
//       userId: StaticInfo.userId,
//       bet: StaticInfo.bet,
//       jp: StaticInfo.jp,
//       jpPrize: StaticInfo.jpPrize,
//       gameSerial: StaticInfo.gameSerial,
//     };

//     return await GameHttp.request(
//       'https://aberuncators.com:20443/v1/ragnarok/settle',
//       request
//     );
//   }

//   public static async step(step: number, score: number) {
//     let request = {
//       category: 7,
//       coinType: StaticInfo.coinType,
//       machineId: StaticInfo.machineId,
//       userId: StaticInfo.userId,
//       step,
//       score,
//       timestamp: 0,
//       gameSerial: StaticInfo.gameSerial,
//     };

//     return await GameHttp.request(
//       'https://aberuncators.com:20443/v1/ragnarok/step',
//       request
//     );
//   }
// }
