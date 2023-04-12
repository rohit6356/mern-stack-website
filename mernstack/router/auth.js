const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router();
require('../DB/conn')
const User = require('../model/userSchema');
const bcrypt = require('bcrypt');
const authenticate = require('../middleware/authenticate');

router.get('/', (req, res) => {
  res.send("hello world form the router side")
})



router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  try {
    const userExist = await User.findOne({ email: email })
    if (userExist) {
      return res.status(422).json({ err: "email already registered" })
    } else if (password != cpassword) {
      return res.status(422).json({ err: "password is not matched with cpassword" })
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });

      const userRegister = await user.save();

      if (userRegister) {
        return res.status(201).json(user)
      }
    }

  } catch (error) {
    console.log(error);
  }

})

router.post('/login', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email: email })
    if (userExist) {
      const ismatch = await bcrypt.compare(password, userExist.password);
      const token = await userExist.generateAuthToken();

      res.cookie("jwtoken" , token ,{
        expires : new Date(Date.now() + 25892000000),
        httpOnly : true
      })

      if (ismatch) {
        return res.status(201).json({ message: "login successfully" })
      } else {
        return res.status(400).json({ message: "invalid credential" })
      }
    } else {
      res.status(400).json({ err: "invalid credential" })
    }
  } catch (error) {
    return res.status(400).json({ message: "invalid credential" })
    console.log(error);
  }

})


router.get('/about' , authenticate , (req , res) =>{
  res.send(req.rootUser)
})

// router.post('/register', (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;
//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ massege: "please filled the information corectly" });
//   }

//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ message: "user already registred" })
//       }
//       const user = new User({ name: name, email: email, phone: phone, work: work, password: password, cpassword: cpassword });
//       user.save().then(() => {
//         res.status(201).json({ message: "user registered successfully" })
//       }).catch((err) => {
//         res.status(500).json({ message: "failed to registred" })
//       })
//     }).catch(err => {
//       console.log("not created");
//     })

// })

// router.post('/login', (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password ) {
//     return res.status(422).json({ massege: "please filled the information corectly" });
//   }

//   User.findOne({ email: email })
//   .then((userExist) => {
//       if (userExist) {
//         if(userExist.name == name && userExist.password == password ){
//           return res.status(201).json({ message: "login successfully" })
//         }
//         else{
//           res.json({message:"invalid credential"})
//         }
//       }else{
//         res.json({message:"user not found"})
//       }
//     }).catch(err => {
//       console.log(err);
//     })

// })

module.exports = router;