require("../db/conn");
const mongoose = require("mongoose");

const saveUserPasswordSchema = new mongoose.Schema({
  _id: String,
  savedStrings: [
    {
      salt1: {
        type: String,
      },
      salt2: {
        type: String,
      },
      web: {
        type: String,
      },
    },
  ],
});

//model
const UserString = new mongoose.model("UserString", saveUserPasswordSchema);
module.exports = UserString;
