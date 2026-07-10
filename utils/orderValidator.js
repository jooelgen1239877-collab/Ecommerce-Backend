const { check } = require("express-validator");
const mongoose = require("mongoose");
const validatorMiddleware = require("../middleware/validatorMiddleware");

exports.createOrderValidator = [
    check("paymentMethod")
        .optional()
        .isIn(["cash", "card"])
        .withMessage("Payment method must be cash or card"),

    validatorMiddleware,
];

exports.getOrderValidator = [
    check("id")
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error("Invalid Order ID");
            }
            return true;
        }),

    validatorMiddleware,
];

exports.updateOrderValidator = [
    check("id")
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error("Invalid Order ID");
            }
            return true;
        }),

    validatorMiddleware,
];