"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var TodoSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "A name must be provided"],
        trim: true,
        maxlength: [40, "The name cannot be more than 40 characters"],
    },
    description: {
        type: String,
        required: [true, "A description must be provided"],
        trim: true,
        maxlength: [
            50,
            "The description cannot be more than 20 characters",
        ],
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        // Tie todo to user
        required: [true, "Please provide user"],
    },
}, { timestamps: true } //
);
module.exports = (0, mongoose_1.model)("Todo", TodoSchema);
