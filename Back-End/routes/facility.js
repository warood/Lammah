const express = require('express')
const router = express.Router()
const Facility = require('../models/facility')

// display all facilities
router.get("/facilities", (req, res) => {
    Facility.find().sort({updatedAt: -1}).exec()
       .then((facilities) => {
          res.json({ msg: facilities });
       })
       .catch((err) => res.json({ msg: err }));
  });


// add a new Facility
router.post("/new-facility", (req, res) => {
    console.log(req.body);
    const { name ,images , location, description , city , price ,type , userId} = req.body;

    Facility.create({ name : name ,images : images , location :location ,description : description
    , city : city , price : price , type : type , user: userId}, (err, newFacility) => {

        console.log("new Facility: ", newFacility);
        res.json({msg: "add Facility", newFacility})
       
    });
});


// display one facility
router.get("/facilities/:id", (req,res)=>{
   let id = req.params.id
   console.log(id)
   Facility.findById(id)
    .then(facility=>{
       console.log(facility)
       res.json({msg: facility})
    })
})
// =====================


module.exports = router