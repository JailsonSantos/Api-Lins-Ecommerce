import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// const verifyTokenE = async (req: Request, res: Response, next: NextFunction): Promise<Response> => { }

const verifyToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, String(process.env.JWT_SECRET), (err: any, user: any) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;

      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req: any, res: any, next: any) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (request: any, response: any, next: any) => {
  verifyToken(request, response, () => {

    console.log('USER: ', request.user?.isAdmin);

    if (request.user.isAdmin) {
      next();
    } else {
      response.status(403).json("You are not allowed to do that!")
    }
  });
}

export { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization };

/* 
const verifyToken = (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.token;

  if (authHeader) {
    const token = authHeader.slice(7);

    if (typeof token === 'string') {

      jwt.verify(token, String(process.env.JWT_SECRET), (error: any, user: any) => {
        if (error) {
          response.status(403).json("Token is not valid!");
        } else {
          // console.log("OKKKK: ", user)
          //request = user;
          next();
        }
      })
    }

  } else {
    return response.status(401).json('You are not authenticated!')
  }
};

const verifyTokenAndAuthorization = (request: Request, response: Response, next: NextFunction) => {

  verifyToken(request, response, () => {

    if (request.params.id) {
      next();
    } else {
      response.status(403).json('Yu are not allowed to do that!');
    }
  });
};
 */