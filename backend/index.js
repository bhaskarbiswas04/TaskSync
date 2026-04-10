import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/database.connect.js";

//--routes imports
import userRoutes from "./src/routes/userRoutes.js"
import teamRoutes from "./src/routes/teamRoutes.js"
import projectRoutes from "./src/routes/projectRoutes.js"
import taskRoutes from "./src/routes/taskRoutes.js"

dotenv.config(); //--load env variables

const app = express(); 

const allowedOrigins = [
  "http://localhost:5173",
  "https://task-sync-client.vercel.app",
];

// Middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: false
  }),
);
app.use(express.json());

const PORT = process.env.PORT || 3000; 

// Connect DB then starts server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`,
      );
    });
  })
  .catch((err) => {
    console.error("DB Connection Failed", err);
  });

//Testing route
app.get("/", (req, res)=>{
    res.send("API is running smoothly for TaskSync");
});

//routes
app.use("/api/auth", userRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/projects", projectRoutes)
app.use("/api/tasks", taskRoutes)