const express = require("express");
const bodyParser = require("body-parser");
const isAuth = require("../auth/isauth");
const UserString = require("../../models/saveUserPasswords");
const saveSession = require("../saveSessions/savesession");
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
    const { token, web, pass } = req.body;
    //getting user from the token
    const user = await isAuth(token);
    if (user != null) {
      const data = await UserString.findOne({
        _id: user._id,
        savedStrings: { $elemMatch: { web: web } },
      }).select({ savedStrings: { $elemMatch: { web: web } } });

      if (data != null) {
        const salt1 = data.savedStrings[0].salt1;
        const salt2 = data.savedStrings[0].salt2;
        const decrypted = await decrypt(salt1, salt2);
        console.log(decrypted);
        const newPassword = await strToPass(decrypted.string, pass);
        saveSession(web, "meerut", user._id); // location is hardcoded for now
        console.log(newPassword);
        const resdata = {
          success: true,
          password: newPassword,
        };
        res.json(resdata);
      } else {
        const object = {
          success: false,
          message: "Data doesn't exists",
        };
        res.status(400).json(object);
        console.log("web doesn't exist");
      }
    } else {
      const object = {
        success: false,
        message: "user doesn't exists",
      };
      res.status(400).json(object);
      console.log("user doesn't exist");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
