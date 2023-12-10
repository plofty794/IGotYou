import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Conversations from "../models/Conversations";
import Users from "../models/Users";

export const getCurrentUserConversations: RequestHandler = async (
  req,
  res,
  next
) => {
  const id = req.cookies["_&!d"];
  try {
    if (!id) {
      res.clearCookie("_&!d");
      throw createHttpError(
        400,
        "A _id cookie is required to access this resource."
      );
    }

    const userConversations = await Conversations.find({
      participants: {
        $in: id,
      },
    })
      .populate([
        { path: "lastMessage" },
        { path: "replies", populate: "senderID" },
        { path: "participants", select: ["username", "_id", "photoUrl"] },
        { path: "senderID", select: ["username", "_id"] },
      ])
      .exec();

    res.status(200).json({ userConversations });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUserConversation: RequestHandler = async (
  req,
  res,
  next
) => {
  const id = req.cookies["_&!d"];
  const { conversationId } = req.params;
  try {
    if (!id) {
      res.clearCookie("_&!d");
      throw createHttpError(
        400,
        "A _id cookie is required to access this resource."
      );
    }

    const conversation = await Conversations.findById(conversationId)
      .populate([
        { path: "lastMessage" },
        { path: "replies", populate: "senderID" },
        { path: "participants", select: ["username", "_id", "photoUrl"] },
        { path: "senderID", select: ["username", "_id"] },
      ])
      .exec();

    res.status(200).json({ conversation: [conversation], currentUserID: id });
  } catch (error) {
    next(error);
  }
};

export const createConversation: RequestHandler = async (req, res, next) => {
  const id = req.cookies["_&!d"];
  const { receiverName } = req.body;
  try {
    if (!id) {
      res.clearCookie("_&!d");
      throw createHttpError(
        400,
        "A _id cookie is required to access this resource."
      );
    }

    const receiver = await Users.findOne({ username: receiverName });

    const conversationExist = await Conversations.findOne({
      participants: {
        $all: [id, receiver?._id],
      },
    })
      .populate([
        { path: "lastMessage" },
        { path: "replies", populate: "senderID" },
        { path: "participants", select: ["username", "_id", "photoUrl"] },
        { path: "senderID", select: ["username", "_id"] },
      ])
      .exec();

    if (conversationExist) {
      return res.status(400).json({ conversationExist: [conversationExist] });
    }

    const newConversation = await Conversations.create({
      participants: [id, receiver?._id],
    });

    res.status(201).json({ newConversation: [newConversation] });
  } catch (error) {
    next(error);
  }
};
