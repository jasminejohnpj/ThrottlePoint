import express from 'express'
import { PORT } from './config/env.js'
import errorMiddleware from './middleware/error.middleware.js';
import connectToDatabase from './database/mongodb.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.router.js';
import adminRouter from './routes/admin.routes.js';
const app = express();

app.use(express.json());


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);

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