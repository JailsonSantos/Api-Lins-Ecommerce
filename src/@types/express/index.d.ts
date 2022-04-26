import 'express'

interface IRequest {
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  _doc?: any;
}

declare module 'express' {
  export interface Request {
    user?: IRequest
  }
}