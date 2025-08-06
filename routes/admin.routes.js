import { Router } from "express";

import { admin , adminLogin } from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.post('/admin' , admin);
adminRouter.post('/adminLogin' , adminLogin);


export default adminRouter;