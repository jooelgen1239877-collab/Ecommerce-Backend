const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            lowercase: true,
        },

        description: {
            type: String,
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
        },

        sold: {
            type: Number,
            default: 0,
        },

        price: {
            type: Number,
            required: true,
        },

        priceAfterDiscount: {
            type: Number,
        },

        imageCover: {
            type: String,
        },

        images: [String],

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "category",
            required: true,
        },

        ratingsAverage: {
            type: Number,
            default: 0,
        },

        ratingsQuantity: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;