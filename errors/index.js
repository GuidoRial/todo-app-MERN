const CustomAPIError = require("./custom-api-error");
const UnauthenticatedError = require("./unauthorized");
const NotFoundError = require("./not-found");
const BadRequestError = require("./bad-request");

module.exports = {
    CustomAPIError,
    UnauthenticatedError,
    NotFoundError,
    BadRequestError,
};
