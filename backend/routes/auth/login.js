const express = require("express");
const createUser = require("./authentication/createuser");
const findUser = require("./authentication/finduser");
const createToken = require("./createtoken");
// const isAuth = require("./isauth");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// const UserDetail = require("../../src/models/userDetails");
const User = require("../../models/userauth");

const router = express.Router();

router.use(express.static("public"));
router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.get("/login", async (req, res) => {
  try {
    res.send("login");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/register", async (req, res) => {
  try {
    res.send("register get route");
  } catch (error) {}
});

router.post("/register", async (req, res) => {
  try {
    console.log("register post router is running");
    const { username, email, password } = req.body;
    if (password.length >= 8) {
      const data = await User.findOne({ email: email });
      if (!data) {
        const user = await createUser(username, email, password);
        const token = await createToken(user._id);
        const object = {
          success: true,
          message: "user created successfully",
          data: {
            token: token,
            email: user.email,
            username: user.username,
          },
        };
        console.log(object);
        res.status(200).send(object);
      } else {
        const object = {
          success: false,
          message: "User already exists",
        };
        res.status(200).send(object);
      }
    } else {
      const object = {
        success: false,
        message: "password must be greater than or equal to  8",
      };
      res.status(200).send(object);
    }
  } catch (error) {
    console.log(error);
    const object = {
      success: false,
      message: "some error occurred",
    };
    res.status(400).send(object);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await findUser(email, password, res);
    if (result.status) {
      const object = {
        success: true,
        message: "user logged in successfully",
        data: {
          token: result.token,
          email: result.email,
          username: result.username,
        },
      };
      res.status(200).send(object);
    } else {
      const object = {
        success: false,
        message: result.error,
      };
      res.status(result.statuscode).send(object);
    }
  } catch (error) {
    const object = {
      success: false,
      message: "some error occurred",
    };
    console.log(error);
    res.status(400).send(object);
  }
});

// router.get("/logout", async (req, res) => {
//     try {
//         const user = await isAuth(req);
//         if(user){
//             res.clearCookie("jwt");
//             res.redirect("/auth/login");
//         }
//         else{

//         }

//     } catch (error) {
//         console.log(error);
//         res.send(error);
//     }
// });

module.exports = router;
