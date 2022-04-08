const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("./models/User");

function initialize(passport) {
    const getUserById = async (id) => {
        const user = await User.findOne({ _id: id });
        return user;
    };
    const authenticateUser = async (email, password, done) => {
        const user = await User.findOne({ email: email });
        if (!user) {
            return done(null, false, {
                message: `No user with this email: ${email}`,
            });
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Password is incorrect" });
            }
        } catch (err) {
            console.log(error);
        }
    };

    passport.use(
        new LocalStrategy({ usernameField: "email" }, authenticateUser)
    );
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id));
    });
}

module.exports = initialize;
