const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const runnerSchema = new Schema({
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
  },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Runner' }],
  updated: {
    type: Date,
    Default: Date.now
  }
});

runnerSchema.plugin(passportLocalMongoose, { usernameField: "email", usernameLowerCase: true });

module.exports = mongoose.model("Runner", runnerSchema);
