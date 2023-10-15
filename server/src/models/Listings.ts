import { Schema, InferSchemaType, model, Types } from "mongoose";

const listingPhotosSchema = new Schema({
  public_id: {
    type: String,
    required: true,
  },
  secure_url: {
    type: String,
    required: true,
  },
  original_filename: {
    type: String,
    required: true,
  },
});

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
      required: true,
    },
    serviceDescription: {
      type: String,
      required: true,
    },
    listingPhotos: {
      type: [listingPhotosSchema],
      required: true,
    },
    host: {
      type: Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

export type TUser = InferSchemaType<typeof listingSchema>;
const Users = model("Listings", listingSchema);
export default Users;
