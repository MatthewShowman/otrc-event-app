const mongoose = require("mongoose");

const emailListSchema = mongoose.Schema({
  email: Array
});

module.exports = mongoose.model("Email", emailListSchema);
