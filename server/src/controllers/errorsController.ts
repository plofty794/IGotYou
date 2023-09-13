import { ErrorRequestHandler } from "express";
import { isHttpError } from "http-errors";

export const errorHandler: ErrorRequestHandler = (err, req, res, __) => {
  if (isHttpError(err)) {
    return res.status(err.status).json({ error: err.message });
  }
  res.json({ error: "Unknown error occurred." });
};
