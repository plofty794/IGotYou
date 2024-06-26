import { Schema, InferSchemaType, model, Types } from "mongoose";
import env from "../utils/envalid";
import bcrypt from "bcrypt";

const usersSchema = new Schema(
  {
    providerId: {
      type: String,
    },
    //User Details
    username: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    password: {
      type: String,
    },
    identityVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    mobileVerified: {
      type: Boolean,
      default: false,
    },
    mobilePhone: {
      type: String,
    },
    address: {
      type: String,
      trim: true,
    },
    educationalAttainment: {
      type: String,
      enum: [
        "high school diploma",
        "associate's degree",
        "bachelor's degree",
        "master's degree",
        "doctorate",
        "professional license",
        "no formal education",
        "",
      ],
    },
    funFact: {
      type: String,
      trim: true,
    },
    work: {
      type: String,
      trim: true,
    },
    photoUrl: {
      type: String,
    },
    // Host details
    uid: {
      type: String,
      required: true,
    },
    userStatus: {
      type: String,
      enum: ["host", "guest"],
      default: "guest",
    },
    rating: {
      type: [Types.ObjectId],
      ref: "Ratings",
    },
    identityVerificationStatus: {
      type: String,
      enum: ["pending", "success", "reject", ""],
    },
    subscriptionStatus: {
      type: String,
      enum: ["pending", "active", "expired", "reject"],
    },
    subscriptionExpiresAt: {
      type: Date,
    },
    // Other details
    wishlists: {
      type: [Types.ObjectId],
      ref: "Listings",
    },
    listings: {
      type: [Types.ObjectId],
      ref: "Listings",
    },
    reports: {
      type: [Types.ObjectId],
      ref: "Reports",
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    hasWrittenFeedback: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

usersSchema.pre("save", async function () {
  if (this.password) {
    const hashedPassword = await bcrypt.hash(this?.password, env.SALT);
    this.password = hashedPassword;
  }
});

export type TUser = InferSchemaType<typeof usersSchema>;
const Users = model("Users", usersSchema);
export default Users;
