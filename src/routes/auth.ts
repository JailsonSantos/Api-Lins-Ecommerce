import { Router, Request, Response } from 'express';
import { User } from '../models/User'
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
const authRoute = Router();

// REGISTER
authRoute.post("/register", async (request: Request, response: Response) => {
  const newUser = new User({
    username: request.body.username,
    email: request.body.email.toLowerCase(),
    password: CryptoJS.AES.encrypt(request.body.password, String(process.env.PASS_SECRET)),
    occupation: request.body.occupation.toLowerCase(),
    img: request.body.img,
    isAdmin: request.body.isAdmin,
  });

  try {
    const savedUser = await newUser.save();

    return response.status(201).json(savedUser);

  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// LOGIN
authRoute.post("/login", async (request: Request, response: Response) => {

  try {
    const user = await User.findOne({ username: request.body.username });

    if (!user) {
      return response.status(404).json('Wrong credentials!');
    }

    if (user) {
      const hashedPassword = CryptoJS.AES.decrypt(user.password, String(process.env.PASS_SECRET));

      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      if (OriginalPassword !== request.body.password) {
        return response.status(401).json('Wrong credentials!');
      }

      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin
        },
        String(process.env.JWT_SECRET),
        { expiresIn: "3d" }
      );

      const { password, ...others } = user._doc;

      return response.status(200).json({ ...others, accessToken });
    }

  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

export { authRoute };
