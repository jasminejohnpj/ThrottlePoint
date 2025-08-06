import { Router } from "express";

import {profile , profileView} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifytoken.js";

const userRouter = Router();

userRouter.put('/profile',verifyToken, profile );
userRouter.get('/profileView',verifyToken,profileView);
export default userRouter;