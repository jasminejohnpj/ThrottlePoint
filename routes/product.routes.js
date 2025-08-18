import { Router } from "express";
import { Product ,productView, updateProduct ,deleteProduct} from '../controllers/product.controller.js';
import { upload } from '../middleware/multer.js';  

const productRouter = Router();

productRouter.post('/Product', upload.single('productImage'), Product);
productRouter.get('/productView' , productView);
productRouter.put('/:product_id' ,upload.single('productImage') ,updateProduct); 
productRouter.delete('/:product_id' , deleteProduct);

export default productRouter;
