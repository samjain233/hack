const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../../models/userauth");

const app = express();

const isAuth = async (token) => {
  try {
    const verifyUser = jwt.verify(token, process.env.SECRET);
    let user = await User.findOne({ _id: verifyUser._id }).select({
      username: 1,
      email: 1,
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = isAuth;
