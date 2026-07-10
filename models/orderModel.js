const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        cartItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },

                quantity: {
                    type: Number,
                    required: true,
                },

                price: {
                    type: Number,
                    required: true,
                },
            },
        ],

        totalOrderPrice: {
            type: Number,
            required: true,
        },

        paymentMethod: {
            type: String,
            enum: ["cash", "card"],
            default: "cash",
        },

        isPaid: {
            type: Boolean,
            default: false,
        },

        paidAt: Date,

        isDelivered: {
            type: Boolean,
            default: false,
        },

        deliveredAt: Date,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema);