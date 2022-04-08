require("dotenv").config();

const express = require("express");
const app = express();
const engine = require("ejs-mate");
const morgan = require("morgan");
const connectDB = require("./database/connect");
const passport = require("passport");
const session = require("express-session");
const initializePassport = require("./passport-config");
const User = require("./models/User");
const flash = require("express-flash");
const methodOverride = require("method-override");

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

app.use(flash());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.get("/", checkAuthenticated, (req, res) => {
    res.render("index.ejs", { name: req.user.name });
});

app.get("/login", checkNotAuthenticated, (req, res) => {
    res.render("login.ejs");
});

app.post(
    "/login",
    checkNotAuthenticated,
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
    }),
    function (req, res) {
        res, redirect("/");
    }
);

app.get("/signup", checkNotAuthenticated, (req, res) => {
    res.render("signup.ejs");
});

app.post("/signup", checkNotAuthenticated, async (req, res) => {
    try {
        const user = await User.create({ ...req.body });
        console.log(user);
        res.redirect("/login");
    } catch (error) {
        console.log(error);
        res.redirect("/signup");
    }
});

app.delete("/logout", (req, res) => {
    req.logOut();
    res.redirect("/login");
});

app.set("view engine", "ejs");
const PORT = process.env.PORT || 4000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`listening on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
}

start();
