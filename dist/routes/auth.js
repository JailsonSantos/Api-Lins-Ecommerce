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
exports.authRoute = void 0;
const express_1 = require("express");
const User_1 = require("../models/User");
const crypto_js_1 = __importDefault(require("crypto-js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authRoute = (0, express_1.Router)();
exports.authRoute = authRoute;
// REGISTER
authRoute.post("/register", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new User_1.User({
        username: request.body.username,
        email: request.body.email.toLowerCase(),
        password: crypto_js_1.default.AES.encrypt(request.body.password, String(process.env.PASS_SECRET)),
        occupation: request.body.occupation.toLowerCase(),
        img: request.body.img,
        isAdmin: request.body.isAdmin,
    });
    try {
        const savedUser = yield newUser.save();
        return response.status(201).json(savedUser);
    }
    catch (error) {
        return response.status(500).json("Usuário ou E-mail já foram cadastrados");
    }
}));
// LOGIN
authRoute.post("/login", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOne({ username: request.body.username });
        if (!user) {
            return response.status(404).json('Wrong credentials!');
        }
        if (user) {
            const hashedPassword = crypto_js_1.default.AES.decrypt(user.password, String(process.env.PASS_SECRET));
            const OriginalPassword = hashedPassword.toString(crypto_js_1.default.enc.Utf8);
            if (OriginalPassword !== request.body.password) {
                return response.status(401).json('Wrong credentials!');
            }
            const accessToken = jsonwebtoken_1.default.sign({
                id: user._id,
                isAdmin: user.isAdmin
            }, String(process.env.JWT_SECRET), { expiresIn: "3d" });
            const _a = user._doc, { password } = _a, others = __rest(_a, ["password"]);
            return response.status(200).json(Object.assign(Object.assign({}, others), { accessToken }));
        }
    }
    catch (error) {
        return response.status(500).json(error.message);
    }
}));
//# sourceMappingURL=auth.js.map