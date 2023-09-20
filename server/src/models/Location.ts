import { InferSchemaType, model, Schema } from "mongoose";

const locationSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  postal_code: {
    type: String,
    required: true,
    unique: true,
  },
});

export type TLocation = InferSchemaType<typeof locationSchema>;
const Location = model("Location", locationSchema);
export default Location;
