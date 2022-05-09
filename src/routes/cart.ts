import { Router, Request, Response } from 'express';
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization
} from '../middleware/verifyToken';

const cartRoute = Router();

import { Cart } from '../models/Cart'

// CREATE
cartRoute.post('/', verifyToken, async (request: Request, response: Response) => {
  const newCart = new Cart(request.body);

  try {
    const savedCart = await newCart.save();
    return response.status(200).json(savedCart);
  } catch (error) {
    return response.status(500).json(error);
  }
});

// UPDATE
cartRoute.put('/:id', verifyTokenAndAuthorization, async (request: Request, response: Response) => {

  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      request.params.id,
      { $set: request.body },
      { new: true }
    );

    return response.status(200).json(updatedCart);

  } catch (error) {
    return response.status(500).json(error);
  }
});

// DELETE
cartRoute.delete('/:id', verifyTokenAndAuthorization, async (request: Request, response: Response) => {
  try {
    await Cart.findByIdAndDelete(request.params.id);
    return response.status(200).json('Cart has been deleted...');
  } catch (error) {
    return response.status(500).json(error);
  }
});

// GET USER CART
cartRoute.get("/find/:userId", verifyTokenAndAuthorization, async (request: Request, response: Response) => {
  try {
    const cart = await Cart.find({ userId: request.params.userId });
    return response.status(200).json(cart);
  } catch (err) {
    return response.status(500).json(err);
  }
});

// GET ALL
cartRoute.get('/', verifyTokenAndAdmin, async (request: Request, response: Response) => {
  try {
    const carts = await Cart.find();
    return response.status(200).json(carts);

  } catch (error) {
    return response.status(500).json(error);
  }
});

export { cartRoute };
