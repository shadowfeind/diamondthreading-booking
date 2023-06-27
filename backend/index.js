import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { rateLimit } from "express-rate-limit";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import errorHandler, { notFound } from "./middleware/errorHandler.js";
import usersRoute from "./route/userRoutes.js";
import customersRoute from "./route/customerRoutes.js";
import queueRoute from "./route/queueRoutes.js";
import commentRoute from "./route/commentRoutes.js";
import authRouter from "./route/authRoutes.js";

dotenv.config();

const port = process.env.PORT || 3500;
const app = express();
connectDB();
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 1000, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later",
});
app.use(express.json());
app.use(compression());
app.use(cors());
// apply rate limiting to all requests
app.use(limiter);

app.use("/api/v1/users", usersRoute);
app.use("/api/v1/customers", customersRoute);
app.use("/api/v1/queue", queueRoute);
app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/login", authRouter);

app.use(notFound);
app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => console.log(`Server running on port ${port}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
