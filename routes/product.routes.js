import { Router } from "express";
import { Product ,productView} from '../controllers/product.controller.js';
import { upload } from '../middleware/multer.js';  

const productRouter = Router();

productRouter.post('/Product', upload.single('productImage'), Product);
productRouter.get('/productView' , productView);



export default productRouter;
