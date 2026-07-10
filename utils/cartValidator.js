const { check } = require("express-validator");
const mongoose = require("mongoose");
const Product = require("../models/productModel");
const validatorMiddleware = require("../middleware/validatorMiddleware");

exports.addCartItemValidator = [
    check("product")
        .notEmpty()
        .withMessage("Product is required")
        .custom(async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error("Invalid Product ID");
            }

            const product = await Product.findById(value);

            if (!product) {
                throw new Error("Product not found");
            }

            return true;
        }),

    check("quantity")
        .optional()
        .isNumeric()
        .withMessage("Quantity must be a number"),

    validatorMiddleware,
];

exports.updateCartItemValidator = [
    check("productId")
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error("Invalid Product ID");
            }

            return true;
        }),

    check("quantity")
        .notEmpty()
        .withMessage("Quantity is required")
        .isNumeric()
        .withMessage("Quantity must be a number"),

    validatorMiddleware,
];

exports.removeCartItemValidator = [
    check("productId")
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error("Invalid Product ID");
            }

            return true;
        }),

    validatorMiddleware,
];