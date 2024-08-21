import express from "express";
import { addFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

//add image to database
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,filename,cb) => {
        return cb(null, `${Date.now()}${filename.originalname}`)
    }
})

const upload = multer({
    storage: storage
})


foodRouter.post("/add",upload.single('image'),addFood)

export default foodRouter;