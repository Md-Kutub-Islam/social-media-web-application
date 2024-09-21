import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/post.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import upload from "./middleware/multerMiddleware.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

// congiguration

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewere
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));

// middlewares
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:5173",
//     credentials: true,
//   })
// );
const allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:5173", "https://social-media-web-application-kjg6.onrender.com"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,  // Allow cookies and other credentials in cross-origin requests
  })
);



// this is the local storege where we store assets
app.use("/assets", express.static(path.join(__dirname, "uploads/assets")));

// Route with File
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", upload.single("picture"), createPost);

// Routes with files
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.use(errorMiddleware);

export default app;
