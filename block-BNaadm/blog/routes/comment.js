var express = require('express');
var router = express.Router();
var Comment = require('../models/Comment');

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

module.exports = router;
