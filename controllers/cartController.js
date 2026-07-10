const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// Add Item To Cart
const addItemToCart = async (req, res) => {
    try {
        const { product, quantity } = req.body;

        const findProduct = await Product.findById(product);

        if (!findProduct) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        let cart = await Cart.findOne();

        if (!cart) {
            cart = await Cart.create({
                cartItems: [],
                totalPrice: 0,
            });
        }

        const productIndex = cart.cartItems.findIndex(
            (item) => item.product.toString() === product
        );

        if (productIndex > -1) {
            cart.cartItems[productIndex].quantity += quantity || 1;
        } else {
            cart.cartItems.push({
                product,
                quantity: quantity || 1,
                price: findProduct.price,
            });
        }

        cart.totalPrice = cart.cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        await cart.save();

        res.status(201).json({
            message: "Item added successfully",
            data: cart,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get Cart
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne().populate(
            "cartItems.product",
            "title price"
        );

        if (!cart) {
            return res.status(404).json({
                message: "Cart is empty",
            });
        }

        res.status(200).json({
            data: cart,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Update Quantity
const updateCartItem = async (req, res) => {
    try {
        const cart = await Cart.findOne();

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
            });
        }

        const item = cart.cartItems.find(
            (item) => item.product.toString() === req.params.productId
        );

        if (!item) {
            return res.status(404).json({
                message: "Product not found in cart",
            });
        }

        item.quantity = req.body.quantity;

        cart.totalPrice = cart.cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        await cart.save();

        res.status(200).json({
            message: "Quantity updated successfully",
            data: cart,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Remove Item
const removeCartItem = async (req, res) => {
    try {
        const cart = await Cart.findOne();

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
            });
        }

        cart.cartItems = cart.cartItems.filter(
            (item) => item.product.toString() !== req.params.productId
        );

        cart.totalPrice = cart.cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        await cart.save();

        res.status(200).json({
            message: "Item removed successfully",
            data: cart,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Clear Cart
const clearCart = async (req, res) => {
    try {
        await Cart.deleteMany();

        res.status(200).json({
            message: "Cart cleared successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    addItemToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart,
};