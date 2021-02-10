const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


//for authentication
router.get("/", (req, res) => {
    User.find()
    .then((users) => {
      res.json({ msg: users });
    })
    .catch((err) => res.json({ msg: err }));
});


router.get("/users", (req, res) => {
  User.find()
    .then((users) => {
      res.json({ msg: users });
    })
    .catch((err) => res.json({ msg: err }));
});

// sign up
router.post("/register", (req, res) => {
   const newUser = {
     email: req.body.email,
     password: req.body.password,
     name: req.body.name,
     phone: req.body.phone,
   };

   newUser.email = newUser.email.toLowerCase();
   User.findOne({ email: newUser.email })
     .then((user) => {
      // if the email exist
     if (user) {
        res.json({
          msg: "This email already exist !",
        });
      }
      // if the email doesn't exist
      else {
        var salt = bcrypt.genSaltSync(10);
        newUser.password = bcrypt.hashSync(req.body.password, salt);
        newUser.email = newUser.email.toLowerCase();
        User.create(newUser).then((user) => {
        res.json({ msg: "User has been registerd", user: user });
        });
      }
    })
    .catch((err) => res.json({ msg: err }));
});


//login
router.post("/login", async (req, res) => {
   let { email, password } = req.body;
 
   email = email.toLowerCase();
   const user = await User.findOne({ email: email }); 

  // if the email doesn't exist
  if (!user) {
    res.json({ msg: "This email does not exist" });
  }
  //  if the email exist
  else {
    // if password is correct
    if (bcrypt.compareSync(password, user.password)) {
      user.password = undefined;
      let payload = { user };
      let token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn:   60 * 60 * 60 * 1000 * 60 * 60,
      }); // to the user info
      res.json({ msg: "User login ", token });
    }
    // if password is not correct
    else {
      res.json({ msg: "Password is not correct" });
    }
  }
});


router.get("/:token", (req, res) => {
  let token = req.params.token;
  jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
    if (err) return res.json({ msg: err });
      let user = decode;
      res.json({ msg: "User decoded", user });
  });
}); 


//forgot password
router.post('/forgot' , (req,res)=>{

  User.findOne({email: req.body.email}, function (err, foundUser) {

    password = req.body.password;
    console.log(foundUser);
    bcrypt.genSalt((err, salt) => {
      // changes every time
          console.log("bcrypt salt:", salt);
          bcrypt.hash(password, salt, (err, passwordHash) => {
          console.log("password:", password);
          console.log("passwordHash:", passwordHash);
          User.updateOne({ email :req.body.email },{password: passwordHash }, (err, newUser) => {
            
          });
      });
  });
    if (!foundUser) {
      console.log('No user with email ' + email);
    }  
  })
})

















    






module.exports = router;