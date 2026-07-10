const { check } = require("express-validator");
const Category = require("../models/categoryModel");
const validatorMiddleware = require("../middleware/validatorMiddleware");

exports.createCategoryValidator = [
    check("name")
        .notEmpty()
        .withMessage("Category name is required")
        .isLength({ min: 3 })
        .withMessage("Category name must be at least 3 characters")
        .isLength({ max: 50 })
        .withMessage("Category name must be less than 50 characters")
        .custom(async (val) => {
            console.log("Value =", val);

            const category = await Category.findOne({ name: val });

            console.log("Category Found =", category);

            if (category) {
                throw new Error("Category name already exists");
            }

            return true;
        }),

    validatorMiddleware,
];