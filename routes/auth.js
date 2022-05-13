"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var auth_1 = require("../controllers/auth");
router.post("/register", auth_1.register);
router.post("/login", auth_1.login);
module.exports = router;
