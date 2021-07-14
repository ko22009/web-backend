import { NextFunction, Request, Response } from "express";

module.exports = async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    if (!req.session.user_id) {
      return res.status(401).json({ error: "Не авторизованы" });
    }
    next();
  } catch (e) {
    return res.status(401).json({ error: e.message });
  }
};
