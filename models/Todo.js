const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "A name must be provided"],
        trim: true,
        maxlength: [20, "The name cannot be more than 20 characters"],
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Todo", TodoSchema);
