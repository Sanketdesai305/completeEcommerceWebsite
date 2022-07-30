const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    userID:{
        type:String,
        required:true,
        unique:true
    },
    products:[{
        productID:{
            type:String,
    },
    quantity:{
        type:Number,
        default:1,
},
    
    },
    {
        type:String,
        required:true
    
    },
],




},{timestamps:true});

module.exports = mongoose.model("Cart",CartSchema);
