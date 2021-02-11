const express = require('express');
const { mapReduce } = require('../models/appointment');
const router = express.Router()
const Appointment = require('../models/appointment')


router.post("/new-appointment", (req, res) => {
    console.log(req.body);
    const { date ,status , userId, facility} = req.body;

    Appointment.create({ date : date ,status : status , user : userId , facility: facility }, (err, newAppointment) => {

        
        res.json({msg: "You added a new appointment", newAppointment})
       
    })
});


router.get("/appointments", (req, res) => {
    Appointment.find().populate('user').populate('facility').sort({updatedAt: -1}).exec()
       .then((appointments) => {

          // Removed users password before sending the data.
          appointments.map((appointment)=>{  
            if(appointment.user){
               
                appointment.user.password = undefined
              
            }
          })
        //   ===================

          res.json({ data: appointments });
       })
       .catch((err) => res.json({ data: err }));
});

// Display all appointment for specific facility ( pop-up books )
router.get("/appointments/:facilityId", (req,res)=>{
    let facilityId = req.params.facilityId

    Appointment.find({facility : facilityId}).populate('user').populate('facility')
     .then(appointments=>{
        res.json({facility_appointments: appointments})
     })
 })
 // ====================


router.delete('/:appointmentId' , (req, res)=>{

    let appointmentId = req.params.appointmentId
  
    Appointment.findByIdAndDelete(appointmentId)
    .then(article => {
      res.json({msg: "Appointment Deleted!"})
    })
  
})

module.exports = router;