import { InferSchemaType, Schema, model } from "mongoose";

const userTokenSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export type TUserToken = InferSchemaType<typeof userTokenSchema>;

export const UserToken = model("UserToken", userTokenSchema);
