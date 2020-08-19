const localStrategy = require("passport-local").Strategy;
const User = require("../modules/user");
const bcrypt = require("bcryptjs");

module.exports = (passport) => {
    passport.use(
        new localStrategy({
            usernameField: 'email'
          }, (email, password, done) => {
              User.findOne({email: email}, (err, user) => {
                if(err) throw err;
                if(!user) return done(null, false);
                bcrypt.compare(password, user.password, (err, psswordIsEqual) => {
                    if(err) {throw err};
                    if(psswordIsEqual) return done(null, user);
                    else return done(null, false);
                });
            });
        })
    );

    passport.serializeUser((user, callBack) => {
        callBack(null, user.id);
    });
    passport.deserializeUser((id, callBack) => {
        User.findOne({_id: id}, (err, user) => {
            if(err) throw err;
            callBack(err, {userId: user.id});
        });
    });
};