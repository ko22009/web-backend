import mongoose from "mongoose";

module.exports = {
  model: "User",
  documents: [
    {
      login: "admin",
      password: "admin",
      is_admin: true,
    },
  ],
};
