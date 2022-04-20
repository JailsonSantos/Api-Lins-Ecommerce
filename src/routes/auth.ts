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
  });

  try {
    const savedUser = await newUser.save();
    response.status(201).json(savedUser);
  } catch (error) {
    response.status(500).json(error);
  }
});

// LOGIN
authRoute.post("/login", async (request: Request, response: Response) => {

  //const userNameFormatted = (request.body.username).toLowerCase()

  try {
    const user = await User.findOne({ username: request.body.username });
    !user && response.status(401).json('Wrong credentials!')

    if (user) {
      const hashedPassword = CryptoJS.AES.decrypt(user.password, String(process.env.PASS_SECRET));

      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      OriginalPassword !== request.body.password && response.status(401).json('Wrong credentials!');

      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin
        },
        String(process.env.JWT_SECRET),
        { expiresIn: "3d" }
      );

      const { password, ...others } = user._doc;
      response.status(200).json({ ...others, accessToken });

    /*   const { password, ...rest } = user._doc; //não Deu certo
      const { _id, username, email, isAdmin, createdAt, updatedAt } = user;
      const UserFormatted = { _id, username, email, isAdmin, createdAt, updatedAt, accessToken }
      response.status(200).json(UserFormatted);
   */  }

  } catch (error) {
    response.status(500).json(error);
  }
});

export { authRoute };
