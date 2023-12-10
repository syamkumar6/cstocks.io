const express = require('express')
const Carousel = require('../Models/Carousel')
const router = express.Router()


router.post('/', async(req, res, next) => {
  try{
    const carousel = new Carousel(req.body)
  await carousel.save()
  res.status(201).json(carousel)
  }catch{
    res.status(404).send("carousel adding failed")
  }
})

router.get('/', async(req, res) => {
  try{
    const carousels = await Carousel.find({})
  res.status(200).json(carousels)
  }catch{
    res.status(404).send("Carousel getting failed")
  }
})

module.exports = router