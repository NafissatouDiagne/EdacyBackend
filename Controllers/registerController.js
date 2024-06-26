const bcrypt= require('bcrypt');
const mongoose = require('mongoose')
const User=mongoose.model("User")
const sha256 = require("js-sha256");
const jwt = require("jwt-then");

exports.register = async(req,res)=>{
    const {lastname,firstname,phone,email,password,confirmpass}=req.body;
    const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;

if(!emailRegex.test(email))
throw "Email is not supported from your domain.";
if (password!=confirmpass)throw "Password and Confirm Password are different";
const userExist =await User.findOne({
    email,
});
if (userExist) throw "User with the same email already exists!";
const user = new User({
    lastname,firstname,phone,email,password:sha256(password+process.env.SALT) ,confirmpass:sha256(password+process.env.SALT)
});
await user.save();
res.json({
    message:"User registered successfully",
})
};
exports.login =async (req,res)=>{
const {email,password}=req.body;
const user= await User.findOne({
    email,
    password:sha256(password+process.env.SALT),
});
if(!user) throw "Email or password does not exist.";
const token = await jwt.sign({id:user.id},process.env.SECRET);
res.json({
    message:"User logged successfully",
    token,
});
};

exports.user = async(req,res)=>{
    const user= await User.find()
    res.json({
        user
    })
}