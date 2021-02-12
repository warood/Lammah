const express = require('express');
const { mapReduce } = require('../models/appointment');
const router = express.Router()
const Appointment = require('../models/appointment')
const Facility = require('../models/facility')

// Add New Appointment API 
router.post("/new-appointment", (req, res) => {
  console.log(req.body);
  const { date, status, userId, facility } = req.body;

  Appointment.create({ date: date, status: status, user: userId, facility: facility }, (err, newAppointment) => {

    Facility.updateOne({ _id: facility }, { $push: { appointment: `${newAppointment._id}` } })
      .then(() => {

        res.json({ msg: "You added a new appointment", newAppointment })
      })
  })
});
// ====================





// All Appointments API ( may don't need it )
router.get("/appointments", (req, res) => {
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