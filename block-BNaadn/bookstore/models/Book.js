var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema(
  {
    title: { type: String, required: true },
    summary: { type: String },
    pages: Number,
    publication: String,
    // cover_img: Buffer,
    category: [{ type: String }],
    author: { type: String },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;
