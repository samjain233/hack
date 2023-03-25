const express = require("express");
const bodyParser = require("body-parser");
const isAuth = require("../auth/isauth");
const UserString = require("../../models/saveUserPasswords");
const Cryptr = require('cryptr');



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
    const { string, token, web } = req.body;
    //getting user from the token
    const user = await isAuth(token);
    const cryptedString = cryptr.encrypt(string);
    let data = await UserString.findOne({ _id: user._id });
    if (data == null) {
      const newUser = new UserString({
        _id: user._id,
        savedString: [
          {
            salt: "null",
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

    console.log(fdata);
    if (fdata == null) {
      const object = {
        salt: cryptedString,
        web: web,
      };
      data.savedStrings = data.savedStrings.concat(object);
      await data.save();
    } else {
      const res = await UserString.findOneAndUpdate(
        {
          savedStrings: { $elemMatch: { web: web } },
        },
        { $set: { savedStrings: { web: web, salt: cryptedString } } }
      );
      console.log("sucessfull updated");
      console.log(res);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
