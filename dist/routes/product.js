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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = require("express");
const verifyToken_1 = require("../middleware/verifyToken");
const productRoute = (0, express_1.Router)();
exports.productRoute = productRoute;
const Product_1 = require("../models/Product");
// CREATE
productRoute.post('/', verifyToken_1.verifyTokenAndAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = new Product_1.Product(request.body);
    try {
        const savedProduct = yield newProduct.save();
        return response.status(200).json(savedProduct);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// UPDATE
productRoute.put('/:id', verifyToken_1.verifyTokenAndAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProduct = yield Product_1.Product.findByIdAndUpdate(request.params.id, { $set: request.body }, { new: true });
        return response.status(200).json(updatedProduct);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// DELETE
productRoute.delete('/:id', verifyToken_1.verifyTokenAndAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Product_1.Product.findByIdAndDelete(request.params.id);
        return response.status(200).json('Product has been deleted...');
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// GET
productRoute.get('/find/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.Product.findById(request.params.id);
        if (product) {
            const _a = product._doc, { password } = _a, others = __rest(_a, ["password"]);
            return response.status(200).json(others);
        }
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// GET ALL
productRoute.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const qNew = request.query.new;
    const qCategory = request.query.category;
    try {
        let products;
        if (qNew) {
            products = yield Product_1.Product.find().sort({ createdAt: -1 }).limit(1);
        }
        else if (qCategory) {
            products = yield Product_1.Product.find({
                categories: {
                    $in: [qCategory],
                },
            });
        }
        else {
            products = yield Product_1.Product.find();
        }
        return response.status(200).json(products);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
//# sourceMappingURL=product.js.map