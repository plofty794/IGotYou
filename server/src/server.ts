import express from "express";
import env from "./utils/envalid";
import mongoose from "mongoose";
import { errorHandler } from "./controllers/errorsController";
import { userRoutes } from "./routes/userRoutes";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
app.use("/api", userRoutes);

mongoose.connect(env.MONGO_COMPASS_URI).then(() => {
  console.log("Connected to database");
  app.listen(env.PORT, () => console.log("Listening to port", env.PORT));
});
