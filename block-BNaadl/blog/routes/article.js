var express = require('express');
var router = express.Router();
var Article = require('../models/Article');

// router.get('/', (req, res) => {
//   res.render('article');
// });

/* GET users listing. */
router.get('/new', function (req, res, next) {
  res.render('addArticle');
});

// Adding article in the database and redirecting it to the article page.

router.post('/new', (req, res) => {
  console.log(req.body);
  Article.create(req.body, (err, article) => {
    console.log(err, article);
    res.redirect('/article');
  });
});

// Showing Article route

router.get('/', (req, res, next) => {
  Article.find({}, (err, article) => {
    if (err) return next(err);
    console.log(article);
    res.render('article', { article: article });
  });
});

// Getting single article by id route

router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    res.render('articleDetail', { article: article });
  });
});

// Updating Single article route

router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    res.render('updateArticle', { article: article });
  });
});

router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, req.body, (err, updatedArticle) => {
    if (err) return next(err);
    res.redirect('/article/' + id);
    console.log(updatedArticle);
  });
});

// Delete Route

router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndDelete(id, (err, deletedArticle) => {
    if (err) return deletedArticle;
    res.redirect('/article');
  });
});

// Like and Dislike Route
// Like Route

router.get('/:id/likes', (req, res, next) => {
  var id = req.params.id;
  var like = req.body.likes;
  var counter = like === 'likes' ? 1 : +1;
  Article.findByIdAndUpdate(
    id,
    { $inc: { likes: counter } },
    (err, articles) => {
      if (err) return next(err);
      res.redirect('/article/' + id);
    }
  );
});

// Dislike Route

router.get('/:id/dislike', (req, res, next) => {
  var id = req.params.id;
  var dislike = req.body.likes;
  var counter = dislike === 'likes' ? 1 : -1;
  Article.findByIdAndUpdate(
    id,
    { $inc: { likes: counter } },
    (err, articles) => {
      if (err) return next(err);
      res.redirect('/article/' + id);
    }
  );
});

module.exports = router;
