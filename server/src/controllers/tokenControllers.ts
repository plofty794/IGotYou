import { RequestHandler } from "express";

export const verifyToken: RequestHandler = (req, res, next) => {
  res.send(req.body);
};
