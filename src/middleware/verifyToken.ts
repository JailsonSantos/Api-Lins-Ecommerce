import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// const verifyTokenE = async (req: Request, res: Response, next: NextFunction): Promise<Response> => { }

const verifyToken = (request: any, response: any, next: any) => {
  const authHeader = request.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, String(process.env.JWT_SECRET), (err: any, user: any) => {
      if (err) {
        return response.status(403).json("Token is not valid!");
      }
      request.user = user;
      next();
    });
  } else {
    return response.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (request: any, response: any, next: any) => {
  verifyToken(request, response, () => {
    if (request.user.id === request.params.id || request.user.isAdmin) {
      next();
    } else {
      return response.status(403).json("You are not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (request: any, response: any, next: any) => {
  verifyToken(request, response, () => {

    if (request.user.isAdmin) {
      next();
    } else {
      return response.status(403).json("You are not allowed to do that!");
    }
  });
}

export { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization };