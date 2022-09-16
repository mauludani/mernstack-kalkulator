const mongoose = require("mongoose");
const Time = mongoose.model(
    "Time",
    new mongoose.Schema({
        username: String,
        signin: Date,
        logout: Date,
    })
);
module.exports = Time;