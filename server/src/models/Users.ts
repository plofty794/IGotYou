import { Schema, InferSchemaType, model, Types } from "mongoose";
import env from "../utils/envalid";
import bcrypt from "bcrypt";

const usersSchema = new Schema(
  {
    //User Details
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
    mobile_verified: {
      type: Boolean,
      default: false,
    },
    mobile_phone: {
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
    // Host details
    hostStatus: { type: Boolean, default: false },
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
