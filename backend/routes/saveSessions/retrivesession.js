const express = require("express");
const savedSession = require("../../models/saveSession");
const isAuth = require("../auth/isauth");
const bodyParser = require("body-parser");


const router = express.Router();

router.use(express.static("public"));
router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.get("/", async (req, res) => {
  try {
    res.send("server is running");
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await isAuth(req.body.token);

    const response = await savedSession.findOne({_id: user._id});

    const object = {
      username : user.username,
      response : response 
    }
    
    res.send(object);
    
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

