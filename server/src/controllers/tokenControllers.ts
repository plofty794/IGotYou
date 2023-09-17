import { RequestHandler } from "express";
import { verifyAccessToken } from "../utils/verifyAccessToken";
import createHttpError from "http-errors";

export const verifyToken: RequestHandler = async (req, res, next) => {
  const accessToken = req.headers["authorization"]?.split(" ")[1];
  try {
    if (!accessToken) {
      throw createHttpError(400, "Token is required");
    }
    const decodedToken = await verifyAccessToken(accessToken);
    if (typeof decodedToken == "string") {
      throw createHttpError(401, decodedToken);
    }
    res.json({ decodedToken });
  } catch (error) {
    next(error);
  }
};
