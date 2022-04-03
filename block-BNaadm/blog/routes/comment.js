var express = require('express');
var router = express.Router();
var Comment = require('../models/Comment');

// Update a coment

router.get('/:id/edit', (req, res) => {
  var id = req.params.id;
  Comment.findById(id, (err, comment) => {
    if (err) return next(err);
    res.render('updateComment', { comment });
  });
});

router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Comment.findByIdAndUpdate(id, req.body, (err, updatedComment) => {
    if (err) return next(err);
    res.redirect('/article/' + updatedComment.articleId);
  });
});

// Delete Button

router.get('/:id/delete', (req, res, next) => {
  var commentId = req.params.id;
  Comment.findByIdAndDelete(commentId, (err, comment) => {
    if (err) return next(err);
    res.redirect('/article/' + comment.articleId);
  });
});

module.exports = router;
