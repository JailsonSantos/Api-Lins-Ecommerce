import dotenv from 'dotenv'
dotenv.config()


import { Router, Response, Request } from 'express';

const stripeRoute = Router();

console.log('CHAVE STRIPE: ', process.env.STRIPE_KEY_SECRET)
/* 

console.log('PASS_SECRET: ', String(process.env.PASS_SECRET))
const k_stripe = "sk_test_51KsYb0K8tmpXblZ8KahaNnXOQPUPdVGQQb6QRD6Aya5pbvtMdDKcCfZKZmkXh6gIPvpf7d30F8wuS7vzTXqmYbcD001dIIQ6aD"
 */

//KEY_PRIVATE = sk_test_51KsYb0K8tmpXblZ8KahaNnXOQPUPdVGQQb6QRD6Aya5pbvtMdDKcCfZKZmkXh6gIPvpf7d30F8wuS7vzTXqmYbcD001dIIQ6aD

const stripe = require('stripe')('sk_test_51KsYb0K8tmpXblZ8KahaNnXOQPUPdVGQQb6QRD6Aya5pbvtMdDKcCfZKZmkXh6gIPvpf7d30F8wuS7vzTXqmYbcD001dIIQ6aD')


stripeRoute.post('/payment', (request, response) => {
  stripe.charges.create({
    source: request.body.tokenId,
    amount: request.body.amount,
    currency: 'usd',
  }, (stripeError: { message: any; }, stripeResponse: any) => {
    if (stripeError) {

      console.log("ERROR Backend: ", stripeError.message);

      response.status(500).json(stripeError);
    } else {

      console.log("SUCESSO Backend: ", stripeResponse);

      response.status(200).json(stripeResponse)
    }
  });
});

export { stripeRoute };


/*   const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://localhost:3000/success',
    cancel_url: 'https://localhost:3000/cancel',
  });

  res.redirect(303, session.url); */


/* 

/* import stripe from 'react-stripe-checkout';

//import stripe from 'react-stripe-checkout';
//const stripe = require('react-stripe-checkout')

stripe.String(process.env.STRIPE_KEY_SECRET);

stripeRoute.post('/payment', (request: Request, response: Response) => {
  stripe.charges.create({
    source: request.body.tokenId,
    amount: request.body.amount,
    currency: 'usd',
  }, (stripeError: any, stripeResponse: any) => {
    if (stripeError) {
      response.status(500).json(stripeError);
    } else {
      response.status(200).json(stripeResponse)
    }
  });
}); 

*/


/* 
const express = require('express');
const stripeRoute = express();
const stripe = require('stripe')('sk_test_51KWi1vEGOfPUfWB8OaCaEbfc6Oxhg1sRSEnzfKa8eIVhMjYMlMuJSx5InCIvFeMaKK5gLxmDhvJ1oy2d2TeQvuj400zhd9TUoN')

stripeRoute.post('/create-checkout-session', async (req: any, res: any) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  });

  res.redirect(303, session.url);
});

export { stripeRoute };

stripeRoute.listen(4242, () => console.log(`Listening on port ${4242}!`));


*/