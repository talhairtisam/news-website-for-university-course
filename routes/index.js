var express = require('express');
const bodyParser = require("body-parser");
var router = express.Router();
const Article = require("../models/articles");


router.use(bodyParser.urlencoded({ extended: true }));
// router.use(bodyParser.json());
/* GET home page. */
router.get('/',async function(req, res, next) {
  let news = await Article.find().limit(30);
  res.render('index',{news:news});
});

router.get('/aboutus', function(req, res, next) {
  res.render('aboutus');
});

router.get('/article/:id',async function(req, res, next) {
  let news = await Article.findById(req.params.id);
  res.render('./News/fullViewArticle',{news: news});
});

router.get('/back', function(req, res, next) {
  res.redirect('/');
});

router.get('/search/:topic',async function(req, res, next) {
  let topic = req.params.topic;
  let news =  await Article.find({$or:[{keywords:{$regex:topic}},{title:{$regex:topic}},{body:{$regex:topic}}]}).limit(30);
  res.render('./News/searchPage',{search: topic, news:news});
});

router.post('/search', function(req, res, next) {
  let search = req.body.searchText
  res.redirect(`/search/${search}`);
});



module.exports = router;
