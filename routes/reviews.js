exports.get = function(req, res) {
  res.render('reviews', {
    user: req.user,
    });
};
