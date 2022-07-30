const router = require("express").Router();
const bodyParser = require("body-parser");
const User = require("../models/User");
const {VerifyToken, VerifyTokenAndAutherization,VerifyTokenAndAdmin} = require("../routes/VerifyToken")
router.use(bodyParser.json());

router.put("/:id",VerifyTokenAndAutherization,async(req,res)=>{
    if(req.body.password){
        req.body.password = (Cryptojs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString());
    }
    try{
        const updatesUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
        }, {new:true});
        res.status(200).json(updatesUser)
    }catch(err){
        res.status(500).json(err)
    }

});

//DELETE

router.delete("/:id", VerifyTokenAndAdmin,async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user has been deleted...")
    }catch(err){
        res.status(500).json(err)
    }
});

//GET USER ONLY ADMIN ACCESS

router.get("/find/:id", VerifyTokenAndAdmin,async (req,res)=>{
    try{
       const user =  await User.findById(req.params.id)
       const {password,...others} = user._doc;
        res.status(200).json(others)
    }catch(err){
        res.status(500).json(err)
    }
})

//GET ALL USERS

router.get("/", VerifyTokenAndAdmin,async (req,res)=>{
    const query = req.query.new;
    try{
       const user = query ? await User.find().sort({_id:-1}).limit(1) : await User.find();
        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
});

//GET USER STATS

router.get("/stats",VerifyTokenAndAdmin,async(req,res)=>{
    const date = new Date();
    const lastyear = new Date(date.setFullYear(date.getFullYear()-1));

    try{
        const data = await User.aggregate([
            {$match:{createdAt:{$gte: lastyear}}},
            {
                $project:{
                    month:{$month:"$createdAt"},
                },
            },
            {
                $group:{
                    _id:'$month',
                    total: {$sum:1},
                },
            },
        ]);
        res.status(200).json(data)
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;