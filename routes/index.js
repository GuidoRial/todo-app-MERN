const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post(
    "/signup",
    passport.authenticate("local-signup", {
        successRedirect: "/",
        failureRedirect: "/signup",
        failureMessage: true,
    })
);

router.get("/login", (req, res, next) => {});

router.post("/login", (req, res, next) => {});



module.exports = router;
