const express = require("express");

const {
    createBrand,
    getAllBrands,
    getBrandById,
    updateBrand,
    deleteBrand,
} = require("../controllers/brandController");

const {
    createBrandValidator,
    getBrandValidator,
    updateBrandValidator,
    deleteBrandValidator,
} = require("../utils/brandValidator");

const router = express.Router();

router.post("/", createBrandValidator, createBrand);

router.get("/", getAllBrands);

router.get("/:id", getBrandValidator, getBrandById);

router.put("/:id", updateBrandValidator, updateBrand);

router.delete("/:id", deleteBrandValidator, deleteBrand);

module.exports = router;