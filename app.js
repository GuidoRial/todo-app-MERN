require("dotenv").config();
require("./passport/local-auth");

const express = require("express");
const app = express();
const engine = require("ejs-mate");
const morgan = require("morgan");
const connectDB = require("./database/connect");
const passport = require("passport");
const session = require("express-session");

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
const User = require("./models/User");

const user = [];

/*
app.use(
    session({
        secret: process.env.JWT_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());
*/
app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.post("/login", (req, res) => {});

app.get("/signup", (req, res) => {
    res.render("signup.ejs");
});

app.post("/signup", async (req, res) => {
    try {
        const user = await User.create({ ...req.body });
        console.log(user);
        res.redirect("/login");
    } catch (error) {
        console.log(error);
        res.redirect("/signup");
    }
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

start();
