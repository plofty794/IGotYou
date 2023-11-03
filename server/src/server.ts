import express from "express";
import env from "./utils/envalid";
import mongoose from "mongoose";
import cors from "cors";
import { errorHandler } from "./controllers/errorsController";
import { userRoutes } from "./routes/userRoutes";
import { listingRoutes } from "./routes/listingRoutes";
import { assetRoutes } from "./routes/assetRoutes";
import { adminRoutes } from "./routes/adminRoutes";
// import ipinfoMiddleware, { defaultIPSelector } from "ipinfo-express";
const app = express();

// app.use(
//   ipinfoMiddleware({
//     token: env.IPINFO_TOKEN,
//     ipSelector: defaultIPSelector,
//     cache: null,
//     timeout: 5000,
//   })
// );
app.use(cors({ origin: [env.CLIENT_URL, env.ADMIN_URL], credentials: true }));
app.use(express.json({ limit: "25mb" }));
app.use(
  express.urlencoded({
    extended: false,
    limit: "25mb",
    parameterLimit: 10000000,
  })
);
app.use("/api", userRoutes);
app.use("/api", listingRoutes);
app.use("/api", assetRoutes);
app.use("/api", adminRoutes);
app.use(errorHandler);

mongoose.connect(env.MONGO_COMPASS_URI).then(() => {
  console.log("Connected to database");
  app.listen(env.PORT, () => console.log("Listening to port", env.PORT));
});
