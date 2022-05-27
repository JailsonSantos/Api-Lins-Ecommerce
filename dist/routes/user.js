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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const verifyToken_1 = require("../middleware/verifyToken");
const userRoute = (0, express_1.Router)();
exports.userRoute = userRoute;
const crypto_js_1 = __importDefault(require("crypto-js"));
const User_1 = require("../models/User");
// UPDATE
userRoute.put('/:id', verifyToken_1.verifyTokenAndAuthorization, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (request.body.password) {
        request.body.password = crypto_js_1.default.AES.encrypt(request.body.password, String(process.env.PASS_SECRET)).toString();
    }
    try {
        const updatedUser = yield User_1.User.findByIdAndUpdate(request.params.id, { $set: request.body }, { new: true });
        return response.status(200).json(updatedUser);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// DELETE
userRoute.delete('/:id', verifyToken_1.verifyTokenAndAuthorization, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.User.findByIdAndDelete(request.params.id);
        return response.status(200).json('User has been deleted...');
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// GET USER
userRoute.get('/find/:id', verifyToken_1.verifyTokenAndAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findById(request.params.id);
        if (user) {
            const _a = user._doc, { password } = _a, others = __rest(_a, ["password"]);
            return response.status(200).json(others);
        }
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// GET ALL USERS
userRoute.get('/', verifyToken_1.verifyTokenAndAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const query = request.query.new;
    try {
        const users = query
            ? yield User_1.User.find().sort({ _id: -1 }).limit(5)
            : yield User_1.User.find();
        return response.status(200).json(users);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
// GET USERS STATISTICS
userRoute.get('/statistics', verifyToken_1.verifyTokenAndAdmin, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = yield User_1.User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            { $project: { month: { $month: '$createdAt' } } },
            { $group: { _id: '$month', total: { $sum: 1 } } },
        ]);
        return response.status(200).json(data);
    }
    catch (error) {
        return response.status(500).json(error);
    }
}));
//# sourceMappingURL=user.js.map