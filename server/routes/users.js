import express from 'express';
let router = express.Router();

// define the user default route
router.get('/', function(req, res) {
  res.send('Send some user');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About users');
});

module.exports = router;