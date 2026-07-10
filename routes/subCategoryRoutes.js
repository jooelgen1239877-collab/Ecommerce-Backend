const express = require("express");

const {
    createSubCategory,
    getAllSubCategories,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory,
} = require("../controllers/subCategoryController");

const {
    createSubCategoryValidator,
    getSubCategoryValidator,
    updateSubCategoryValidator,
    deleteSubCategoryValidator,
} = require("../utils/subCategoryValidator");

const router = express.Router();

router.post("/", createSubCategoryValidator, createSubCategory);

router.get("/", getAllSubCategories);

router.get("/:id", getSubCategoryValidator, getSubCategoryById);

router.put("/:id", updateSubCategoryValidator, updateSubCategory);

router.delete("/:id", deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;