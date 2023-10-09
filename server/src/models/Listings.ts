import { Schema, InferSchemaType, model, Types } from "mongoose";

const listingSchema = new Schema(
  {
    serviceType: {
      type: [
        "Events and Entertainment",
        "Audio and Sound Services",
        "Photography and Videography",
        "Content and Marketing",
      ],
      default: ["Events and Entertainment"],
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export type TUser = InferSchemaType<typeof listingSchema>;
const Users = model("Listings", listingSchema);
export default Users;
