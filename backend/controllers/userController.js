import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// login user
const loginUser = async (req,res) => {
    const { email, password } = req.body;
    if(!email||!password){
        return res.json({success:false, message:"Please fill all the fields"})
    }
    try{    
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message:"User not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success:false, message:"Invalid credentials"})
        }
        const token = generateToken(user._id);
        res.json({success:true, token})

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const registerUser = async (req,res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.json({ success: false, message: "Please fill all the fields" });
    }else{
        try{
            const exists = await userModel.findOne({email});
            if(exists){
                return res.json({success:false, message:"User already exists"})
            }
            // validate email
            if(!validator.isEmail(email)){
                return res.json({success:false, message:"Invalid email"})
            }
            // check password strength
            if(password.length<8){
                return res.json({success:false, message:"Password is not strong enough"})
            }
            // hashing user's password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);

            const newUser = new userModel({
                name:name, 
                email:email, 
                password:hashedPassword
            });
            
            //save data to database
            const user = await newUser.save();
            // create token 
            const token = generateToken(user._id);
            res.json({success:true,token})
            console.log(user);

        }catch(error){
            console.log(error)
            res.json({success:false, message:error.message})
        }

    }
}

export {
    loginUser, registerUser
}