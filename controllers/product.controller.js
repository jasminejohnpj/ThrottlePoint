import product from '../models/product.js'; 
import { uploadToCloudinary } from '../config/cloudinary.js'; 

export const Product = async (req, res, next) => {
    try {
        const { bikeName, price, color, category } = req.body;

        const localFilePath = req.file?.path;
        if (!localFilePath) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const uploadedimage = await uploadToCloudinary(localFilePath);
        if (!uploadedimage) {
            return res.status(500).json({ error: 'Image Upload failed' });
        }

        const newProduct = await product.create({
            bikeName,
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
