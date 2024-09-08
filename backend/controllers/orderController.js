import { use } from "bcrypt/promises.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const frontend_url = "http://localhost:5174"

// place user order for frontend 
const placeOrder = async (req,res) =>{
    try{
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}});

        const line_item = req.body.items.map((item)=>({
            price_data:{
                currency:"thb",
                product_data:{
                    name:item.name,
                },
                unit_amount:item.price*36,
            },
            quantity:item.quantity,
        }))

        line_item.push({
            price_data:{
                currency:"thb",
                product_data:{
                    name:"Delivery Charges",
                },
                unit_amount:50*36,
            },
            quantity:1,
        })
        const session = await stripe.checkout.sessions.create({
            line_items:line_item,
            mode:"payment",
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })
        res.json({success:true, session_url:session.url})

    }catch(err){
        console.log(err);
        res.json({success:false, message:"Error placing order"})
    }
}

const verifyOrder = async (req,res) =>{
    const   {orderId,success} = req.body;
    try{
        if(success==="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true, message:"Payment verified"})
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message:"Payment failed"})
        }
    }catch(err){
        console.log(err);
        res.json({success:false, message:"Error verifying order"})
    }
}

// user 's order for frontend
const userOrders = async (req, res) =>{
    try{
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true, data:orders})
    }catch(err){
        console.log(err);
        res.json({success:false, message:"Error getting orders"})
    }
}

// Listing order for admin page

const listOrder = async (req, res) =>{
    try{
        const orders = await orderModel.find({});
        res.json({success:true, data:orders})
    }catch(err){
        console.log(err);
        res.json({success:false, message:"Error getting orders"})
    }
}


// api for update order status
const updateStatus = async (req, res) =>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status});
        res.json({success:true, message:"Order status updated"})
    }catch(err){
        console.log(err);
        res.json({success:false, message:"Error updating order status"})
    }
}
export {
    placeOrder,verifyOrder,userOrders,listOrder,updateStatus
}