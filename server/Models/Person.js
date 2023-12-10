const mongoose = require('mongoose')

const PersonSchema = new mongoose.Schema({
    name: String,
    image: String,
    birthplace: String,
    occupation:String,
    about: String
  });

const Person = mongoose.model('Person', PersonSchema);
module.exports = Person