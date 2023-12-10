const express = require('express')
const router = express.Router()
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
      return res.json({ Messageo: "we need token please provide it ." });
    } else {
      jwt.verify(token,process.env.JWT_SECRET,(err, decoded) => {
        if (err) {
          return res.json({ Message: "Authentication Error." });
        } else {
          req.user = decoded.user;
          next();
        }
      });
    }
  };
  
router.get("/",verifyUser, (req, res) => {
    return res.json({ Status: "Success", user: req.user });
  });
  
router.post("/login", async (req, res, next) => {
    try {
      const user = await User.find({ email: req.body.values.email });
      if (user.length === 0) {
        res.json({ Message: "No Records existed" });
      } else {
        if (!bcrypt.compareSync(req.body.values.password, user[0].password)) {
          return res.json({ Password: "Incorrent password" });
        } else {
          const token = jwt.sign(
            {user:{
              name: user[0].name,
              email: user[0].email,
              id: user[0]._id
            }},
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );
          res.cookie('token', token);
          return res.json({ Status: "Success" });
        }
      }
    } catch {
      res.status(404).send("Server side error");
    }
  });

module.exports = router