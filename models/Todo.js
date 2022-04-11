const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "A name must be provided"],
            trim: true,
            maxlength: [40, "The name cannot be more than 20 characters"],
        },
        description: {
            type: String,
            required: [true, "A description must be provided"],
            trim: true,
            maxlength: [40, "The name cannot be more than 20 characters"],
        },
        completed: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            // Tie todo to user
            required: [true, "Please provide user"],
        },
    },
    { timestamps: true } //
);

module.exports = mongoose.model("Todo", TodoSchema);
