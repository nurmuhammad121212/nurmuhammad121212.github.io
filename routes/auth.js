const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");
const DbUser = require("../models/User");
const fileFilter = require("../middleware/fileUpload");
const passport = require("passport");
const { check, validationResult } = require("express-validator");

router.get("/register", (req, res) => {
  res.render("auth/register", {
    title: "Bosh sahifa",
    eUrl: req.url,
  });
});

router.post(
  "/register",
  [
    check("your_name", "Ismingizni kiriting").notEmpty(),
    check("login", "Login kiriting").notEmpty(),
    check("password", "Parolingizni kiriting").notEmpty(),
    check("phone", "Telefoningizni kiriting").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("auth/register", {
        title: "Xatolik bor",
        errors: errors.array(),
      });
    } else {
      try {
        const db = new DbUser({
          your_name: req.body.your_name,
          login: req.body.login,
          password: req.body.password,
          phone: req.body.phone,
        });
        await db.save((err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect("/login");
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
);

// Login

router.get("/login", async (req, res) => {
  res.render("auth/login", {
    title: "Login",
  });
});

router.post("/login", async (req, res, next) => {
  passport.authenticate("local", {
    failureRedirect: "/account",
    successRedirect: "/",
    failureFlash: "hatolik bor",
    successFlash: "xush kelibsiz",
  })(req, res, next);
});

router.get("/account", (req, res) => {
  res.render("auth/account", {
    title: "Account sahifasi",
  });
});

module.exports = router;
