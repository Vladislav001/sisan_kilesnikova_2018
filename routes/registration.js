exports.get = function(req, res) {
  res.render('registration', {
    user: req.user,
    });
};
