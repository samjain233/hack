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

app.use("/auth", Auth);

app.get("/",(req,res)=>{
    try{
        res.status(200).send("server is running");
    }catch(err){
        res.status(404).send("some error occured");
    }
});

const PORT = 3000;
app.listen(PORT,()=>{
    console.log("server is running");
})