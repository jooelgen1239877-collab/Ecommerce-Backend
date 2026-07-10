const express = require("express");

const {
    addItemToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart,
} = require("../controllers/cartController");

const {
    addCartItemValidator,
    updateCartItemValidator,
    removeCartItemValidator,
} = require("../utils/cartValidator");

const router = express.Router();

router.post(
    "/items",
    addCartItemValidator,
    addItemToCart
);

router.get("/", getCart);

router.patch(
    "/items/:productId",
    updateCartItemValidator,
    updateCartItem
);

router.delete(
    "/items/:productId",
    removeCartItemValidator,
    removeCartItem
);

router.delete("/", clearCart);

module.exports = router;