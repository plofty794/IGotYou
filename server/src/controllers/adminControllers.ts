import { RequestHandler } from "express";
import Admin from "../models/Admin";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import Users from "../models/Users";

export const getActiveUsers: RequestHandler = async (req, res, next) => {
  const admin_id = req.headers.cookie?.split("admin_id=")[1];
  try {
    if (!admin_id) {
      throw createHttpError(401, "This action requires an identifier");
    }
    const activeUsers = await Users.find({
      $where: function () {
        return (
          this.subscriptionStatus === "active" ||
          this.subscriptionStatus === "pending"
        );
      },
    });
    if (!activeUsers) {
      return res.status(200).json({ activeUsers: [] });
    }
    res.status(200).json({ activeUsers });
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
    res.cookie("admin_id", adminExist._id.toString());
    res.status(200).json({ adminExist });
  } catch (error) {
    next(error);
  }
};
