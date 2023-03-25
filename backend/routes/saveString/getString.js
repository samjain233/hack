const express = require("express");
const bodyParser = require("body-parser");
const isAuth = require("../auth/isauth");
const UserString = require("../../models/saveUserPasswords");
const Cryptr = require("cryptr");
const saveSession = require("../saveSessions/savesession");
var crypto = require("crypto");

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
    const { token, web, pass } = req.body;
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
        const str1 = string.slice(0, 10);
        const str2 = string.slice(10);
        const password = str1 + pass + str2;
        console.log(password);
        const hash = await crypto
          .pbkdf2Sync(password, process.env.CRYPTOSALT, 1000, 64, `sha512`)
          .toString(`hex`);
        const hashedPassword = hash.slice(0, 15);
        const object = {
          success: true,
          password: hashedPassword,
        };
        saveSession(web, "meerut", user._id); // location is hardcoded for now
        res.status(200).send(object);
      } else {
        const object = {
          success: false,
          message: "Data doesn't exists",
        };
        res.status(400).send(object);
        console.log("web doesn't exist");
      }
    } else {
      const object = {
        success: false,
        message: "user doesn't exists",
      };
      res.status(400).send(object);
      console.log("user doesn't exist");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
