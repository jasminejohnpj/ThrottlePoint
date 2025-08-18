import product from '../models/product.js'; 
import { uploadToCloudinary , deleteFromCloudinary} from '../config/cloudinary.js'; 

export const Product = async (req, res, next) => {
    try {
        const { brand,model, price, color, category } = req.body;

        const localFilePath = req.file?.path;
        if (!localFilePath) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const uploadedimage = await uploadToCloudinary(localFilePath);
        if (!uploadedimage) {
            return res.status(500).json({ error: 'Image Upload failed' });
        }

        const newProduct = await product.create({
            brand,
            model,
            price,
            color,
            category,
            productImage: uploadedimage.url,
            productImagePublicId: uploadedimage.public_id,
        });

        return res.status(201).json({ message: 'Product added successfully',  product: newProduct });

    } catch (error) {

        next(error);
    }
};


export const productView = async (req, res, next) => {
    try {
        const { id } = req.query;
      
        if (!id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        const item = await product.findById(id);

        if (!item) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({
            message: 'Product details retrieved successfully',
            product: item
        });

    } catch (error) {
        next(error);
    }
};





export const updateProduct = async (req, res, next) => {
  try {
    const { product_id } = req.params;
    const { brand, model, price, color, category } = req.body;
    const localFilePath = req.file?.path;
    
    if (!product_id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const item = await product.findById(product_id);
    if (!item) {
      return res.status(404).json({ message: "Product not found" });
    }

   if (localFilePath) {
  if (item.productImagePublicId) {
    await deleteFromCloudinary(item.productImagePublicId);
  }

  const uploadedImage = await uploadToCloudinary(localFilePath, {
    overwrite: true,
    invalidate: true,
    public_id: item.productImagePublicId, 
  });

  if (!uploadedImage || (!uploadedImage.url && !uploadedImage.secure_url)) {
    return res.status(500).json({ error: "Image upload failed" });
  }
  item.productImage = uploadedImage.secure_url || uploadedImage.url;
  item.productImagePublicId = uploadedImage.public_id;
}

if (brand !== undefined) item.brand = brand;
if (model !== undefined) item.model = req.body.model;
if (price !== undefined) item.price = price;
if (color !== undefined) item.color = color;
if (category !== undefined) item.category = category;

await item.save();


    return res.status(200).json({
      message: "Product updated successfully",
      product: item,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteProduct = async (req, res, next) => {
  try {
    const { product_id } = req.params;

    if (!product_id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const item = await product.findById(product_id);
    if (!item) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (item.productImagePublicId) {
      await deleteFromCloudinary(item.productImagePublicId);
    }

    await item.deleteOne();

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};


