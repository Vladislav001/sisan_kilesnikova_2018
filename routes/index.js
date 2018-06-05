var express = require('express');
var router = express.Router();
var isAuthenticated = require('../middleware/isAuthenticated');

module.exports = function(passport){


router.get('/', require('./main', isAuthenticated).get);
router.get('/tourGuides', require('./tourGuides').get);
router.get('/reviews', require('./reviews').get);
router.get('/registration', require('./registration').get);
router.get('/personalArea', isAuthenticated, require('./personalArea'));


router.post('/signup', passport.authenticate('signup', {
successRedirect: '/personalArea',
failureRedirect: '/',
failureFlash : true
}));

router.post('/login', passport.authenticate('login', {
successRedirect: '/personalArea',
failureRedirect: '/',
failureFlash : true
}));

router.get('/signout', function(req, res) {
req.logout();
res.redirect('/');
});



return router;
}
