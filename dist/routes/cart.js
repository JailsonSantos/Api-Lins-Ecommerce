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
exports.cartRoute = void 0;
const express_1 = require("express");
const verifyToken_1 = require("../middleware/verifyToken");
const cartRoute = (0, express_1.Router)();
exports.cartRoute = cartRoute;
const Cart_1 = require("../models/Cart");
// CREATE
cartRoute.post('/', verifyToken_1.verifyToken, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const newCart = new Cart_1.Cart(request.body);
    try {
        const savedCart = yield newCart.save();
        return response.status(200).json(savedCart);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// UPDATE
cartRoute.put('/:id', verifyToken_1.verifyTokenAndAuthorization, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCart = yield Cart_1.Cart.findByIdAndUpdate(request.params.id, { $set: request.body }, { new: true });
        return response.status(200).json(updatedCart);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// DELETE
cartRoute.delete('/:id', verifyToken_1.verifyTokenAndAuthorization, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Cart_1.Cart.findByIdAndDelete(request.params.id);
        return response.status(200).json('Cart has been deleted...');
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// GET USER CART
cartRoute.get("/find/:userId", verifyToken_1.verifyTokenAndAuthorization, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield Cart_1.Cart.find({ userId: request.params.userId });
        return response.status(200).json(cart);
    }
    catch (err) {
        return response.status(500).json(err);
    }
}));
// GET ALL
cartRoute.get('/', verifyToken_1.verifyTokenAndAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carts = yield Cart_1.Cart.find();
        return response.status(200).json(carts);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
//# sourceMappingURL=cart.js.map