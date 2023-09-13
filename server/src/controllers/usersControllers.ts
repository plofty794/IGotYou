import { RequestHandler } from "express";
import { Users } from "../models/Users";
import { BadRequest } from "http-errors";
import bcrypt from "bcrypt";

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await Users.find({});
    if (!users.length) {
      throw BadRequest("No users found.");
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
      throw BadRequest("Username/Email already exist");
    }
    const mobilePhoneExist = await Users.findOne({ phoneNumber });
    if (mobilePhoneExist) {
      throw BadRequest("Phone number is already taken");
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
      throw BadRequest("Email doesn't exist");
    }
    const correctPassword = await bcrypt.compare(password!, user.password);
    if (!correctPassword) {
      throw BadRequest("Incorrect password");
    }
    const { _id, username } = user;
    res.status(200).json({ user: { _id, username } });
  } catch (error) {
    next(error);
  }
};
