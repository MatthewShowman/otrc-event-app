const mongoose = require("mongoose");

const runnerSchema = mongoose.Schema({
  role: {
    type: String,
    default: "participant"
  },
  firstname: {
    type: String,
    trim: true
  },
  lastname: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    unique: true
  }
});

module.exports = mongoose.model("Runner", runnerSchema);
