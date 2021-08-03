var express = require('express');
var router = express.Router();
const Article = require("../models/articles");
var bodyParser = require('body-parser');
const Admin = require("../models/admin");
var checkAdmin = require('../middlewares/chechAdmin');

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('./admin/login')
});


router.post('/login', async function(req,res,next){
  let user = await Admin.findOne({email:req.body.email,password:req.body.password});
  if(!user) return res.redirect("/cpanel");
  req.session.admin = user;
  res.redirect('/cpanel/dashboard')
});

router.get('/logout', function(req, res, next) {
  req.session.admin = null;
  res.redirect('/cpanel');
});

router.get('/dashboard', checkAdmin, async function(req, res, next) {
  let news = await Article.find();
  let no_of_posts = news.length
  res.render('./admin/dashboard',{no_of_posts:no_of_posts})
});


router.get('/posts',checkAdmin, async function(req, res, next) {
  let news = await Article.find();
  res.render('./admin/posts',{news: news})
});

router.get('/posts/add',checkAdmin, function(req, res, next) {
  res.render('./admin/add')
});


router.get('/addAdmin',checkAdmin, function(req, res, next) {
  res.render('./admin/addAdmin')
});

router.post('/addadmin', async function(req, res, next) {
  let user = new Admin();
  user.username = req.body.username;
  user.email = req.body.email;
  user.password = req.body.password;
  await user.save();
  res.redirect('/cpanel/dashboard');
});

router.get('/posts/update/:id',checkAdmin,async function(req, res, next) {
  let news = await Article.findById(req.params.id);
  
  res.render('./admin/update',{news:news})
});

router.post('/posts/update/:id',async function(req, res, next) {
  let news = await Article.findById(req.params.id);
  news.title = req.body.title;
  news.body = req.body.body;
  news.img = "/images/"+req.body.img;
  news.keywords = req.body.keywords;
  news.datetime = new Date();
  // console.log(news)
  await news.save();
  res.redirect('/cpanel/posts')
});

router.get('/posts/delete/:id',checkAdmin, async function(req, res, next) {
  let news = await Article.findByIdAndDelete(req.params.id);
  res.redirect('/cpanel/posts')
});

router.post('/posts/add',async function(req,res,next){
  let news = new Article();
  news.title = req.body.title;
  news.body = req.body.body;
  news.img = "/images/"+req.body.img;
  news.keywords = req.body.keywords;
  news.datetime = new Date();
  await news.save();
  res.redirect('/cpanel/posts')
});



module.exports = router;
