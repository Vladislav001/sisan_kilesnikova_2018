exports.get = function(req, res) {
  res.render('tourGuides', {
    user: req.user,
    });
};
