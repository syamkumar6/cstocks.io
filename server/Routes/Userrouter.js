const express = require('express')
const User = require('../Models/User')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router()
const jwt = require("jsonwebtoken");


router.post('/signup', async(req, res, next) => {
  try{
    const hash = bcrypt.hashSync(req.body.values.password, saltRounds);
    const user = new User({
      ...req.body.values,
         password: hash
    })
  await user.save()
  res.status(201).json(user)
  }catch{
    res.status(404).send("user adding failed")
  }
})

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
        res.cookie('token', token, { sameSite: 'None', secure: true });
        return res.json({ Status: "Success" });
      }
    }
  } catch {
    res.status(404).send("Server side error");
  }
});

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

router.get("/verify",verifyUser, (req, res) => {
  return res.json({ Status: "Success", user: req.user });
});


router.get('/signup', async(req, res) => {
  try{
    const users = await User.find({})
  res.status(200).json(users)
  }catch{
    res.status(404).send("User getting failed")
  }
})
 
router.get('/logout' , (req, res, next) => {
  res.cookie('token',"",{expires:new Date(0)})
  return res.json({Status: "Success"})
})

module.exports = router
