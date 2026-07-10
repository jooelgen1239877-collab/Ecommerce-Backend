const Product = require("../models/productModel");
const slugify = require("slugify");

// Create Product
const createProduct = async (req, res) => {
    try {
        req.body.slug = slugify(req.body.title);

        const product = await Product.create(req.body);

        res.status(201).json({
            message: "Product created successfully",
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get All Products
const getAllProducts = async (req, res) => {
    try {
        const filter = {};

        // Filter by category
        if (req.query.category) {
            filter.category = req.query.category;
        }

        // Minimum price
        if (req.query.minPrice) {
            filter.price = {
                ...filter.price,
                $gte: Number(req.query.minPrice),
            };
        }

        // Maximum price
        if (req.query.maxPrice) {
            filter.price = {
                ...filter.price,
                $lte: Number(req.query.maxPrice),
            };
        }

        // Products in stock only
        if (req.query.inStock === "true") {
            filter.quantity = { $gt: 0 };
        }

        // Search by title
        if (req.query.search) {
            filter.title = {
                $regex: req.query.search,
                $options: "i",
            };
        }

        const products = await Product.find(filter).populate("category", "name");

        res.status(200).json({
            results: products.length,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get Product By ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate(
            "category",
            "name"
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json({
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Update Product
const updateProduct = async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        ).populate("category", "name");

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json({
            message: "Product updated successfully",
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json({
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};