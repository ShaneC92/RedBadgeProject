const router = require("express").Router();
const User = require("../db").import("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//SignUp
// router.post("/signup", (req, res) => {
//   User.create({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password, 10),
//     userRole: req.body.userRole || "User"
//   })
//     .then(
//       (createSuccess = (user) => {
//         let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//           expiresIn: 60 * 60 * 24,
//         });
//         res.json({
//           user: user,
//           message: "user created",
//           sessionToken: token,
//         });
//       })

//     )
//     .catch((err) => res.status(500).json({ error: "Not working" }));
// });

router.post("/signup", (req, res) => {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    userRole: req.body.userRole || "User",
  })
    .then(data=>{
      let token = jwt.sign({id:data.id},process.env.JWT_SECRET,{expiresIn:60*60*24});
      res.status(200).json({
        data:data,
        sessionToken:token
      })
    })
});

//Login
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then(
    (user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, matches) => {
          if (matches) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24,
            });
            res.json({
              user: user,
              message: "user successfully logged in",
              sessionToken: token,
            });
          } else {
            res.status(502).send({ error: "bad gateway" });
          }
        });
      } else {
        res.status(500).send({ error: "failed to authenticate" });
      }
    },
    (err) => res.status(501).send({ error: "failed to process" })
  );
});

//get all users
router.get('/member', (req, res) => {
  User.findAll({
      where: {
          userRole: "User"
      }
  })
      .then(user => res.status(200).json({
          user: user
      }))
      .catch(err => res.status(500).json({
          error: err
      }))
});
//delete the user
router.delete("/deleteUser/:id",(req,res)=>{
  let id = req.params.id;
  User.destroy({
      where:{
          id:id
      }
  })
  .then(data=>{
      res.status(200).json({
          message: "Successfully deleted"
      })
  })
})

//update the user
//updating the movie list.
router.put("/memberUpdate/:id",(req,res)=>{
  let data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName
  }
  User.update(data,{
      where: {
          id: req.params.id
      }
  })
  .then(data=>{
      res.status(200).json({
          message: "Updated"
      })
  })
  .catch(err=>{
      res.status(500).json({
          err:err
      })
  })
})


module.exports = router;