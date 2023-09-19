import { Schema, InferSchemaType, model } from "mongoose";
import env from "../utils/envalid";
import bcrypt from "bcrypt";

const usersSchema = new Schema(
  {
    uid: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    email_verified: {
      type: Boolean,
      default: false,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobilePhone: {
      type: Number,
    },
    mobile_isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: ["Guest", "Host"],
      default: "Guest",
      required: true,
    },
  },
  { timestamps: true }
);

usersSchema.pre("save", async function () {
  const hashedPassword = await bcrypt.hash(this.password, env.SALT);
  this.password = hashedPassword;
});

export type TUser = InferSchemaType<typeof usersSchema>;
const Users = model("Users", usersSchema);
export default Users;
