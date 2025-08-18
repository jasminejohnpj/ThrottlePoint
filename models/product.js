import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
     brand: {
        type: String,
        required: [true, 'Brand name is required'],
        minlength: 2,
        maxlength: 50,
        trim: true
    } ,
   model: {
        type: String,
        required: [true, 'Model name is required'],
        minlength: 2,
        maxlength: 50,
        trim: true
    } ,
    price: {
        type: Number,
        required: [true, 'Price amount is required'],
        min: 0,          
        max: 1000000     
    },
    color: {
        type: String,
        required: [true, 'Product color is required'],
        trim: true,
        lowercase: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
        lowercase: true
    },
    productImage: {
        type: String,
        required: [true, 'Product image is required']
    },
    productImagePublicId: {   
        type: String
    }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
