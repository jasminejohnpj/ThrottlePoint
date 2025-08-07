import Categories from '../models/categories.js';

export const trending = async (req, res, next) => {
  try {
    const trend = await Categories.find(
      { "TrendingBikes": { $exists: true } },
      { "TrendingBikes": 1, _id: 0 }
    );
    
    const trendingBikesList = trend.map(item => item["TrendingBikes"]);

    return res.status(200).json(trendingBikesList);
  } catch (error) {
    next(error);
  }
};


export const featuredList = async (req, res, next) => {
  try {
    const featured = await Categories.find(
      { "FeaturedBikes": { $exists: true } },
      { "FeaturedBikes": 1, _id: 0 }
    );
    
    const featuredBikesList = featured.map(item => item["FeaturedBikes"]);

    return res.status(200).json(featuredBikesList);
  } catch (error) {
    next(error);
  }
};

