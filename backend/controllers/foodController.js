import { json } from "express";
import foodModel from "../models/foodModel.js";
import fs from 'fs';

// add food 
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });
    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    } 
};
// all food list
const list_food = async(req,res)=>{
    try{
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    }catch(err){
        res.json({success:false,data:err.message})
    }
}
//remove food
const remove_food = async(req,res)=>{
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Food Removed"})
    }catch(err){
        res.json({success:false, message:err.message})
    }
}

export {
    addFood,list_food,remove_food
}