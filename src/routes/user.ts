import { Router, Request, Response } from 'express';
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from '../middleware/verifyToken';

const userRoute = Router();

import CryptoJS from 'crypto-js';
import { User } from '../models/User'

// UPDATE
userRoute.put('/:id', verifyTokenAndAuthorization, async (request: Request, response: Response) => {

  if (request.body.password) {
    request.body.password = CryptoJS.AES.encrypt(
      request.body.password,
      String(process.env.PASS_SECRET)
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      request.params.id,
      { $set: request.body },
      { new: true }
    );

    return response.status(200).json(updatedUser);

  } catch (error) {
    return response.status(500).json(error);
  }
});

// DELETE
userRoute.delete('/:id', verifyTokenAndAuthorization, async (request: Request, response: Response) => {
  try {
    await User.findByIdAndDelete(request.params.id);
    return response.status(200).json('User has been deleted...');
  } catch (error) {
    return response.status(500).json(error);
  }
});

// GET USER
userRoute.get('/find/:id', verifyTokenAndAdmin, async (request: Request, response: Response) => {
  try {
    const user = await User.findById(request.params.id);

    if (user) {
      const { password, ...others } = user._doc;
      return response.status(200).json(others);
    }

  } catch (error) {
    return response.status(500).json(error);
  }
});

// GET ALL USERS
userRoute.get('/', verifyTokenAndAdmin, async (request: Request, response: Response) => {
  const query = request.query.new;

  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();

    return response.status(200).json(users);

  } catch (error) {
    return response.status(500).json(error);
  }
});

// GET USERS STATISTICS
userRoute.get('/statistics', verifyTokenAndAdmin, async (request: Request, response: Response) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate(
      [
        { $match: { createdAt: { $gte: lastYear } } },
        { $project: { month: { $month: '$createdAt' } } },
        { $group: { _id: '$month', total: { $sum: 1 } } },
      ]
    );

    return response.status(200).json(data);

  } catch (error) {
    return response.status(500).json(error);
  }
});

export { userRoute };

