import express from "express";
import { addFood,list_food,remove_food } from "../controllers/foodController.js";
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
foodRouter.get("/list", list_food)
foodRouter.post("/remove",remove_food)
export default foodRouter;