var express = require('express');
var router = express.Router();
const User = require("../models/user");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('./user/login');
});

router.get('/register', function(req, res, next) {
  res.render('./user/register');
});

router.post("/register", async function(req, res, next){
  let user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.password = req.body.password;
  await user.save();
  req.session.user = user;
  res.redirect('/');
});

router.post("/login", async function(req, res, next){
  let user = await User.findOne({email:req.body.email,password:req.body.password});
  if(!user) return res.redirect("/login");
  req.session.user = user;
  return res.redirect('/');
});

router.get('/logout', function(req, res, next) {
  req.session.user = null;
  res.redirect('/login');
});
module.exports = router;
