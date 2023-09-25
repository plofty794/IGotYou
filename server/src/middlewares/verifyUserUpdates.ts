import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { postcodeValidator } from "postcode-validator";

type TUserUpdates = {
  address?: string;
  school?: string;
  work?: string;
  funFact: string;
};

export const verifyUserUpdates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { address, school, work, funFact }: TUserUpdates = req.body;
  const postcode = address?.match(/\d{4}/g)?.join("");
  const country_code = address?.match(/[A-Z]+$/g)?.join("");

  if (!postcode || !country_code) {
    return next(createHttpError(400, "Incomplete address"));
  }
  const validPostCode = postcodeValidator(postcode, country_code);
  if (!validPostCode) {
    return next(createHttpError(400, "Invalid zip code"));
  }
  next();
};
