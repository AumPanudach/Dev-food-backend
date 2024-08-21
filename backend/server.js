import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRouter.js';

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
app.use('/api/food',foodRouter)

app.listen(port, () => {
  console.log(`Server start at http://localhost:${port}`);
});
