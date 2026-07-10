const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
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

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "category",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategory;