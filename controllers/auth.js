const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {
    BadRequestError,
    NotFoundError,
    UnauthenticatedError,
} = require("../errors");

const register = async (req, res, next) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
        user: { username: user.username },
        token,
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError("Please provide email and password");
    }
    const user = await User.findOne({ email });

    if (!user) {
        throw new NotFoundError(`${email} was not found in database`);
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid credentials");
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
        user: { username: user.username },
        token,
    });
};

module.exports = { register, login };
