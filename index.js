const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require ("./routes/product");
const stripeRoute = require("./routes/stripe")
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const bodyParser = require("body-parser");
const path =  require('\
path');
const cors = require('cors');

const app = express();
app.use(cors());

require('dotenv').config();

app.use(express.static(path.join(__dirname,'build')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(process.env.URL).then(()=>{
    console.log("DB connection successfull!")
}).catch((err)=>{console.log(err)});

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/products",productRoute);
app.use("/api/carts",cartRoute);
app.use("/api/orders",orderRoute);
app.use("/api/checkout", stripeRoute)



app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname+ 'build', 'index.html'));
})

app.listen(process.env.PORT || 5000,()=>{
    console.log(`backend server is running on port ${process.env.PORT||5000}`)
});


