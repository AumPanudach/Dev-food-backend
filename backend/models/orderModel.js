import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type:String,
    required: true,
  },
  items:{
    type:Array,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
  status:{
    type: String,
    default: "Food processing",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  payment: {
    type: Boolean,
    default: false,
  },
});

const orderModel = mongoose.model.order||mongoose.model("order", orderSchema);
export default orderModel;