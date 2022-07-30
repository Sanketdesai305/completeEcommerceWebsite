const router = require("express").Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const User = require("../models/User");
const Cryptojs = require("crypto-js");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config();
//REGISTER FUNCTION
router.post("/register",async(req,res)=>{

    //check if user exists
    const userExist = await User.findOne({email:req.body.email})
    const username = await User.findOne({username:req.body.username})
    if(userExist){
        res.status(400).json("user already exists")
    }else     if(username){
        res.status(400).json("username already exist")
    }else{
    
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt)
    const newUser = new User({
        username: req.body.username,
        email:req.body.email,
        password:hashedPassword,
    });

    const user = await newUser.save()
    try{

        res.status(200).json({
            _id: user.id,
            username: user.username,
            email:user.email
        })
    }catch(err){
        res.status(500).json(err)
    }
}
});


//LOGIN FUNCTION

router.post("/login", async(req,res)=>{
const {username,password} = req.body;

//check if email exists
const user = await User.findOne({username})
if(!user){
    res.status(400).json("wrong credentials!")
    //compare password with password in DB
}else if(user && (await bcrypt.compare(password, user.password))){
    res.json({
        _id: user.id,
        username: user.username,
        email:user.email,
        token:generateToken(user._id)
    })
}else{
    res.status(500).json(`invalid credentials`)
}

})

//GENERATE JWT

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SEC,{
        expiresIn:'1d',
    })
}

module.exports = router;