import { RequestHandler } from "express";
import Admin from "../models/Admin";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

export const getAdmin: RequestHandler = async (req, res, next) => {
  try {
    const admin = await Admin.find({});
    res.status(200).json({ admin });
  } catch (error) {
    next(error);
  }
};

export const loginAdmin: RequestHandler = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const adminExist = await Admin.findOne({ username });
    if (!adminExist) {
      throw createHttpError(400, "Invalid admin credentials");
    }
    const passwordCorrect = await bcrypt.compare(password, adminExist.password);
    if (!passwordCorrect) {
      throw createHttpError(400, "Invalid admin credentials");
    }
    res.status(200).json({ adminExist });
  } catch (error) {
    next(error);
  }
};
