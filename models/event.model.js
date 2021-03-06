const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventName: {
    type: String,
    trim: true,
  },
  eventDateTime: {
    type: Date,
    trim: true
  },
  // eventTime: {
  //   type: String,
  //   trim: true
  // },
  eventLocation: {
    type: String,
    trim: true
  },
  eventDescription: {
    type: String,
    default: "Coming Soon"
  },
  runners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Runner' }]
});

module.exports = mongoose.model("Event", eventSchema);
