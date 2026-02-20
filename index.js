import express from "express";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv";
import routeUsers from "./src/routes/routeUsers.js";
import errorHandler from "./src/middleware/middlewareUsers.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
app.use(express.json());
app.use("/api/users", routeUsers);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
