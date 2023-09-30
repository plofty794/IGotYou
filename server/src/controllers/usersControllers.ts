import { isValidObjectId } from "mongoose";
import { RequestHandler } from "express";
import Users from "../models/Users";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { DecodedIdToken } from "firebase-admin/auth";

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await Users.find({});
    if (!users.length) {
      throw createHttpError(400, "No accounts found.");
    }
    const accounts = users.map((user) => ({
      username: user.username,
      email: { email: user.email, isVerified: user.email_verified },
      isHost: user.hostStatus,
      mobilePhone: {
        contact: user.mobile_phone,
        isVerified: user.mobile_verified,
      },
    }));
    res.status(200).json({ accounts });
  } catch (error) {
    next(error);
  }
};

export const getUserProfile: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Users.findById(id);
    if (!user) {
      throw createHttpError(400, "No account with that id");
    }
    const {
      email,
      username,
      hostStatus,
      address,
      funFact,
      school,
      work,
      email_verified,
      mobile_verified,
      mobile_phone,
    } = user;
    res.status(200).json({
      email,
      username,
      hostStatus,
      address,
      funFact,
      school,
      work,
      email_verified,
      mobile_verified,
      mobile_phone,
    });
  } catch (error) {
    next(error);
  }
};

type TCreateUser = {
  username?: string;
  email?: string;
  password?: string;
};

export const createUser: RequestHandler = async (req, res, next) => {
  const { email }: TCreateUser = req.body;
  try {
    const userExist = await Users.findOne({ email }).select("+username").exec();
    if (userExist) {
      throw createHttpError(400, "Username/Email already exist");
    }
    const newUser = await Users.create({ ...req.body });
    const { _id, username } = newUser;
    res.status(201).json({ user: { _id, username } });
  } catch (error) {
    next(error);
  }
};

type TUserLogIn = {
  email?: string;
  password?: string;
};

export const logInUser: RequestHandler = async (req, res, next) => {
  const { email, password }: TUserLogIn = req.body;
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      throw createHttpError(400, "Email doesn't exist");
    }
    const correctPassword = await bcrypt.compare(password!, user.password);
    if (!correctPassword) {
      throw createHttpError(400, "Incorrect password");
    }
    const { _id, username } = user;
    res.status(200).json({ user: { _id, username } });
  } catch (error) {
    next(error);
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Users.findByIdAndUpdate(id, { ...req.body });
    if (!user) {
      throw createHttpError(400, "Error updating user");
    }
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

export const logOutUser: RequestHandler = async (req, res, next) => {
  try {
    res.status(200).json({ message: "User has been logged out" });
  } catch (error) {
    next(error);
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id)) {
      throw createHttpError(401, "Invalid userID");
    }
    const user = await Users.findByIdAndDelete(id);
    if (!user) {
      throw createHttpError(400, "User doesn't exist");
    }
    res.status(201).json({ message: "User has been removed" });
  } catch (error) {
    next(error);
  }
};

// declare module "express-serve-static-core" {
//   interface Request {
//     ipinfo?: {};
//     user?: {};
//     token: { decodedToken: DecodedIdToken };
//   }
// }
