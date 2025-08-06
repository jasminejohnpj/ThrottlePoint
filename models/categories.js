import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
  TrendingBikes: {
    type: String,
    required: true,
    enum: ["SCOOTERS", "BEST MILEAGE BIKES", "SPORTS", "CRUISER"], // add all valid values here
  },
  FeaturedBikes: {
    type: String,
    required: true,
    enum: ["TRENDING", "POPULAR", "ELECTRIC", "ADVENTURE"], // add all valid values here
  },
}, { timestamps: true });

const Categories = mongoose.model('Categories', categoriesSchema);

export default Categories;
