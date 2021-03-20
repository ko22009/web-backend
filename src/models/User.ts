import mongoose from "mongoose";
const passportLocalMongoose = require("passport-local-mongoose");

const User = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true, hide: true },
  username: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    hide: true,
  },
  hash: {
    type: String,
    hide: true,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);
