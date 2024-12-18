const createError = require('http-errors');
const slugify = require("slugify");
const Blog = require('../models/blogModel');
const Rating = require('../models/ratingModel');

const getRating = async (page = 1, limit = 8) => {
    const rating = await Rating.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

    if (!rating) {
        throw createError(404, 'Rating Not Found')
    }
    const count = await Rating.find().countDocuments();
    return {
        rating,
        count,
        totalPage: Math.ceil(count / limit),
        currentPage: page,
    }
}
module.exports = {
    createRating,
    getRating
}