const { check } = require("express-validator");
const mongoose = require("mongoose");
const Brand = require("../models/brandModel");
const validatorMiddleware = require("../middleware/validatorMiddleware");

exports.createBrandValidator = [
    check("name")
        .notEmpty()
        .withMessage("Brand name is required")
        .isLength({ min: 2 })
        .withMessage("Brand name must be at least 2 characters")
        .isLength({ max: 50 })
        .withMessage("Brand name must be less than 50 characters")
        .custom(async (value) => {
            const brand = await Brand.findOne({ name: value });

            if (brand) {
                throw new Error("Brand already exists");
            }

            return true;
        }),

    validatorMiddleware,
];

exports.getBrandValidator = [
    check("id")
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error("Invalid Brand ID");
            }

            return true;
        }),

    validatorMiddleware,
];

exports.updateBrandValidator = exports.getBrandValidator;

exports.deleteBrandValidator = exports.getBrandValidator; 