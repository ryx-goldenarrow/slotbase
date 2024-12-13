const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	mode: "development", // production | development
	entry: {
		index: path.resolve(__dirname, "game/index.ts"),
	},
	output: {
		path: path.resolve(__dirname, "slot-game"),
		//filename:'[name].[contenthash].js',
		clean: false,
		//assetModuleFilename: 'src/assets/images/[name].[ext]'
		assetModuleFilename: "[name][ext]",
	},

	devtool: false, //'inline-source-map',
	devServer: {
		static: path.resolve(__dirname, "game"),
		port: 8181, // 8080
		open: true,
		hot: true,
	},

	//loaders
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: {
					loader: "ts-loader",
				},
			},
		],
	},

	resolve: {
		extensions: [".ts", ".js"],
	},

	//plugins
	plugins: [
		new HtmlWebpackPlugin({
			title: "Slot Base Game",
			filename: "index.html",
			template: path.resolve(__dirname, "game/slot/template/temp.html"),
		}),

		new CopyPlugin({
			patterns: [
				{ from: "game/media/images/", to: "game/media/images" },
				{ from: "game/media/sounds/m4a", to: "game/media/sounds/m4a" },
			],
		}),
	],
};
