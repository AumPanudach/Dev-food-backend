import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRouter.js';
import userRouter from './routes/userRouter.js';
import 'dotenv/config';

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

//api food router
app.use('/api/food',foodRouter);
app.use('/api/user',userRouter);
app.use('/images',express.static('uploads'));

app.listen(port, () => {
  console.log(`Server start at http://localhost:${port}`);
});
