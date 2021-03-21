import mongoose from "mongoose";

const User = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true, hide: true },
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    hide: true,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", User);
