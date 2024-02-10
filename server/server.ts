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
import Users from "./models/Users";
import { addDays } from "date-fns";
import cron from "node-cron";
import { createTransport } from "nodemailer";
import { blockedUsersRoutes } from "./routes/blockUsersRoutes";
import serverless from "serverless-http";
import express from "express";

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
    origin: [
      "https://i-got-you-client-nxqt.vercel.app",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
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

app.get("/", (_, res, __) => {
  res.send({ message: "Hello" });
});

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", env.CLIENT_URL],
    credentials: true,
  })
);
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
app.use("/api", subscriptionPaymentRoutes);
app.use("/api", conversationRoutes);
app.use("/api", notificationRoutes);
app.use("/api", identityRoutes);
app.use("/api", reservationRoutes);
app.use("/api", bookingRequestRoutes);
app.use("/api", blockedUsersRoutes);
app.use(errorHandler);

cron.schedule("0 8 * * *", async () => {
  const transport = createTransport({
    service: "gmail",
    auth: {
      user: env.ADMIN_EMAIL,
      pass: env.APP_PASSWORD,
    },
  });
  try {
    const fiveDaysFromNow = addDays(new Date().setHours(0, 0, 0, 0), 5);

    const subscriptionEndsInFiveDays = await Users.find({
      subscriptionExpiresAt: {
        $lte: fiveDaysFromNow,
      },
    }).select("username email");

    if (!subscriptionEndsInFiveDays.length) return;

    await Promise.all(
      subscriptionEndsInFiveDays.map(async (user) => {
        await transport.sendMail({
          to: user.email,
          subject: "Subscription Status Update",
          html: "<p>Hello, world</p>",
        });
      })
    );
  } catch (error) {
    console.error(error);
  }
});

export const handler = serverless(app);