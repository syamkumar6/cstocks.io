const express = require('express')
const Person = require('../Models/Person')
const router = express.Router()


router.post('/', async(req, res, next) => {
  try{
    const person = new Person(req.body)
  await person.save()
  res.status(201).json(person)
  }catch{
    res.status(404).send("person adding failed")
  }
})

router.get('/', async(req, res) => {
  try{
    const persons = await Person.find({})
  res.status(200).json(persons)
  }catch{
    res.status(404).send("Person getting failed")
  }
})

router.get('/:authorId', async(req, res) => {
  try{
    const person = await Person.findById(req.params.authorId)
  res.status(200).json(person)
  }catch{
    res.status(404).send("Invalid Author id")
  }
})



module.exports = router