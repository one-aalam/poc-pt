import express from 'express';
let router = express.Router();

// WIP - Not endorsed for production usage
// Not purely a middleware. Sorta patch
// insanely used, to let lazy fellas
// proficient with `express` way of rendering pages
// render pages using `marko` without being obtrusive
export const patchMarkoRender = (req, res, next) => {

  // View directory
  const VIEW_DIR = '../views/' ;

  // Render callback's name
  const _renderCbName = 'r' ;

  // Define the function
  res[_renderCbName] = (tpl, data, ress) => {
  	res.setHeader('content-type', 'text/html');
  	var _tpl = require(VIEW_DIR + tpl);
  		_tpl.render(data, res);
  };

  // Control to captain `express`
  next();
}

export const timeToRender = (req, res, next) => {
   console.log('Time: ', Date.now());
   next();
}
