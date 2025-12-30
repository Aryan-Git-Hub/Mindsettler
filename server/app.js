import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
})); // Enable Cross-Origin Resource Sharing (CORS).
app.use(express.json()); // Handles JSON data (like from an API call in React)
app.use(bodyParser.urlencoded({ extended: true })); // Handles URL-encoded data (like from a standard HTML form)
app.use(morgan("dev")); // It automatically logs every incoming HTTP request to your terminal console so you can see what is happening in real-time
app.use(cookieParser()); // This populates req.cookies

// Basic route to check if server is running
import userRoute from "./routes/userRoute.js";
import appointnentRoute from "./routes/appointmentRoute.js";
import adminRoute from "./routes/adminRoute.js";
import { protect } from "./middlewares/userMiddleware.js";
import walletTransactionsRoute from './routes/walletRoute.js'
app.use("/api/user", userRoute);
app.use("/api/appointment", appointnentRoute);
app.use("/api/admin", adminRoute);
// wallet transaction routes
app.use('/api/transactions', protect, walletTransactionsRoute)

app.get("/", (req, res) => {
  res.send("ES Module Backend Running");
});

export default app;
