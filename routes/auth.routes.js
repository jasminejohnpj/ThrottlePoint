import { Router } from "express";

import {signUp , signIn , resetPassword} from '../controllers/auth.controller.js';
import { generateToken } from "../middleware/generatetoken.js";

const authRouter = Router();

authRouter.post('/signUp' ,signUp);
authRouter.post('/signIn' ,signIn,generateToken);
authRouter.post('/resetPassword' , resetPassword);
export default authRouter;
