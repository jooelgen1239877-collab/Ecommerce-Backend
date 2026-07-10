const SubCategory = require("../models/subCategoryModel");
const slugify = require("slugify");

// Create SubCategory
const createSubCategory = async (req, res) => {
    try {
        req.body.slug = slugify(req.body.name);

        const subCategory = await SubCategory.create(req.body);

        res.status(201).json({
            message: "SubCategory created successfully",
            data: subCategory,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get All SubCategories
const getAllSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find().populate(
            "category",
            "name"
        );

        res.status(200).json({
            results: subCategories.length,
            data: subCategories,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get SubCategory By ID
const getSubCategoryById = async (req, res) => {
    try {
        const subCategory = await SubCategory.findById(req.params.id).populate(
            "category",
            "name"
        );

        if (!subCategory) {
            return res.status(404).json({
                message: "SubCategory not found",
            });
        }

        res.status(200).json({
            data: subCategory,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Update SubCategory
const updateSubCategory = async (req, res) => {
    try {
        if (req.body.name) {
            req.body.slug = slugify(req.body.name);
        }

        const subCategory = await SubCategory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate("category", "name");

        if (!subCategory) {
            return res.status(404).json({
                message: "SubCategory not found",
            });
        }

        res.status(200).json({
            message: "SubCategory updated successfully",
            data: subCategory,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Delete SubCategory
const deleteSubCategory = async (req, res) => {
    try {
        const subCategory = await SubCategory.findByIdAndDelete(req.params.id);

        if (!subCategory) {
            return res.status(404).json({
                message: "SubCategory not found",
            });
        }

        res.status(200).json({
            message: "SubCategory deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createSubCategory,
    getAllSubCategories,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory,
};