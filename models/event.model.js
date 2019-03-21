const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  eventName: {
    type: String,
    default: "participant"
  },
  firstname: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model("Event", eventSchema);
