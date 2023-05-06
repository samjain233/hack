const express = require("express");
const savedSession = require("../../models/saveSession");
const isAuth = require("../auth/isauth");
const bodyParser = require("body-parser");
const UserString = require("../../models/saveUserPasswords");


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
    if(user != null){
      const response = await UserString.findOne({_id: user._id}).select({savedStrings : {web : 1}});
      if(response != null){
        const data = {
          status : true,
          message : "No saved web addresses",
          data : response.savedStrings
        }
        res.json(data);
      }
      else{
        const data = {
          status : true,
          message : "No saved web addresses",
          data : []
        }
        res.json(data);
      }
    }
    else{
      const data = {
        status : false,
        message : "User does not exists"
      }
      res.json(data);
    }
    
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

