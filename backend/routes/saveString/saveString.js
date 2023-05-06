//used for at the time of sign up
const express = require("express");
const bodyParser = require("body-parser");
const isAuth = require("../auth/isauth");
const UserString = require("../../models/saveUserPasswords");
const encrypt = require("../../services/encrypt");
const decrypt = require("../../services/decrypt");
const strToPass = require("../../services/stringToPasswordService");

const router = express.Router();

router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.get("/", (req, res) => {
  res.send("server is running");
});

router.post("/", async (req, res) => {
  try {
    const { string, token, web, pass } = req.body;
    //getting user from the token
    const user = await isAuth(token);
    if (user != null) {
      let data = await UserString.findOne({ _id: user._id });
      if (data == null) {
        const newUser = new UserString({
          _id: user._id,
          savedString: [
            {
              salt1: "null",
              salt2: "null",
              web: "null",
            },
          ],
        });
        data = await newUser.save();
      }

      const fdata = await UserString.findOne({
        _id: user._id,
        savedStrings: { $elemMatch: { web: web } },
      });

      const encrypted = await encrypt(string.string);
      console.log(encrypted);
      if (fdata == null) {
        const object = {
          salt1: encrypted.salt1,
          salt2: encrypted.salt2,
          web: web,
        };
        console.log(data);
        data.savedStrings = data.savedStrings.concat(object);
        await data.save();
        const newPassword = await strToPass(string.string, pass);
        const resdata = {
          success: true,
          password: newPassword,
        };
        res.json(resdata);
      } else {
        await UserString.findOneAndUpdate(
          {
            _id: user.id,
            savedStrings: { $elemMatch: { web: web } },
          },
          {
            $set: {
              "savedStrings.$.salt1": encrypted.salt1,
              "savedStrings.$.salt2": encrypted.salt2,
            },
          }
        );
        const newPassword = await strToPass(string.string, pass);
        const resdata = {
          success: true,
          password: newPassword,
        };
        res.json(resdata);
      }
    } else {
      const object = {
        success: false,
        message: "Unauthorized",
      };
      res.status(404).json(object);
      console.log("Unauthorized api");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
