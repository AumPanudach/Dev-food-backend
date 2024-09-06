import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRouter.js';
import userRouter from './routes/userRouter.js';
import 'dotenv/config';
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRouter.js';

const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//connect Database
connectDB();

//api router
app.use('/api/food',foodRouter);
app.use('/api/user',userRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);

//api get images
app.use('/images',express.static('uploads'));

app.listen(port, () => {
  console.log(`Server start at http://localhost:${port}`);
});
