function checkAuth(req, res, next){
    if(req.isAuthenticated()){
        return next();
    };
    res.status(401).json({message: 'You need to login'});
};

module.exports = checkAuth;