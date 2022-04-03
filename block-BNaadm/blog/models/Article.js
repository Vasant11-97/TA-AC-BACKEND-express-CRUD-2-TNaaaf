var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, minlength: 10, maxlength: 200 },
    tags: { type: [String] },
    author: { type: String },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;
