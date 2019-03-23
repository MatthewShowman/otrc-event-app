const mongoose = require("mongoose");

const emailListSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true
  }
});

module.exports = mongoose.model("Email", emailListSchema);
