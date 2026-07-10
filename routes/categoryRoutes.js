const express = require("express");

const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoryController");

const {
    createCategoryValidator,
} = require("../utils/categoryValidator");

const router = express.Router();

router.post("/", createCategoryValidator, createCategory);

router.get("/", getAllCategories);

router.get("/:id", getCategoryById);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

module.exports = router;