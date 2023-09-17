import { Schema, InferSchemaType, model } from "mongoose";
import env from "../utils/envalid";
import bcrypt from "bcrypt";

const usersSchema = new Schema(
  {
    username: {
      type: String,
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
