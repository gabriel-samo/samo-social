import cors from "cors";
import express from "express";
import config from "./config/config";
import authRouter from "./routes/auth.route";
import usersRouter from "./routes/users.route";
import likesRouter from "./routes/likes.route";
import postsRouter from "./routes/posts.route";
import commentsRouter from "./routes/comments.route";
import uploadFileRouter from "./routes/upload.route";
import relationshipRouter from "./routes/relationships.route";

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

const app = express();
const { port, host } = config.app;

// if (isDevelopment) {
app.use(cors({ origin: "http://localhost:5173" }));
// }

// if (isProduction) {
//   app.use(express.static("../client/dist"));
// }

// middlewares
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.json("working :)");
});
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/likes", likesRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/relationships", relationshipRouter);
app.use("/api/upload", uploadFileRouter);

// 404 fallback for client side routing
// if (isProduction) {
//   app.get("*", (req, res) => {
//     res.sendFile("index.html", { root: "../client/dist" });
//   });
// }

app.listen(port, () => {
  console.log(`Server runnig on: http://${host}:${port}`);
});
