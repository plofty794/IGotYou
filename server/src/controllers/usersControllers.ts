import { isValidObjectId } from "mongoose";
import { RequestHandler } from "express";
import Users from "../models/Users";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await Users.find({
      $where: function () {
        return this.listings.length > 0 && this.hostStatus === true;
      },
    })
      .populate("listings")
      .exec();

    if (!users.length) {
      return res.status(200).json({ hosts: [] });
    }
    const hosts = users.filter(
      (user) => user.listings.length > 0 && user.subscriptionStatus === "active"
    );

    res.status(200).json({ hosts });
  } catch (error) {
    next(error);
  }
};

export const getUserPhone: RequestHandler = async (req, res, next) => {
  const id = req.headers.cookie?.split("_&!d=")[1];
  try {
    if (!id) {
      res.clearCookie("_&!d");
      throw createHttpError(400, "Unauthorized");
    }
    const user = await Users.findById(id);
    if (!user) {
      throw createHttpError(400, "No account with that id");
    }
    res.status(200).json({ user: { mobilePhone: user.mobilePhone } });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUserProfile: RequestHandler = async (req, res, next) => {
  const id = req.headers.cookie?.split("_&!d=")[1];
  try {
    if (!id) {
      res.clearCookie("_&!d");
      throw createHttpError(
        400,
        "A _id cookie is required to access this resource."
      );
    }
    const user = await Users.findById(id).populate("listings");
    if (!user) {
      res.clearCookie("_&!d");
      throw createHttpError(400, "No account with that id");
    }
    res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        emailVerified: user.emailVerified,
        hostStatus: user.hostStatus,
        photoUrl: user.photoUrl ?? null,
        mobilePhone: user.mobilePhone,
        mobileVerified: user.mobileVerified,
        listings: user.listings.length > 0 ? user.listings : null,
        uid: user.uid,
        rating: user.rating,
        reviews: user.reviews.length > 0 ? user.reviews : null,
        work: user.work,
        funFact: user.funFact,
        school: user.school,
        address: user.address,
        subscriptionStatus: user.subscriptionStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const visitUserProfile: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Users.findOne({ uid: id }).populate("listings");
    if (!user) {
      throw createHttpError(400, "No account with that id");
    }
    res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        emailVerified: user.emailVerified,
        hostStatus: user.hostStatus,
        photoUrl: user.photoUrl ?? null,
        mobilePhone: user.mobilePhone,
        mobileVerified: user.mobileVerified,
        listings: user.listings.length > 0 ? user.listings : null,
        uid: user.uid,
        rating: user.rating,
        reviews: user.reviews.length > 0 ? user.reviews : null,
        work: user.work,
        funFact: user.funFact,
        school: user.school,
        address: user.address,
        subscriptionStatus: user.subscriptionStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  const id = req.headers.cookie?.split("_&!d=")[1];
  try {
    if (!id) {
      res.clearCookie("_&!d");
      throw createHttpError(
        400,
        "A _id cookie is required to access this resource."
      );
    }
    const user = await Users.findByIdAndUpdate(id, { ...req.body });
    if (!user) {
      throw createHttpError(400, "Error updating user");
    }
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

export const checkUserEmail: RequestHandler = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email) {
      throw createHttpError(400, "No data to be processed");
    }
    const user = await Users.findOne({ email: email });
    if (!user) {
      throw createHttpError(400, "No user with that email");
    }
    res.status(200).json({ email: user.email });
  } catch (error) {
    next(error);
  }
};

export const userSubscription: RequestHandler = async (req, res, next) => {
  const id = req.headers.cookie?.split("_&!d=")[1];
  try {
    if (!id) {
      res.clearCookie("_&!d");
      throw createHttpError(
        400,
        "A _id cookie is required to access this resource."
      );
    }
    const user = await Users.findByIdAndUpdate(id, {
      ...req.body,
    });
    if (!user) {
      res.clearCookie("_&!d");
      throw createHttpError(400, "No user to mutate");
    }
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

type TCreateUser = {
  username?: string;
  email?: string;
  password?: string;
  providerId?: string;
};

export const createUser: RequestHandler = async (req, res, next) => {
  const { email }: TCreateUser = req.body;
  try {
    const userExist = await Users.findOne({ email }).select("+username").exec();
    if (userExist) {
      throw createHttpError(400, "Username/Email already exist");
    }
    const newUser = await Users.create({ ...req.body });
    const { _id, username, uid } = newUser;
    res.cookie("_&!d", newUser._id.toString(), { httpOnly: true });
    res.status(201).json({ user: { _id, username, uid } });
  } catch (error) {
    next(error);
  }
};

type TUserLogIn = {
  email?: string;
  password?: string;
  providerID: string;
};

export const logInUser: RequestHandler = async (req, res, next) => {
  const { email, password, providerID }: TUserLogIn = req.body;
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      throw createHttpError(400, "Email doesn't exist");
    }
    if (providerID === "password" && password != null) {
      const correctPassword = await bcrypt.compare(password, user.password!);
      if (!correctPassword) {
        throw createHttpError(400, "Incorrect password");
      }
    }
    res.cookie("_&!d", user._id.toString(), { httpOnly: true });
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

type TGoogleSignIn = {
  username: string;
  email: string;
  providerId: string;
  emailVerified: boolean;
};

export const googleSignIn: RequestHandler = async (req, res, next) => {
  const { email }: TGoogleSignIn = req.body;
  try {
    const userExist = await Users.findOne({ email });
    if (userExist) {
      res.cookie("_&!d", userExist._id.toString(), { httpOnly: true });
      return res.status(200).json({
        user: {
          _id: userExist._id,
          username: userExist.username,
          uid: userExist.uid,
        },
      });
    }
    const newUser = await Users.create({ ...req.body });

    res.cookie("_&!d", newUser._id.toString(), { httpOnly: true });
    res
      .status(201)
      .json({ user: { _id: newUser._id, username: newUser.username } });
  } catch (error) {
    next(error);
  }
};

export const logOutUser: RequestHandler = async (req, res, next) => {
  const id = req.headers.cookie?.split("_&!d=")[1];
  try {
    if (!id) {
      res.clearCookie("_&!d");
      throw createHttpError(
        400,
        "A _id cookie is required to access this resource."
      );
    }
    const userExist = await Users.findById(id);
    if (!userExist) {
      throw createHttpError(400, "No user with that id");
    }
    res.clearCookie("_&!d", { httpOnly: true });
    res.status(200).json({ message: "User has been logged out" });
  } catch (error) {
    next(error);
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  console.log(req.cookies);
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
