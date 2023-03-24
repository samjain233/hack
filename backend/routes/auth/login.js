const express = require("express");
// const createUser = require("./authentication/createuser");
// const findUser = require("./authentication/finduser");
// const createToken = require("./createtoken");
// const isAuth = require("./isauth");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// const UserDetail = require("../../src/models/userDetails");
// const User = require("../../src/models/userauth");

const router = express.Router();

router.use(express.static("public"));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(cookieParser());




router.get("/login", async (req, res) => {
    try {
        res.send("login");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.get("/register",async(req,res)=>{
    try{
        res.send("register router");
    }catch(error){

    }
})

router.post("/register", async (req, res) => {
    res.send("register port");
    // try {
        // res.send("port is running");
        // const { username, email, password, confirmPassword } = req.body;
        // const data = await User.findOne({email : email});
        // if(!data)
        // {
        // if (password === confirmPassword) {
        //     const user = await createUser(username, email, password);
        //     const token = await createToken(user._id);
        //     res.cookie("jwt", token, {
        //         expires: new Date(Date.now() + 6000000),
        //         httpOnly: true
        //     });
        //     res.redirect("/auth/verifyemail");
        // }
        // else {
        //     console.log("password didn't matched");
        //     res.send("password didn't matched");
        // }
    // }else{
        // console.log("user already have a account");
        // res.redirect("/auth/login");
    // }

    // } catch (error) {
        // console.log(error);
        // res.status(400).send(error);
    // }
});


// router.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const result = await findUser(email, password, res);
//         if (result.status) {
//             const data = await UserDetail.findOne({ _id: result.userid }).select({ moreDetail: 1 });
//             if (data && data.moreDetail) {
//                 res.status(result.statuscode).redirect("/viewprofile");
//             }
//             else {
//                 res.status(result.statuscode).redirect("/buildprofile/userdetails");
//             }

//         }
//         else {
//             res.status(result.statuscode).redirect("/auth/login");
//         }


//     } catch (error) {
//         console.log(error);
//         res.status(400).redirect("/auth/login");
//     }

// });

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