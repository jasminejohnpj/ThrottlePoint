import { Router } from "express";

import { trending ,featuredList ,category } from '../controllers/categories.controller.js';

const listRouter = Router();

listRouter.get('/trending' , trending);
listRouter.get('/featuredList' , featuredList);
listRouter.get('/categories' , category);

export default listRouter;