const express = require("express");
const router = express.Router();
const Facility = require('../models/facility')
const User = require('../models/user')


// router.get("/admin", (req, res) => {
//     Facility.find()
//         .then((facilities) => {
//             res.json({ msg: facilities });
//         })
//         .catch((err) => res.json({ msg: err }));
// });

router.get("/users", (re, res) => {
    User.find()
        .then((users) => {
            res.json({ msg: users })
        })

});

router.delete('/:facilityId', (req, res) => {

    let facilityId = req.params.facilityId

    Facility.findByIdAndDelete(facilityId)
        .then( facility => {
            res.json({ msg: "facility deleted !",  facility : facility })
        })

})

router.delete('/:userId/deleteuser', (req, res) => {

    let userId = req.params.userId

    User.findByIdAndDelete(userId)
        .then(user => {
            res.json({ msg: "user deleted !", user: user })
        })

})

router.put('/:userId', (req, res)=>{
    let userId = req.params.userId
    const isAdmin = req.body.isAdmin
    console.log(isAdmin)
    User.findOne({_id: userId})
    .then(user=>{
        User.updateOne({_id: userId}, {isAdmin: !isAdmin}, (err, updateUser)=>{
            console.log("user isAdmin", updateUser)
            res.json({msg: "update user", updateUser})
        })
    })
})

module.exports = router;