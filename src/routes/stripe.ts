import dotenv from 'dotenv'
dotenv.config()

import { Router } from 'express';

const stripeRoute = Router();

const stripe = require('stripe')(process.env.STRIPE_KEY_SECRET)

stripeRoute.post('/payment', (request, response) => {
  stripe.charges.create({
    source: request.body.tokenId,
    amount: request.body.amount,
    currency: 'usd',
  }, (stripeError: { message: any; }, stripeResponse: any) => {
    if (stripeError) {
      return response.status(500).json(stripeError);
    } else {
      return response.status(200).json(stripeResponse)
    }
  });
});

export { stripeRoute };