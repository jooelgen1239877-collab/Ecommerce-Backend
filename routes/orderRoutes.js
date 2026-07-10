const express = require("express");

const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
} = require("../controllers/orderController");

const {
    createOrderValidator,
    getOrderValidator,
    updateOrderValidator,
} = require("../utils/orderValidator");

const router = express.Router();

router.post("/", createOrderValidator, createOrder);

router.get("/", getAllOrders);

router.get("/:id", getOrderValidator, getOrderById);

router.patch("/:id/pay", updateOrderValidator, updateOrderToPaid);

router.patch("/:id/deliver", updateOrderValidator, updateOrderToDelivered);

module.exports = router;