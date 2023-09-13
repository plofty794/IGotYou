import { Schema, InferSchemaType, model } from "mongoose";
import env from "../utils/envalid";
import bcrypt from "bcrypt";

const usersSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobilePhone: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
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
export const Users = model("Users", usersSchema);
