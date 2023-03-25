//requiring external pakages
require("dotenv").config();
const express = require ("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//middlewares
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser()); // check it in the end to remove or not

//requiring internal dependencies
const Auth = require("./routes/auth/auth");
const saveString = require("./routes/saveString/saveString");
const getstring = require("./routes/saveString/getString");

app.use("/auth", Auth);
app.use("/savestring",saveString);
app.use("/getstring",getstring);

app.get("/",(req,res)=>{
    try{
        res.status(200).send("server is running");
    }catch(err){
        res.status(404).send("some error occured");
    }
});

const PORT = 5000;
app.listen(PORT,()=>{
    console.log("server is running");
})