const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventName: {
    type: String,
    trim: true,
    default: "participant"
  },
  eventDate: {
    type: Date,
    trim: true
  },
  eventTime: {
    type: TimeRanges,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  runners: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Runner'
  }
});

module.exports = mongoose.model("Event", eventSchema);
