import { Router, Request, Response } from 'express';

const apiRoute = Router();

// Home API
apiRoute.get('/', (request: Request, response: Response) => {
  return response.status(200).json({ "Status": "200", "Message": "Success!" });
});

export { apiRoute };
