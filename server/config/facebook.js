const facebookStrategy = require("passport-facebook").Strategy;
const User = require("../modules/user");

module.exports = (passport) => {
    
    passport.use(new facebookStrategy({
        clientID: '651865205423153',
        clientSecret: 'e0743d868cf2a7567738ded5a58e14a0',
        callbackURL: "/auth/facebook/callback",
        profileFields: [
            'id',
            'displayName',
            'emails'
        ]
    },
    function(accessToken, refreshToken, profile, cb) {
        const userInfo = {accessToken: accessToken, profile: profile};
        return cb(null, userInfo);
    }));

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