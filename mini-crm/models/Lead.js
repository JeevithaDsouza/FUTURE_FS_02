const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    followUp: String,
    status: {
        type: String,
        enum: ["new", "contacted", "converted"],
        default: "new"
    }
});

module.exports = mongoose.model("Lead", leadSchema);