import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { postcodeValidator } from "postcode-validator";
import Users from "../models/Users";

type TUserUpdates = {
  address?: string;
  school?: string;
  work?: string;
  funFact?: string;
  mobilePhone?: string;
};

export const verifyUserUpdates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { address, mobilePhone }: TUserUpdates = req.body;
  // const postcode = address?.match(/\d{4}/g)?.join("");
  // const country_code = address?.match(/[A-Z]+$/g)?.join("");

  // const validPostCode = postcodeValidator(postcode!, country_code!);
  // if (!validPostCode) {
  //   return next(createHttpError(400, "Invalid zip code"));
  // }

  if (mobilePhone) {
    const mobilePhoneTaken = await Users.findOne({ mobilePhone });

    if (mobilePhoneTaken) {
      return next(createHttpError(400, "Mobile phone already taken"));
    }
  }
  next();
};
