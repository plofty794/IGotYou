import { InferSchemaType, model, Schema } from "mongoose";

const locationSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postal_code: {
    type: Number,
    required: true,
  },
});

export type TLocation = InferSchemaType<typeof locationSchema>;
const Location = model("Location", locationSchema);
export default Location;
