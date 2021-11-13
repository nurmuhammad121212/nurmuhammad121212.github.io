const express = require("express");
const router = express.Router();
const DbProduct = require("../models/Product");

/* GET home page. */
router.get("/", function (req, res, next) {
  DbProduct.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {
        title: "Express",
        
        db: data,
      });
    }
  });
});



router.get("/more/:id", (req, res) => {
  DbProduct.findById(req.params.id, (err, data) => {
    try {
      res.render("more", {
        title: "Mahsulot haqida",
        data,
      });
    } catch (error) {
      console.log(error);
    }
  });
});

router.get("/update/:id", (req, res) => {
  DbProduct.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render("update", {
        title: "Mahsulot ozgartirish",
        db: data
      });
    }
  });
});
module.exports = router;
