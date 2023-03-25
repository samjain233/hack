const express = require("express");
const bodyParser = require("body-parser");
const isAuth = require("../auth/isauth");
const UserString = require("../../models/saveUserPasswords");
const Cryptr = require('cryptr');
const saveSession = require("../saveSessions/savesession");

const router = express.Router();

router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const cryptr = new Cryptr(process.env.CRYPTSECRET);

router.get("/", (req, res) => {
  res.send("server is running");
});

router.post("/", async (req, res) => {
  try {
    const { token, web } = req.body;
    //getting user from the token
    const user = await isAuth(token);
    if (user != null) {
      const data = await UserString.findOne({
        _id: user._id,
        savedStrings: { $elemMatch: { web: web } },
      });

      if (data != null) {
        const cryptedString = data.savedStrings[0].salt;
        const string = cryptr.decrypt(cryptedString);
        const object = {
          success: true,
          str1: string.slice(0, 10),
          str2: string.slice(10),
        };
        saveSession(web , "meerut" , user._id); // location is hardcoded for now
        res.status(200).send(object);
      } else {
        const object = {
          success: false,
          message: "Data doesn't exists",
        };
        res.status(400).send(object);
      }
    } else {
      const object = {
        success: false,
        message: "user doesn't exists",
      };
      res.status(400).send(object);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
