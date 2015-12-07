"use strict";
// Common libs
import express      from 'express';
import path         from 'path';
import favicon      from 'serve-favicon';
import logger       from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser   from 'body-parser';

// Development aids
import webpack 		from 'webpack';
import webpackCnfg  from '../webpack.config.js';

// Middlewares
import { patchMarkoRender } from './middlewares';

// Routes
import routes       from './routes/index';
import users        from './routes/users';

// Establish environment constants
const isProduction = process.env.NODE_ENV === 'production';
const isDeveloping = !isProduction;

// Establish port for App and Webpack
const WEBPACK_PORT = 3001;
const port = isProduction ? (process.env.PORT || 3002) : WEBPACK_PORT;

// Instantiate App
let app = express();

// Start a development server
if(isDeveloping){
	const compiler = webpack(webpackCnfg);

	app.use(require('webpack-dev-middleware')(compiler, {
	  noInfo: true,
	  hot: true,
	  publicPath: webpackCnfg.output.publicPath,
	  stats: {
        colors: true
      }
	}));

	app.use(require('webpack-hot-middleware')(compiler));

	app.listen(WEBPACK_PORT, 'localhost', function(err) {
	  if (err) {
	    console.log(err);
	    return;
	  }
  	console.log('Development server listening at %s', WEBPACK_PORT);
	});
}

// Set a App level property for conditional inclusion of file
app.set("js", isDeveloping ? "dev" : "min");

// Set view
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'marko');

// Set middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(patchMarkoRender);

// ...and routes
app.use('/', routes);
app.use('/users', users);

// Start!
const server = app.listen(port, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = app;