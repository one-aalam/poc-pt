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

    	vendors: ['jquery', 'lodash', 't3js']
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
			'node_modules',
			'bower_components',
			'./src',
			'./src/scripts'
		],

		extensions: ['', '.js', '.jsx', '.json', '.jade', '.css', '.webpack.js'],

		alias: {
          
        }
	},
    // Solves a bug with 'dot'
    // similar https://github.com/webpack/jade-loader/issues/8
    // basically normalizes stuff not accessible in browser
	node: {
  		console: true,
	    fs: 'empty',
	    net: 'empty',
	    tls: 'empty'
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
			},
			// JSON
			{ 
				test: /\.json$/, 
				loader: 'json-loader' 
			},
			// Styles
            { 
            	test: /\.css$/, 
            	loader: 'style-loader!css-loader' 
            },
            // SASS
            /*
            { 
            	test: /\.s(a|c)ss$/, 
            	loader: 'style!css?localIdentName=[path][name]---[local]---[hash:base64:5]!postcss!sass' 
            },*/

            // Fonts
            { 
            	test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
            	loader: 'url-loader?limit=10000&minetype=application/font-woff' 
            },
            { 
            	test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
            	loader: 'file-loader' 
            }
		]
	},

	resolveLoader: {
		root: pathToNodeModules
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

	// Generate external sourcemaps for the JS & CSS bundles
	devtool: 'source-map'
};



module.exports = config;
