const express = require('express')
const router = express.Router()
const Facility = require('../models/facility')
const Rating = require('../models/rating')



// show one facility ratings 
router.get('/:facilityId/ratings', (req, res) => {
    let facilityId = req.params.facilityId

       Facility.findOne({_id: facilityId}).populate('rating')
      .then(rating=>{

       res.json({ msg: "rating Info", rating});
  
      })
    
  }) 

  //add rating
  router.post("/:facilityId/new-rating", (req, res) => {
   
    const { comment,stars ,userId} = req.body;
    let facilityId = req.params.facilityId
    Rating.create({ comment : comment , stars : stars ,userId: user}, (err, newRating) => {
  
      Facility.updateOne({ _id: facilityId }, { $push: { rating: `${newRating._id}` } })
        .then(() => {
  
          res.json({ msg: "You added a new rating", newRating})
        })
    })
  });


  //delete
  router.delete('/:ratingId/:facilityId', (req, res) => {
    let ratingId = req.params.ratingId
    let facilityId = req.params.facilityId
    Rating.findByIdAndDelete(appointmentId)
      .then(() => {
        Facility.findByIdAndUpdate(facilityId, { $pull: { rating: ratingId } })
          .then(() => {
            res.json({ msg: "Rating is Deleted!" })
          })
      })
  })

  module.exports = router