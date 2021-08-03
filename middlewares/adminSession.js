function adminSession(req,res,next){
    res.locals.admin = req.session.admin;
    next();
}

module.exports = adminSession;