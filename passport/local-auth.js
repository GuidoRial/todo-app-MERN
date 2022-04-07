const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use(
    "local-signup",
    new localStrategy((username, password, done) => {
        User.findOne({ username: username }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (!user.comparePassword(password)) {
                return done(null, false);
            }
            const newUser = new User();
            newUser.username = username;
            newUser.password = password;
            newUser.save();
            done(null, newUser);
        });
    })
);
