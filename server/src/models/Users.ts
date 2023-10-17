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
    mobileVerified: {
      type: Boolean,
      default: false,
    },
    mobilePhone: {
      type: String,
    },
    address: {
      type: String,
    },
    school: {
      type: String,
    },
    funFact: {
      type: String,
    },
    work: {
      type: String,
    },
    photoUrl: {
      type: String,
    },
    // Host details
    hostStatus: { type: Boolean, default: false },
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
