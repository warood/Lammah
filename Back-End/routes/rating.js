const express = require("express");
const router = express.Router();
const Facility = require("../models/facility");
const Rating = require("../models/rating");

// show one facility ratings
router.get("/:facilityId/ratings", (req, res) => {
  let facilityId = req.params.facilityId;

  Rating.find({ facility: facilityId })
    .populate("user")
    .then((ratings) => {
      res.json({ msg: "ratings Info", ratings });
    });
});

//add rating
router.post("/:facilityId/new-rating", (req, res) => {
  const facilityId = req.params.facilityId;
  const { comment, stars, userId } = req.body;
  Rating.create(
    { comment: comment, stars: stars, user: userId, facility: facilityId },
    (err, newRating) => {
      // average rating
      Rating.find({ facility: facilityId }).then((rate) => {
        Facility.findOne({ _id: facilityId }).then((facility) => {
          // var total_views = facility.views
          var avg_rating = facility.stars;
          var numberOfRates = 0;
          rate.map((oneRate, i) => {

              avg_rating += oneRate.stars
              
              numberOfRates = i+1;
          })
         
            avg_rating = (avg_rating / (numberOfRates))

          Facility.updateOne(
            { _id: facilityId },
            { stars: parseInt(avg_rating) }
          ).then((facility) => {
            res.json({ msg: "new comment has added" });
          });
        });
      });
    }
  );
});

//delete
router.delete("/:ratingId/:facilityId", (req, res) => {
  let ratingId = req.params.ratingId;
  let facilityId = req.params.facilityId;
  Rating.findByIdAndDelete(appointmentId).then(() => {
    Facility.findByIdAndUpdate(facilityId, {
      $pull: { rating: ratingId },
    }).then(() => {
      res.json({ msg: "Rating is Deleted!" });
    });
  });
});

module.exports = router;
