const express = require("express");
const router = express.Router();
const Facility = require("../models/facility");

// display all facilities
router.get("/facilities", (req, res) => {
  Facility.find()
    .populate("appointment")
    .sort({ views: -1 })
    .exec()
    .then((facilities) => {
      res.json({ facilities: facilities });
    })
    .catch((err) => res.json({ msg: err }));
});
// ====================

// add a new Facility
router.post("/new-facility", (req, res) => {
  // console.log(req.body);
  const {
    name,
    images,
    location,
    description,
    city,
    price,
    type,
    userId,
  } = req.body;

  Facility.create(
    {
      name: name,
      images: images,
      location: location,
      description: description,
      city: city,
      price: price,
      type: type,
      user: userId,
    },
    (err, newFacility) => {
      // console.log("new Facility: ", newFacility);
      res.json({ msg: "add Facility", newFacility });
    }
  );
});
// ====================

// Show One Facility
router.get("/facilities/:id", (req, res) => {
  let id = req.params.id;
  Facility.findById(id)
    .populate("appointment").populate('user')
    .then((facility) => {
      var views = 1
      views += facility.views
      Facility.updateOne({ _id: id },{ views: views})
      .then(() => {
        res.json({ facility });
      });

    });
});
// =====================

// Edit Facility
router.put("/:facilityId/edit", (req, res) => {
  let facilityId = req.params.facilityId;
  const { name, description, images, location, price } = req.body;

  Facility.findOne({ _id: facilityId }).then((facility) => {
    Facility.updateOne(
      { _id: facilityId },
      {
        name: name,
        description: description,
        images: images,
        location: location,
        price: price,
      },
      (err, updateFacility) => {
        res.json({ msg: "updated facility", updateFacility });
      }
    );
  });
});
// =====================

// Add One View
router.put("/:facilityId/views", (req, res) => {
  let facilityId = req.params.facilityId;
  const { stars } = req.body;

  Facility.updateOne(
    { _id: facilityId },
    { name: stars },
    (err, updateFacility) => {
      res.json({ msg: "+ 1 view" });
    }
  );
});
// =====================



// Delete one Facility  by id
router.delete("/:facilityId", (req, res) => {
  let facilityId = req.params.facilityId;
  Facility.findByIdAndDelete(facilityId).then(() => {
    res.json({ msg: "Facility Deleted!" });
  });
});
// ====================

//Top Facility
router.get("/topFacilities", (req, res) => {
  Facility.find()
    .populate("appointment")
    .sort({ stars: -1 })
    .exec()
    .then((facilities) => {
      res.json({ facilities: facilities });
    })
    .catch((err) => res.json({ msg: err }));
});

module.exports = router;
