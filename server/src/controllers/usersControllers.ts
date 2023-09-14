import { isValidObjectId } from "mongoose";
import { RequestHandler } from "express";
import { Users } from "../models/Users";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await Users.find({});
    if (!users.length) {
      throw createHttpError(400, "No users found.");
    }
    const accounts = users.map((user) => ({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    }));
    res.status(200).json({ accounts });
  } catch (error) {
    next(error);
  }
};

type TCreateUser = {
  username?: string;
  email?: string;
  phoneNumber?: string;
};

export const createUser: RequestHandler = async (req, res, next) => {
  const { email, phoneNumber }: TCreateUser = req.body;
  try {
    const userExist = await Users.findOne({ email }).select("+username").exec();
    if (userExist) {
      throw createHttpError(400, "Username/Email already exist");
    }
    const mobilePhoneExist = await Users.findOne({ phoneNumber });
    if (mobilePhoneExist) {
      throw createHttpError(400, "Phone number is already taken");
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
      throw createHttpError(401, "Email doesn't exist");
    }
    const correctPassword = await bcrypt.compare(password!, user.password);
    if (!correctPassword) {
      throw createHttpError(401, "Incorrect password");
    }
    const { _id, username } = user;
    res.status(200).json({ user: { _id, username } });
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
