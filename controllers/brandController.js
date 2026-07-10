const Brand = require("../models/brandModel");
const slugify = require("slugify");

// Create Brand
const createBrand = async (req, res) => {
    try {
        req.body.slug = slugify(req.body.name);

        const brand = await Brand.create(req.body);

        res.status(201).json({
            message: "Brand created successfully",
            data: brand,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get All Brands
const getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find();

        res.status(200).json({
            results: brands.length,
            data: brands,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get Brand By ID
const getBrandById = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);

        if (!brand) {
            return res.status(404).json({
                message: "Brand not found",
            });
        }

        res.status(200).json({
            data: brand,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Update Brand
const updateBrand = async (req, res) => {
    try {
        if (req.body.name) {
            req.body.slug = slugify(req.body.name);
        }

        const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        if (!brand) {
            return res.status(404).json({
                message: "Brand not found",
            });
        }

        res.status(200).json({
            message: "Brand updated successfully",
            data: brand,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Delete Brand
const deleteBrand = async (req, res) => {
    try {
        const brand = await Brand.findByIdAndDelete(req.params.id);

        if (!brand) {
            return res.status(404).json({
                message: "Brand not found",
            });
        }

        res.status(200).json({
            message: "Brand deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createBrand,
    getAllBrands,
    getBrandById,
    updateBrand,
    deleteBrand,
};