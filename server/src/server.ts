import express from "express";
import env from "./utils/envalid";
import mongoose from "mongoose";
import cors from "cors";
import { errorHandler } from "./controllers/errorsController";
import { userRoutes } from "./routes/userRoutes";
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", userRoutes);
app.use(errorHandler);

mongoose.connect(env.MONGO_COMPASS_URI).then(() => {
  console.log("Connected to database");
  app.listen(env.PORT, () => console.log("Listening to port", env.PORT));
});
