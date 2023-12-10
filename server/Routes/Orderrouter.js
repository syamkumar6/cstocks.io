const express = require('express')
const Orders = require('../Models/Order')
const router = express.Router()

router.get('/', async(req, res, next) => {
    try{
      const orders = await Orders.find({});
      res.status(200).json(orders)
    }
    catch{
        res.status(404).send("Invalid user id")
      }
})

module.exports = router