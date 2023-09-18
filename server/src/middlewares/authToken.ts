import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/verifyAccessToken";
import createHttpError from "http-errors";

export const authToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers["authorization"]?.split(" ")[1];
  console.log(accessToken);
  if (!accessToken) {
    return next(createHttpError(400, "Token is required"));
  }
  const decodedToken = await verifyAccessToken(accessToken);
  if (typeof decodedToken == "string") {
    return next(createHttpError(401, decodedToken));
  }
  console.log(decodedToken);
  req.token.decodedToken = decodedToken;
  next();
};
