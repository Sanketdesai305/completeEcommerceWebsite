const router = require("express").Router();
const bodyParser = require("body-parser");
const Cart =  require("../models/Cart");
router.use(bodyParser.json());
const {VerifyToken, VerifyTokenAndAutherization,VerifyTokenAndAdmin} = require("../routes/VerifyToken");

//CREATE CART

router.post("/", VerifyToken ,async(req,res)=>{
    const newCart = new Product(req.body)

    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }catch(err){
        res.status(500).json(err);
    }
});

//UPDATE CART

router.put("/:id",VerifyTokenAndAutherization,async(req,res)=>{
    try{
        const updatesCart = await Cart.findByIdAndUpdate(req.params.id,{
            $set: req.body
        }, {new:true});
        res.status(200).json(updatesCart)
    }catch(err){
        res.status(500).json(err)
    }

});

// //DELETE CART

router.delete("/:id", VerifyTokenAndAutherization,async (req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted...")
    }catch(err){
        res.status(500).json(err)
    }
});

// //GET USER CART

router.get("/find/:userId", VerifyTokenAndAutherization ,async (req,res)=>{
    try{
       const cart =  await Cart.findOne({userId: req.params.userId})
        res.status(200).json(cart)
    }catch(err){
        res.status(500).json(err)
    }
});

// //GET ALL USERS

router.get("/", VerifyTokenAndAdmin ,async (req,res)=>{
    try{
            const carts = await Cart.find();
            res.status(200).json(carts);
        }catch(err){
            res.status(500).json(err)
        }

});

module.exports = router;