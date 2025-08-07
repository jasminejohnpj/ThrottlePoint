import { Router } from "express";

import { trending ,featuredList } from '../controllers/list.controller.js';

const listRouter = Router();

listRouter.get('/trending' , trending);
listRouter.get('/featuredList' , featuredList)

export default listRouter;