import cors from "cors";
import cookieParser from "cookie-parser";
import env from "./utils/envalid";
import mongoose from "mongoose";
import { errorHandler } from "./controllers/errorsController";
import { userRoutes } from "./routes/userRoutes";
import { listingRoutes } from "./routes/listingRoutes";
import { assetRoutes } from "./routes/assetRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { subscriptionPaymentRoutes } from "./routes/subscriptionPaymentRoutes";
import { Server } from "socket.io";
import { conversationRoutes } from "./routes/conversationRoutes";
import { notificationRoutes } from "./routes/notificationRoutes";
import { identityRoutes } from "./routes/identityPhotoRoutes";
import { reservationRoutes } from "./routes/reservationRoutes";
import { bookingRequestRoutes } from "./routes/bookingRequestRoutes";

import cron from "node-cron";
import { createTransport } from "nodemailer";
import { blockedUsersRoutes } from "./routes/blockUsersRoutes";
import express from "express";
import { ratingRoutes } from "./routes/ratingRoutes";
import { subscriptionEndsInFiveDays } from "./utils/subscriptionEndsInFiveDays";
import Users from "./models/Users";

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
    origin: ["http://localhost:5173", env.CLIENT_URL],
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
  return (onlineUsers = onlineUsers.filter((user) => user.name != name));
}

function findActiveUser(host: string) {
  return onlineUsers.find((user) => host === user.name);
}

function removeUser(socketId: string) {
  return (onlineUsers = onlineUsers.filter(
    (user) => user.socketId !== socketId
  ));
}

io.on("connection", (socket) => {
  socket.on("user-connect", (data) => {
    getActiveUsers({
      name: data.name,
      uid: data.uid,
      socketId: socket.id,
    });
  });

  socket.on("chat-message", async (data) => {
    const activeUser = findActiveUser(data.receiverName);
    if (activeUser) {
      io.to(activeUser.socketId).emit("receive-message", data.conversationID);
    }
  });

  socket.on("message-host", async (data) => {
    const activeUser = findActiveUser(data.receiverName);
    if (activeUser) {
      io.to(activeUser.socketId).emit("receive-message", data.conversationID);
    }
  });

  socket.on("message-guest", async (data) => {
    const activeUser = findActiveUser(data.receiverName);
    if (activeUser) {
      io.to(activeUser.socketId).emit("receive-message", data.conversationID);
    }
  });

  socket.on("send-bookingRequest", (data) => {
    const activeUser = findActiveUser(data.receiverName);
    if (activeUser) {
      io.to(activeUser.socketId).emit("send-booking-request-hostNotification");
    }
  });

  socket.on("request-service-cancellation", (data) => {
    const activeUser = findActiveUser(data.receiverName);
    if (activeUser) {
      io.to(activeUser.socketId).emit(
        "request-service-cancellation-hostNotification"
      );
    }
  });

  socket.on("send-bookingRequest-update", (data) => {
    const activeUser = findActiveUser(data.receiverName);
    if (activeUser) {
      io.to(activeUser.socketId).emit(
        "booking-requestUpdate",
        data.bookingRequestID
      );
    }
  });

  socket.on("guest-cancel-bookingRequest", (data) => {
    const activeUser = findActiveUser(data.receiverName);
    if (activeUser) {
      io.to(activeUser.socketId).emit(
        "send-booking-cancelled-hostNotification"
      );
    }
  });

  socket.on("host-decline-bookingRequest", (data) => {
    const activeUser = findActiveUser(data.receiverName);
    if (activeUser) {
      io.to(activeUser.socketId).emit("booking-requestUpdate");
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

app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      env.CLIENT_URL,
      env.ADMIN_URL,
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.get("/api/events", (req, res) => {
  const transport = createTransport({
    service: "gmail",
    auth: {
      user: env.ADMIN_EMAIL,
      pass: env.APP_PASSWORD,
    },
  });

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
  });

  cron.schedule("*/2 * * * *", async () => {
    const expiredUserSubscriptions = await Users.find({
      subscriptionExpiresAt: {
        $lte: new Date().setHours(0, 0, 0, 0),
      },
    });

    if (expiredUserSubscriptions.length > 0) {
      await Users.updateMany(
        {
          subscriptionExpiresAt: {
            $lte: new Date().setHours(0, 0, 0, 0),
          },
        },
        {
          userStatus: "guest",
          $unset: { subscriptionExpiresAt: "", subscriptionStatus: "" },
        }
      );
      expiredUserSubscriptions.map(async (user) => {
        await transport.sendMail({
          to: user.email,
          subject: "Subscription Status Update",
          html: "<p>Tapos na ang subscription mo!</p><p>Subscribe ka ulit sa IGotYou Hosting!</p>",
        });
      });
      res.write("data: " + new Date().toLocaleTimeString() + "\n\n");
    }
  });
});
app.use("/api", userRoutes);
app.use("/api", listingRoutes);
app.use("/api", assetRoutes);
app.use("/api", adminRoutes);
app.use("/api", subscriptionPaymentRoutes);
app.use("/api", conversationRoutes);
app.use("/api", notificationRoutes);
app.use("/api", identityRoutes);
app.use("/api", reservationRoutes);
app.use("/api", bookingRequestRoutes);
app.use("/api", blockedUsersRoutes);
app.use("/api", ratingRoutes);
app.use(errorHandler);
app.get("*", (req, res) => {
  res.sendFile(env.CADDY_CLIENT_PATH);
});

cron.schedule("0 8 * * *", async () => {
  const transport = createTransport({
    service: "gmail",
    auth: {
      user: env.ADMIN_EMAIL,
      pass: env.APP_PASSWORD,
    },
  });
  try {
    await subscriptionEndsInFiveDays(transport);
  } catch (error) {
    console.error(error);
  }
});
