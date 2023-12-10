const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    title: String,
    image: String,
    language: String,
    category: String,
    author: {
      type: mongoose.ObjectId,
      ref: 'Person'
    },
    price: Number,
    quantity:Number,
    about: String
  });

const Books = mongoose.model('Books', BookSchema);
module.exports = Books