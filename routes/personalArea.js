var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/personalArea', function(req, res) {

  var users = [];

  User.find({},  function(err, data) {
    users = data;

    res.render('personalArea', {
      title: 'personalArea',
      user: req.user,
      length: data.length,
      users: users
    });
  });

});

module.exports = router;
