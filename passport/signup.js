var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

passport.use('signup', new LocalStrategy({
passReqToCallback : true
},
function(req, email, password, done) {

findOrCreateUser = function(){

User.findOne({ 'email' : email }, function(err, user) {

if (err){
console.log('Error in SignUp: '+err);
return done(err);
}

if (user) {
console.log('User already exists with email: '+ email);
return done(null, false, req.flash('message','User Already Exists'));
} else {

var newUser = new User();


newUser.email = email;
newUser.password = createHash(password);

var currentDate = new Date();
newUser.date_registration = currentDate.toUTCString();


newUser.save(function(err) {
if (err){
console.log('Error in Saving user: '+err);
throw err;
}
console.log('User Registration succesful');
return done(null, newUser);
});
}
});
};

process.nextTick(findOrCreateUser);

})
);


var createHash = function(password){
return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

}
