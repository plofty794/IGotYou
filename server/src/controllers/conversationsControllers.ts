import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Conversations from "../models/Conversations";

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
      .populate("participants senderID lastMessage replies")
      .exec();

    res.status(200).json({ userConversations });
  } catch (error) {
    next(error);
  }
};

export const createConversation: RequestHandler = async (req, res, next) => {
  const id = req.cookies["_&!d"];
  const { receiverID } = req.body;
  try {
    if (!id) {
      res.clearCookie("_&!d");
      throw createHttpError(
        400,
        "A _id cookie is required to access this resource."
      );
    }

    const conversationExist = await Conversations.findOne({
      participants: {
        $all: [id, receiverID],
      },
    })
      .populate("participants senderID lastMessage replies")
      .exec();

    if (conversationExist) {
      return res.status(200).json({ conversationExist: [conversationExist] });
    }

    const newConversation = await Conversations.create({
      participants: [id, receiverID],
    });

    res.status(201).json({ newConversation });
  } catch (error) {
    next(error);
  }
};
