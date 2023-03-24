require("../db/conn");
const mongoose=require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
    },
    email :{
        type : String,
        required : true,
        unique : true
    },
    salt :{
        type : String
    },
    hash :{
        type : String
    },
    tokens : [{
        token : {
            type : String
        }
    }]
});

//model
const User = new mongoose.model("User",userSchema);
module.exports = User;