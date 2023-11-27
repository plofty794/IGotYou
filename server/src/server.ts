import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "./utils/envalid";
import mongoose from "mongoose";
import { errorHandler } from "./controllers/errorsController";
import { userRoutes } from "./routes/userRoutes";
import { listingRoutes } from "./routes/listingRoutes";
import { assetRoutes } from "./routes/assetRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { paymentRoutes } from "./routes/paymentRoutes";
import { Server } from "socket.io";
import { sendBookingRequest } from "./controllers/bookingsControllers";

const app = express();
const server = app
  .listen(env.PORT, () => console.log("Listening to port", env.PORT))
  .once("listening", () =>
    mongoose.connect(env.MONGO_COMPASS_URI).then(() => {
      console.log("Connected to database");
    })
  );

const io = new Server(server, {
  cors: {
    origin: [env.CLIENT_URL, env.ADMIN_URL],
    credentials: true,
  },
});

type TActiveUsers = {
  name: string;
  uid: string;
  socketId: string;
};

let onlineUsers: TActiveUsers[] = [];

function getActiveUsers({ name, uid, socketId }: TActiveUsers) {
  !onlineUsers.some((user) => user.name === name) &&
    onlineUsers.push({ name, uid, socketId });
}

function removeActiveUser(name: string) {
  onlineUsers = onlineUsers.filter((user) => user.name != name);
}

function findActiveUser(host: string) {
  return onlineUsers.find((user) => host === user.name);
}

function removeUser(socketId: string) {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
}

io.on("connection", (socket) => {
  socket.on("user-connect", (data) => {
    getActiveUsers({
      name: data.name,
      uid: data.uid,
      socketId: socket.id,
    });
  });

  socket.on("host-update-notification", ({ status, senderName }) => {
    const activeUser = findActiveUser(senderName);
    if (activeUser) {
      io.to(activeUser.socketId).emit("res", { status, activeUser });
    }
  });

  socket.on("send-bookingRequest", async (data) => {
    try {
      const activeUser = findActiveUser(data.host);
      if (activeUser) {
        const res = await sendBookingRequest(data);
        io.timeout(1000).to(activeUser.socketId).emit("pong", {
          notifications: res?.newNotification,
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    removeUser(socket.id);
    socket.on("user-logout", (name) => {
      removeActiveUser(name);
      socket.disconnect();
    });
  });
});

// import ipinfoMiddleware, { defaultIPSelector } from "ipinfo-express";
// app.use(
//   ipinfoMiddleware({
//     token: env.IPINFO_TOKEN,
//     ipSelector: defaultIPSelector,
//     cache: null,
//     timeout: 5000,
//   })
// );

app.use(cookieParser());
app.use(cors({ origin: [env.CLIENT_URL, env.ADMIN_URL], credentials: true }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use("/api", userRoutes);
app.use("/api", listingRoutes);
app.use("/api", assetRoutes);
app.use("/api", adminRoutes);
app.use("/api", paymentRoutes);
app.use(errorHandler);
