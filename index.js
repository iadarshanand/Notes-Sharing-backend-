import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./db.js";
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import noteRouter from "./routes/noteRoutes.js";
import searchRouter from "./routes/searchRoutes.js";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
const app = express();

//connect DB
connectDB();

//middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("combined"));

//Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 100, // limit each IP to 100 request per windowMs
});
//limiter
app.use("/api", limiter);

app.use("/api/auth", authRouter);
app.use("/api/notes", noteRouter);
app.use("/api/search", searchRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server is running at port", PORT);
});

export default app;
