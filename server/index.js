"use strict";
import express      from 'express';
import path         from 'path';
import favicon      from 'serve-favicon';
import logger       from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser   from 'body-parser';

// Middlewares
import { patchMarkoRender } from './middlewares';

// Routes
import routes       from './routes/index';
import users        from './routes/users'

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'marko');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(patchMarkoRender);

app.use('/', routes);
app.use('/users', users);

const server = app.listen(3000, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = app;