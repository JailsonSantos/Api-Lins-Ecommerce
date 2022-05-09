import { Router, Request, Response } from 'express';
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization
} from '../middleware/verifyToken';

const orderRoute = Router();

import { Order } from '../models/Order'

// CREATE
orderRoute.post('/', verifyToken, async (request: Request, response: Response) => {

  const newOrder = new Order(request.body);

  try {
    const savedOrder = await newOrder.save();
    return response.status(200).json(savedOrder);
  } catch (error) {
    return response.status(500).json(error);
  }
});

// UPDATE
orderRoute.put('/:id', verifyTokenAndAdmin, async (request: Request, response: Response) => {

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      request.params.id,
      { $set: request.body },
      { new: true }
    );

    return response.status(200).json(updatedOrder);

  } catch (error) {
    return response.status(500).json(error);
  }
});

// DELETE
orderRoute.delete('/:id', verifyTokenAndAdmin, async (request: Request, response: Response) => {
  try {
    await Order.findByIdAndDelete(request.params.id);
    return response.status(200).json('Order has been deleted...');
  } catch (error) {
    return response.status(500).json(error);
  }
});

// GET USER ORDER
orderRoute.get("/find/:userId", verifyTokenAndAuthorization, async (request: Request, response: Response) => {
  try {
    const orders = await Order.find({ userId: request.params.userId });
    return response.status(200).json(orders);
  } catch (err) {
    return response.status(500).json(err);
  }
});

// GET ALL
orderRoute.get('/', verifyTokenAndAdmin, async (request: Request, response: Response) => {
  try {
    const orders = await Order.find();
    return response.status(200).json(orders);

  } catch (error) {
    return response.status(500).json(error);
  }
});

// GET MONTHLY INCOME
orderRoute.get("/income", verifyTokenAndAdmin, async (request: Request, response: Response) => {

  //  const productId = request.query.idProduct;
  //  console.log("ID DO PRODUTO: ", productId);

  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
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

  } catch (err) {
    return response.status(500).json(err);
  }
});

export { orderRoute };
