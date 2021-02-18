const express = require('express');
const { mapReduce } = require('../models/appointment');
const router = express.Router()
const Appointment = require('../models/appointment')
const Facility = require('../models/facility')

const checkExpiredAppointments = async (req, res, next) =>{
  try{
    let response = await Appointment.deleteMany({createdAt: {
      $lte: new Date(new Date().getTime()-60*180*1000).toISOString()
   }, status: "waiting"})
    // console.log('deleted appointments last 5 min', response.deletedCount)
    next()
  }catch(err){
    res.json({msg: "unknown server error"})
  }
  // console.log(new Date().toISOString())
 }

// Add New Appointment API 
router.post("/new-appointment", checkExpiredAppointments, (req, res) => {
  // console.log(req.body);
  const { date, status, userId, facility } = req.body;

  Appointment.create({ date: date, status: status, user: userId, facility: facility }, (err, newAppointment) => {

    Facility.updateOne({ _id: facility }, { $push: { appointment: `${newAppointment._id}` } })
      .then(() => {

        res.json({ msg: "You added a new appointment", newAppointment })
      })
  })

  

 
});
// ====================

//Update one Appointment from waiting to confirmed
router.put("/:appointmentId/confirm", checkExpiredAppointments, (req, res)=>{
  let appointmentId = req.params.appointmentId
  Appointment.findOne({_id: appointmentId})
  .then(appointment=>{
    // console.log(appointment)
    Appointment.updateOne({_id: appointmentId}, {status:"confirmed", expireAt: null}, (err, updateAppointment)=>{
      res.json({msg: "updated facility", updateAppointment})
    })
     })
})



// All Appointments API ( may don't need it )
router.get("/appointments", checkExpiredAppointments, (req, res) => {
  Appointment.find().populate('user').sort({ updatedAt: -1 }).exec()
    .then((appointments) => {

      // Removed users password before sending the data.
      appointments.map((appointment) => {
        if (appointment.user) {

          appointment.user.password = undefined

        }
      })
      //   ===================

      res.json({ data: appointments });
    })
    .catch((err) => res.json({ data: err }));
});
// ====================





// Delete one appointment  by id
router.delete('/:appointmentId/:facilityId', (req, res) => {

  let appointmentId = req.params.appointmentId
  let facilityId = req.params.facilityId
  Appointment.findByIdAndDelete(appointmentId)
    .then(() => {
      Facility.findByIdAndUpdate(facilityId, { $pull: { appointment: appointmentId } })
        .then(() => {
          res.json({ msg: "Appointment Deleted!" })
        })
    })
})
// ====================
module.exports = router;