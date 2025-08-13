import express from 'express'
import { PORT } from './config/env.js'
import cors from 'cors';
import errorMiddleware from './middleware/error.middleware.js';
import connectToDatabase from './database/mongodb.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.router.js';
import adminRouter from './routes/admin.routes.js';
import listRouter from './routes/list.routes.js';
import productRouter from './routes/product.routes.js';
const app = express();

const corsOptions = {
  origin: '*', 
  credentials: true, 
};

// const allowedOrigins = ['http://localhost:3001', '*'];

// const corsOptions = {
//   origin: function(origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// };


app.use(cors(corsOptions));

app.use(express.json());


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/list' , listRouter);
app.use('/api/v1/products' , productRouter);
app.use(errorMiddleware);


app.use(express.urlencoded({ extended: false }));

app.get('/', (req,res) =>
    {
   res.send("welcome....")
});


app.listen(PORT, async() => {
    console.log(`Throttle point  running on http://localhost:${PORT}`);
    await connectToDatabase();
});


 

export default app;