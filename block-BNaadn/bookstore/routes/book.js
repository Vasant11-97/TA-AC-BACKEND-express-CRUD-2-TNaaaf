var express = require('express');
var router = express.Router();
var Book = require('../models/Book');

// router.get('/', (req, res) => {
//   res.render('book')
// })

router.get('/new', (req, res, next) => {
  res.render('addBook');
});

router.post('/new', (req, res) => {
  console.log(req.body);
  Book.create(req.body, (err, book) => {
    console.log(err, book);
    res.redirect('/book');
  });
});

// Displaying Books from database

router.get('/', (req, res, next) => {
  Book.find({}, (err, book) => {
    if (err) return next(err);
    console.log(book);
    res.render('book', { book: book });
  });
});

// Displaying Individual Book

router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  console.log(id);
  Book.findById(id, (err, book) => {
    if (err) return next(err);
    res.render('bookDetails', { book: book });
  });
});

// Updating single book Route

router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  Book.findById(id, (err, book) => {
    if (err) return next(err);
    res.render('updateBook', { book: book });
  });
});

router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Book.findByIdAndUpdate(id, req.body, (err, updatedBook) => {
    if (err) return next(err);
    console.log(updatedBook);
    res.redirect('/book/');
  });
});

// Delete Route

router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Book.findByIdAndDelete(id, (err, deletedBook) => {
    if (err) return next(err);
    res.redirect('/book/');
  });
});

// Like Dislike Router

router.get('/:id/likes', (req, res, next) => {
  var id = req.params.id;
  var like = req.body.likes;
  var counter = like === 'likes' ? 1 : +1;
  Book.findByIdAndUpdate(id, { $inc: { likes: counter } }, (err, book) => {
    if (err) return next(err);
    res.redirect('/book/' + id);
  });
});

// Dislike Route

router.get('/:id/dislike', (req, res, next) => {
  var id = req.params.id;
  var dislike = req.body.likes;
  var counter = dislike === 'likes' ? 1 : -1;
  Book.findByIdAndUpdate(id, { $inc: { likes: counter } }, (err, book) => {
    if (err) return next(err);
    res.redirect('/book/' + id);
  });
});

// Export
module.exports = router;
