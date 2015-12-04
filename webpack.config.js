import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
// Static reference to T3 file
const pathToNodeModules = path.resolve(__dirname, 'node_modules');

var deps = {
  't3js': 't3js/dist/t3-2.0.2.min.js'
};

var config = {

  	entry: {
    	app: [
    	    'webpack/hot/dev-server',
    		'webpack-hot-middleware/client',
    		path.resolve(__dirname, 'src/index.js')
    	],

    	vendors: ['jquery', 'lodash']
  	},

	output: {
	    path: path.resolve(__dirname, 'dist'),
	    filename: '[name].js',
	    publicPath: '/scripts'
	},

	resolve: {
		// you can load named modules from any dirs you want.
		// attempts to find them in the specified order.
		modulesDirectories: [
			'./src/lib',
			'node_modules'
		],

		extensions: ['', '.js', '.jsx'],

		alias: {
          
        }
	},

	module: {
		// you can tell webpack to avoid parsing for dependencies in any files matching an Array of regex patterns
		noParse: [
			/(node_modules|~)\/(crappy\-bundled\-lib|jquery)\//gi
		],

		preLoaders: [
			// before hitting the actual loaders, load any sourcemaps specified by npm modules
			{ loader: 'source-map' }
		],

		loaders: [
			// transpile ES6/7 to ES5 via babel
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			// bundle LESS and CSS into a single CSS file, auto-generating -vendor-prefixes
			{
				test: /\.(less|css)$/,
				exclude: /\b(some\-css\-framework|whatever)\b/i,
				loader: ExtractTextPlugin.extract("style?sourceMap", "css?sourceMap!autoprefixer?browsers=last 2 version!less")
			}
		]
	},

	plugins: ([
		// Auto-generate 'index.html' or provide one of your own
		new HtmlWebpackPlugin({
			title: "POC-PT"
		}),

		// Avoid publishing files when compilation failed:
		new webpack.NoErrorsPlugin(),

		// Aggressively remove duplicate modules:
		new webpack.optimize.DedupePlugin(),

		// Write out CSS bundle to its own file:
		new ExtractTextPlugin('style.css', { allChunks: true }),

		//
		new webpack.ProvidePlugin({
    		$: "jquery",
    		jQuery: "jquery"
		}),

		//
		new webpack.HotModuleReplacementPlugin(),

		// Create separate bundle for vendor
		new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')

	]).concat(process.env.WEBPACK_ENV==='dev' ? [] : [
		new webpack.optimize.OccurenceOrderPlugin(),

		// minify the JS bundle
		new webpack.optimize.UglifyJsPlugin({
			output: { comments: false },
			exclude: [ /\.min\.js$/gi ]		// skip pre-minified libs
		})
	]),

	// Pretty terminal output
	stats: { colors: true },

	externals: { box: "Box" },

	// Generate external sourcemaps for the JS & CSS bundles
	devtool: 'source-map'
};

for (let key in deps) {
   config.resolve.alias[key] = path.resolve(pathToNodeModules, deps[key]);
   config.module.noParse.push(path.resolve(pathToNodeModules, deps[key]));
}

module.exports = config;
