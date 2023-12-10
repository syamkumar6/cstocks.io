const express = require('express')
const Books = require('../Models/Bookmodel')
const router = express.Router()


router.post('/', async(req, res, next) => {
  try{
    const book = new Books(req.body)
  await book.save()
  res.status(201).json(book)
  }catch{
    res.status(404).send("book adding failed")
  }
})

router.get('/', async(req, res) => {
  try{
    const books = await Books.find({}).populate('author')
  res.status(200).json(books)
  }catch{
    res.status(404).send("Books getting failed")
  }
})

router.get('/:bookId', async(req, res) => {
  try{
    const book = await Books.findById(req.params.bookId).populate('author')
  res.status(200).json(book)
  }catch{
    res.status(404).send("Invalid book id")
  }
})

router.delete('/:bookId', async(req, res) => {
  try{
    await Books.findByIdAndDelete(req.params.bookId)
    res.status(204).send("book deleted")
  }catch{
    res.status(404).send("Invalid book id")
  }
})

router.get('/:authorId', async(req, res) => {
  try{
    const books = await Books.find({'author.ObjectId':req.params.Id}).exec();
    res.status(200).json(books)
  }catch{
    res.status(404).send("Invalid Author id")
  }
})

router.get('/:bookId', async(req, res) => {
  try{
    const book = await Books.findByIdAndUpdate(req.params.bookId,{title:req.body})
  res.status(200).json(book)
  }catch{
    res.status(404).send("Invalid book id")
  }
})
module.exports = router