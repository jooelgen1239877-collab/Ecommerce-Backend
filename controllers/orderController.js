const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

// Create Order (Checkout)
const createOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne();

        if (!cart || cart.cartItems.length === 0) {
            return res.status(404).json({
                message: "Cart is empty",
            });
        }

        const order = await Order.create({
            cartItems: cart.cartItems,
            totalOrderPrice: cart.totalPrice,
            paymentMethod: req.body.paymentMethod || "cash",
        });

        // Clear cart after checkout
        await Cart.deleteMany();

        res.status(201).json({
            message: "Order created successfully",
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get All Orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate(
            "cartItems.product",
            "title price"
        );

        res.status(200).json({
            results: orders.length,
            data: orders,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get Order By ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate(
            "cartItems.product",
            "title price"
        );

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        res.status(200).json({
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Update Order To Paid
const updateOrderToPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        order.isPaid = true;
        order.paidAt = Date.now();

        await order.save();

        res.status(200).json({
            message: "Order paid successfully",
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Update Order To Delivered
const updateOrderToDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }

        order.isDelivered = true;
        order.deliveredAt = Date.now();

        await order.save();

        res.status(200).json({
            message: "Order delivered successfully",
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
};