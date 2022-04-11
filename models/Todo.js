const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "A name must be provided"],
            trim: true,
            maxlength: [30, "The name cannot be more than 20 characters"],
        },
        completed: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide user"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);
