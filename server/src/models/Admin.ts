import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function () {
  const hashedPassword = await bcrypt.hash(this.password, 12);
  this.password = hashedPassword;
});

const Admin = model("Admin", adminSchema);
export default Admin;
