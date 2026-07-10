const { check } = require("express-validator");
const mongoose = require("mongoose");
const Category = require("../models/categoryModel");
const validatorMiddleware = require("../middleware/validatorMiddleware");

exports.createSubCategoryValidator = [
    check("name")
        .notEmpty()
        .withMessage("SubCategory name is required")
        .isLength({ min: 2 })
        .withMessage("SubCategory name must be at least 2 characters")
        .isLength({ max: 50 })
        .withMessage("SubCategory name must be less than 50 characters"),

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

exports.getSubCategoryValidator = [
    check("id")
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error("Invalid SubCategory ID");
            }

            return true;
        }),

    validatorMiddleware,
];

exports.updateSubCategoryValidator = exports.getSubCategoryValidator;

exports.deleteSubCategoryValidator = exports.getSubCategoryValidator;