"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_codes_1 = require("http-status-codes");
var errorHandlerMiddleware = function (err, req, res, next) {
    var customError = {
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong, try again later",
    };
    if (err.name === "ValidationError") {
        customError.msg = Object.values(err.errors)
            .map(function (item) { return item.message; })
            .join(",");
        customError.statusCode = 400;
    }
    if (err.code && err.code === 11000) {
        customError.msg = "Duplicate value entered for ".concat(Object.keys(err.keyValue), " field, please choose another value");
        customError.statusCode = 400;
    }
    if (err.name === "CastError") {
        customError.msg = "No item found with id: ".concat(err.value);
        customError.statusCode = 404;
    }
    return res.status(customError.statusCode).json({ msg: customError.msg });
};
exports.default = errorHandlerMiddleware;
