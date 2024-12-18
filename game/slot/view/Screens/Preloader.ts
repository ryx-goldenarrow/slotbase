import { Assets, Container, Graphics, Sprite, Text } from "pixi.js";
import { Spine } from "@esotericsoftware/spine-pixi-v8";

export default class Preloader extends Sprite {
	public preloader_container: Container = new Container();
	private bg: Graphics = new Graphics();
	private bg_progress_bar: Graphics = new Graphics();
	private progress_bar: Graphics = new Graphics();

	private LANG: string = "EN";

	private progress_text: Text = new Text({
		text: "0 %",
		style: {
			fontFamily: "roboto-c",
			fontSize: 24,
			fill: 0xffcc00,
			align: "center",
		},
	});

	constructor() {
		super();
		this.anchor.set(0.5);
		this.pivot.set(0.5);
		this.init();
		this.interactive = true;
	}

	init() {
		console.log("init");
		(async () => {
			//init game assets----------------------------------------------------------
			Assets.addBundle("images", {
				//load spritesheet
				symbol:"/game/media/images/base/dragon-god/ani/symbol/symbol.atlas", // prettier-ignore
				change:"/game/media/images/base/dragon-god/ani/symbol/change.atlas", // prettier-ignore

				//load img
				info_bg: "/game/media/images/base/dragon-god/img/g007_img_com_1.png", // prettier-ignore
				radio_box: "/game/media/images/base/dragon-god/img/g007_img_com_2.png", // prettier-ignore
				green_led: "/game/media/images/base/dragon-god/img/g007_img_com_3.png", // prettier-ignore
				progress_bar_bg:"/game/media/images/base/dragon-god/img/g007_img_com_4.png", // prettier-ignore
				progressbar:"/game/media/images/base/dragon-god/img/g007_img_com_5.png", // prettier-ignore
				circle: "/game/media/images/base/dragon-god/img/g007_img_com_6.png", // prettier-ignore
				bg_user: "/game/media/images/base/dragon-god/img/g007_img_com_8.png", // prettier-ignore
				bg_hud: "/game/media/images/base/dragon-god/img/g007_img_mg_2.png", // prettier-ignore
				bg_bet: "/game/media/images/base/dragon-god/img/g007_img_mg_4.png", // prettier-ignore

				//bg
				bg: "/game/media/images/base/dragon-god/img/g007_img_mg_1.png", // prettier-ignore
				bg_main_game:"/game/media/images/base/dragon-god/img/g007_img_mg_3.png", // prettier-ignore
				bg_free_game:"/game/media/images/base/dragon-god/img/g007_img_fg_2.png", // prettier-ignore

				//symbols----------------------------------------------------------------------------------------
				symbol_h1:"/game/media/images/base/dragon-god/symbol/g007_symbol_h1.png", // prettier-ignore
				symbol_h2:"/game/media/images/base/dragon-god/symbol/g007_symbol_h2.png", // prettier-ignore
				symbol_h3:"/game/media/images/base/dragon-god/symbol/g007_symbol_h3.png", // prettier-ignore
				symbol_h4:"/game/media/images/base/dragon-god/symbol/g007_symbol_h4.png", // prettier-ignore
				symbol_n1:"/game/media/images/base/dragon-god/symbol/g007_symbol_n1.png", // prettier-ignore
				symbol_n2:"/game/media/images/base/dragon-god/symbol/g007_symbol_n2.png", // prettier-ignore
				symbol_n3:"/game/media/images/base/dragon-god/symbol/g007_symbol_n3.png", // prettier-ignore
				symbol_n4:"/game/media/images/base/dragon-god/symbol/g007_symbol_n4.png", // prettier-ignore
				symbol_scatter:"/game/media/images/base/dragon-god/symbol/g007_symbol_scatter.png", // prettier-ignore
				symbol_wild:"/game/media/images/base/dragon-god/symbol/g007_symbol_wild.png", // prettier-ignore

				//buttons----------------------------------------------------------------------------------------
				btn_auto_enable:"/game/media/images/base/dragon-god/btn/g007_btn_mg_4.png", // prettier-ignore
				btn_auto_disable:"/game/media/images/base/dragon-god/btn/g007_btn_mg_5.png", // prettier-ignore
				btn_bet_min:"/game/media/images/base/dragon-god/btn/g007_btn_mg_2.png", // prettier-ignore
				btn_bet_add:"/game/media/images/base/dragon-god/btn/g007_btn_mg_3.png", // prettier-ignore
				btn_xclose:"/game/media/images/base/dragon-god/btn/g007_btn_com_1.png", // prettier-ignore
				btn_small_min:"/game/media/images/base/dragon-god/btn/g007_btn_com_3.png", // prettier-ignore
				btn_small_add:"/game/media/images/base/dragon-god/btn/g007_btn_com_4.png", // prettier-ignore
				btn_info:"/game/media/images/base/dragon-god/btn/g007_btn_mg_1.png", // prettier-ignore
				btn_buy_free_spin:"/game/media/images/base/dragon-god/btn/g007_btn_mg_7.png", // prettier-ignore
				btn_info_navigate:"/game/media/images/base/dragon-god/btn/g007_btn_ru_1.png", // prettier-ignore
				btn_spin:"/game/media/images/base/dragon-god/btn/g007_btn_mg_6.png", // prettier-ignore
				btn_settings:"/game/media/images/base/dragon-god/img/g007_img_com_9.png", // prettier-ignore
				btn_close_settings:"/game/media/images/base/dragon-god/img/g007_img_com_10.png", // prettier-ignore

				//info
				g007_img_ru_1:"/game/media/images/base/dragon-god/img/g007_img_ru_1.png", // prettier-ignore
				g007_img_ru_2:"/game/media/images/base/dragon-god/img/g007_img_ru_2.png", // prettier-ignore
				g007_img_ru_3:"/game/media/images/base/dragon-god/img/g007_img_ru_3.png", // prettier-ignore

				//spine----------------------------------------------------------------------------------------
				chr_skel: "/game/media/images/spine/chr.json",
				chr_atlas: "/game/media/images/spine/chr.atlas",

				change_skel: "/game/media/images/spine/change.json",
				change_atlas: "/game/media/images/spine/change.atlas",

				symbol_skel: "/game/media/images/spine/symbol.json",
				symbol_atlas: "/game/media/images/spine/symbol.atlas",

				g007_font_2: "/game/media/images/base/dragon-god/font/g007_font_2.xml.fnt", // prettier-ignore
				g007_mg_fnt_01: "/game/media/images/base/dragon-god/font/g007_mg_fnt_01.xml.fnt", // prettier-ignore
				g007_font_buy_1: "/game/media/images/base/dragon-god/font/g007_font_buy_1.xml.fnt", // prettier-ignore
				//g007_font_JP_1: "/game/media/images/base/dragon-god/font/g007_font_JP_1.xml.fnt", // prettier-ignore

				//words
				buy_feature: "/game/media/images/base/dragon-god/word/"+ this.LANG +"/g007_word_com_4.png", // prettier-ignore
				buy_free_spins: "/game/media/images/base/dragon-god/word/"+ this.LANG +"/g007_word_com_5.png", // prettier-ignore
				bonus: "/game/media/images/base/dragon-god/word/"+ this.LANG +"/g007_word_com_6.png", // prettier-ignore
				sound_settings: "/game/media/images/base/dragon-god/word/"+ this.LANG +"/g007_word_com_7.png", // prettier-ignore
				buy: "/game/media/images/base/dragon-god/word/"+ this.LANG +"/g007_word_com_8.png", // prettier-ignore
				free_spins_win: "/game/media/images/base/dragon-god/word/"+ this.LANG +"/g007_word_com_9.png", // prettier-ignore
				free_spins_left: "/game/media/images/base/dragon-god/word/"+ this.LANG +"/g007_word_fg_1.png", // prettier-ignore
				silver: "/game/media/images/base/dragon-god/word/"+ this.LANG +"/g007_word_jp_1.png", // prettier-ignore
				gold: "/game/media/images/base/dragon-god/word/"+ this.LANG +"/g007_word_jp_2.png", // prettier-ignore
				platinum: "/game/media/images/base/dragon-god/word/"+ this.LANG +"/g007_word_jp_3.png", // prettier-ignore
				logo: "/game/media/images/base/dragon-god/word/"+ this.LANG +"/g007_word_ld_1.png", // prettier-ignore
				total_win: "/game/media/images/base/dragon-god/word/"+ this.LANG +"/g007_word_mg_1.png", // prettier-ignore
				auto: "/game/media/images/base/dragon-god/word/"+ this.LANG +"/g007_word_mg_2.png", // prettier-ignore
				stop: "/game/media/images/base/dragon-god/word/"+ this.LANG +"/g007_word_mg_3.png", // prettier-ignore
				spin_disabled: "/game/media/images/base/dragon-god/word/"+ this.LANG +"/g007_word_mg_4.png", // prettier-ignore
				spin_enabled: "/game/media/images/base/dragon-god/word/"+ this.LANG +"/g007_word_mg_5.png", // prettier-ignore
				congratulations: "/game/media/images/base/dragon-god/word/"+ this.LANG +"/g007_word_rs_1.png", // prettier-ignore
				you_win: "/game/media/images/base/dragon-god/word/"+ this.LANG +"/g007_word_rs_2.png", // prettier-ignore
				free_spins: "/game/media/images/base/dragon-god/word/"+ this.LANG +"/g007_word_rs_3.png", // prettier-ignore
				symbols: "/game/media/images/base/dragon-god/word/"+ this.LANG +"/g007_word_ru_1.png", // prettier-ignore
				free_game: "/game/media/images/base/dragon-god/word/"+ this.LANG +"/g007_word_ru_2.png", // prettier-ignore
			});
		})();

		Assets.addBundle("words", {
			//load spritesheet
		});
		//add preloader container
		this.addChild(this.preloader_container);

		//add preloader bg
		this.preloader_container.addChild(this.bg);
		this.bg.rect(-640, -360, 1280, 720);
		this.bg.fill("#ffffff");

		this.preloader_container.addChild(this.bg_progress_bar);
		this.bg_progress_bar.rect(0, 0, 1000, 20);
		this.bg_progress_bar.fill("#999999");
		this.bg_progress_bar.position.set(-500, 280);

		this.bg_progress_bar.addChild(this.progress_bar);
		this.progress_bar.rect(0, 0, 1000, 20);
		this.progress_bar.fill("#CB5027");
		this.progress_bar.scale.x = 0;

		this.progress_text.x = 500;
		this.progress_text.y = 25;
		this.bg_progress_bar.addChild(this.progress_text);
	}

	showProgress(progress: number = 0) {
		this.progress_bar.scale.x = progress;
		this.progress_text.text = Math.round(progress * 100) + " %";

		if (progress >= 1) {
			//emit custom event
			this.emit("preloadComplete");
			this.visible = false;
		}
	}
}
