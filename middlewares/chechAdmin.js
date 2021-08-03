function checkAdmin(req,res,next){
    if(req.session.admin) next();
    else return res.redirect('/cpanel');
}

module.exports = checkAdmin;