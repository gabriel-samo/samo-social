import jwt from "jsonwebtoken";
import config from "../config/config";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      userInfo: any;
    }
  }
}

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token!, config.jwt.secret!);
    req.userInfo = decoded;
    next();
  } catch (error: any) {
    next(res.json(error.message));
  }
};
