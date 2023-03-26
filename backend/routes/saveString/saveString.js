const express = require("express");
const bodyParser = require("body-parser");
const isAuth = require("../auth/isauth");
const UserString = require("../../models/saveUserPasswords");
const Cryptr = require("cryptr");

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
    const { string, token, web, pass } = req.body;
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
      const response = await fetch("http://localhost:5000/getstring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, web, pass}),
      });
      const object2 = await response.json();
      console.log(object2);
      res.send(object2);
    } else {
      const response = await UserString.findOneAndUpdate(
        {
          savedStrings: { $elemMatch: { web: web } },
        },
        { $set: { savedStrings: { web: web, salt: cryptedString } } }
      );
      console.log("sucessfull updated");
      const response2 = await fetch("http://localhost:5000/getstring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, web, pass}),
      });
      const object2 = await response2.json();
      console.log(object2);
      res.send(object2);
      console.log(response);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
