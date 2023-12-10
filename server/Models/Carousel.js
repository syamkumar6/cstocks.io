const mongoose = require('mongoose')

const CarouselSchema = new mongoose.Schema({
    title: String,
    image: String,
    about: String,
    page: String
  });

const Carousel = mongoose.model('Carousel', CarouselSchema);
module.exports = Carousel