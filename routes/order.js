const router = require("express").Router();
const bodyParser = require("body-parser");
const Order =  require("../models/Order");
router.use(bodyParser.json());
const {VerifyToken, VerifyTokenAndAutherization,VerifyTokenAndAdmin} = require("../routes/VerifyToken");

//CREATE ORDER

router.post("/", VerifyToken ,async(req,res)=>{
    const newOrder = new Order(req.body)

    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    }catch(err){
        res.status(500).json(err);
    }
});

//UPDATE ORDER

router.put("/:id",VerifyTokenAndAdmin,async(req,res)=>{
    try{
        const updatesOrder = await Order.findByIdAndUpdate(req.params.id,{
            $set: req.body
        }, {new:true});
        res.status(200).json(updatesOrder)
    }catch(err){
        res.status(500).json(err)
    }

});

// //DELETE ORDER

router.delete("/:id", VerifyTokenAndAdmin,async (req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted...")
    }catch(err){
        res.status(500).json(err)
    }
});

// //GET USER ORDERS

router.get("/find/:userId", VerifyTokenAndAutherization ,async (req,res)=>{
    try{
       const order =  await Order.findOne({userId: req.params.userId})
        res.status(200).json(order)
    }catch(err){
        res.status(500).json(err)
    }
});

// //GET ALL 

router.get("/", VerifyTokenAndAdmin ,async (req,res)=>{
    try{
            const orders = await Order.find();
            res.status(200).json(orders);
        }catch(err){
            res.status(500).json(err)
        }

});

//GET MONTHLY INCOME

router.get("/income",VerifyTokenAndAdmin,async(req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() -1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() -1));

    try{
       const income = await Order.aggregate([
        {$match:{createdAt:{$gte:previousMonth}}},
        {
            $project:{
                month:{$month:"$createdAt"},
                sales:"$amount",
    }},
        {
            $group: {
                _id:"$month",
                total:{$sum:"$sales"},
            },
        },

    ]); 
    res.status(200).json(income)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;