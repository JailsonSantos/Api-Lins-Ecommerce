"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeRoute = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = require("express");
const stripeRoute = (0, express_1.Router)();
exports.stripeRoute = stripeRoute;
const stripe = require('stripe')(process.env.STRIPE_KEY_SECRET);
stripeRoute.post('/payment', (request, response) => {
    stripe.charges.create({
        source: request.body.tokenId,
        amount: request.body.amount,
        currency: 'usd',
    }, (stripeError, stripeResponse) => {
        if (stripeError) {
            return response.status(500).json(stripeError);
        }
        else {
            return response.status(200).json(stripeResponse);
        }
    });
});
//# sourceMappingURL=stripe.js.map