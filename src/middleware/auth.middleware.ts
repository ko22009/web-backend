import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");

interface IUserRequest extends Request {
  user: any;
}

module.exports = (req: IUserRequest, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Не авторизованы" });
    }
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    return res.status(401).json({ error: "Не авторизованы" });
  }
};
