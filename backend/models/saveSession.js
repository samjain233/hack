require("../db/conn");
const mongoose = require("mongoose");

const saveSessionSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  sessions: [
    {
      web: {
        type: String,
      },
      time: {
        type: Date,
      },
      location : {
        type : String
      }
    },
  ],
});

//model
const savedSession = new mongoose.model("Savesession", saveSessionSchema);
module.exports = savedSession;
