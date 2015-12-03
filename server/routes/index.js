import express from 'express';
let router = express.Router();

const template = require('../views/index');

// define the home page route
router.get('/', function(req, res) {
  res.r('index', {
            name: 'Frank',
            colors: ["red", "green", "blue"]
    });
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About Home');
});

module.exports = router;