"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoute = void 0;
const express_1 = require("express");
const verifyToken_1 = require("../middleware/verifyToken");
const orderRoute = (0, express_1.Router)();
exports.orderRoute = orderRoute;
const Order_1 = require("../models/Order");
// CREATE
orderRoute.post('/', verifyToken_1.verifyToken, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const newOrder = new Order_1.Order(request.body);
    try {
        const savedOrder = yield newOrder.save();
        return response.status(200).json(savedOrder);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// UPDATE
orderRoute.put('/:id', verifyToken_1.verifyTokenAndAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedOrder = yield Order_1.Order.findByIdAndUpdate(request.params.id, { $set: request.body }, { new: true });
        return response.status(200).json(updatedOrder);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// DELETE
orderRoute.delete('/:id', verifyToken_1.verifyTokenAndAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Order_1.Order.findByIdAndDelete(request.params.id);
        return response.status(200).json('Order has been deleted...');
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// GET USER ORDER
orderRoute.get("/find/:userId", verifyToken_1.verifyTokenAndAuthorization, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.Order.find({ userId: request.params.userId });
        return response.status(200).json(orders);
    }
    catch (err) {
        return response.status(500).json(err);
    }
}));
// GET ALL
orderRoute.get('/', verifyToken_1.verifyTokenAndAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.Order.find();
        return response.status(200).json(orders);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// GET MONTHLY INCOME
orderRoute.get("/income", verifyToken_1.verifyTokenAndAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    //  const productId = request.query.idProduct;
    //  console.log("ID DO PRODUTO: ", productId);
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    try {
        const income = yield Order_1.Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                    // ...(productId !== undefined && { products: { $elemMatch: { productId } } })
                }
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        return response.status(200).json(income);
    }
    catch (err) {
        return response.status(500).json(err);
    }
}));
//# sourceMappingURL=order.js.map