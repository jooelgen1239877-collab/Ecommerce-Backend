const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        slug: {
            type: String,
            lowercase: true,
        },

        image: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;