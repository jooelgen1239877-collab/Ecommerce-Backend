const { check } = require("express-validator");
const mongoose = require("mongoose");
const Category = require("../models/categoryModel");
const validatorMiddleware = require("../middleware/validatorMiddleware");

exports.createProductValidator = [
    check("title")
        .notEmpty()
        .withMessage("Product title is required")
        .isLength({ min: 3 })
        .withMessage("Product title must be at least 3 characters")
        .isLength({ max: 100 })
        .withMessage("Product title must be less than 100 characters"),

    check("description")
        .notEmpty()
        .withMessage("Product description is required")
        .isLength({ min: 20 })
        .withMessage("Description must be at least 20 characters"),

    check("quantity")
        .notEmpty()
        .withMessage("Quantity is required")
        .isNumeric()
        .withMessage("Quantity must be a number"),

    check("price")
        .notEmpty()
        .withMessage("Price is required")
        .isNumeric()
        .withMessage("Price must be a number"),

    check("category")
        .notEmpty()
        .withMessage("Category is required")
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error("Invalid Category ID");
            }

            const category = await Category.findById(value);

            if (!category) {
                throw new Error("Category not found");
            }

            return true;
        }),

    validatorMiddleware,
];

exports.getProductValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid Product ID"),

    validatorMiddleware,
];

exports.updateProductValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid Product ID"),

    validatorMiddleware,
];

exports.deleteProductValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid Product ID"),

    validatorMiddleware,
];