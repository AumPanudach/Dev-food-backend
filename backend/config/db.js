import mongoose from "mongoose";

export const connectDB = async () => {
   await mongoose.connect('mongodb+srv://panudachwork:cSbhAg46PVQFWAB3@cluster0.dy3sx.mongodb.net/food_delivery').then(()=> console.log("Success connect database"));
}