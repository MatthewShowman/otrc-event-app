const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

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
    type: String,
    trim: true
  },
  eventLocation: {
    type: String,
    trim: true
  },
  runners: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Runner' }
  ]
});

module.exports = mongoose.model("Event", eventSchema);
