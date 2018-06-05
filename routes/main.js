exports.get = function(req, res) {
res.render('main', {
  user: req.user,
  });
};
